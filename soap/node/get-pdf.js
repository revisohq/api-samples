var soap = require('soap');
var Cookie = require('soap-cookie');
var fs = require('fs');

var url = 'https://soap.reviso.com/api1/?wsdl';

var credentials = {
  token: process.env.AGREEMENT_GRANT_TOKEN,
  appToken: process.env.APP_SECRET_TOKEN
};

var invoice_number = process.env.INVOICE_NUMBER;

console.log('Creating SOAP client...');

soap.createClient(url, (err, client) => {
  if (err) return console.error(err);

  console.log('Connecting...');

  client.ConnectWithToken(credentials, (err, data) => {
    if (err) return console.error(err);
    client.setSecurity(new Cookie(client.lastResponseHeaders));

    client.Invoice_GetPdf({invoiceHandle: {Number: invoice_number}}, (err, data) => {
      if (err) return console.error(err);

      console.log('Fetching pdf data...');
      var buf = new Buffer(data['Invoice_GetPdfResult'], 'base64')

        fs.writeFile('invoice.pdf', buf, function(err) {
          if(err) {
            return console.log(err);
          }
          console.log('The file was saved!');
        }); 
    });
  });
});
