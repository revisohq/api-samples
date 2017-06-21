using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace RevisoGrantAccess.Controllers
{
    public class HomeController : Controller
    {
        // The Reviso tokens are injected at runtime
        private readonly IOptions<RevisoConfig> _revisoConfig;

        public HomeController(IOptions<RevisoConfig> revisoConfig)
        {
            _revisoConfig = revisoConfig;
        }

        public IActionResult Index()
        {
            // Generate the full redirect url
            var absoluteRedirectUri = new Uri(
                $"{Request.Scheme}://{Request.Host}{Url.Action("Callback", "Home")}",
                UriKind.Absolute);
            var appPublicToken = _revisoConfig.Value.AppPublicToken;

            // Build the grant access url
            ViewData["url"] = string.Format(
                "https://app.reviso.com/api1/requestaccess.aspx?appId={0}&redirectUrl={1}&locale=en-GB",
                @Uri.EscapeDataString(appPublicToken),
                @Uri.EscapeDataString(absoluteRedirectUri.ToString()));

            return View();
        }

        // The route handler is async to free up worker threads while waiting for the Reviso API
        public async Task<IActionResult> Callback()
        {
            // Get the agreementGrantToken from the query string
            // In a real application you would want to store this somewhere safe
            var agreementGrantToken = HttpContext.Request.Query["token"].ToString();

            // To verify that everything works we do a request to /self
            // In a real application this is not required
            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri("https://rest.reviso.com");
                    // Add the two required authentication headers
                    client.DefaultRequestHeaders.Add("X-AppSecretToken", _revisoConfig.Value.AppSecretToken);
                    client.DefaultRequestHeaders.Add("X-AgreementGrantToken", agreementGrantToken);
                    var response = await client.GetAsync("/self");
                    response.EnsureSuccessStatusCode();

                    // Read the response as a string
                    // In a real application you would probably load this into its own class
                    var stringResult = await response.Content.ReadAsStringAsync();
                    ViewData["apiResponse"] = stringResult;
                }
                catch (HttpRequestException exception)
                {
                    return BadRequest($"Could not connect to Reviso: {exception.Message}");
                }
            }

            return View();
        }
    }
}
