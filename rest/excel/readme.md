# Microsoft Excel

Example of how to work with Reviso REST API with Microsoft Excel.
Using this sample you can get your customers and booked invoices into a spreadsheet.

## Getting Access
In order to get access to the API you first need to register an app to get an appSecretToken. With that in place you need to run your users through a flow in order to obtain an agreementGrantToken that you can use to interact with their data.

The whole process is described in detail here: [https://www.reviso.com/developer/connect](https://www.reviso.com/developer/connect)

You can also use 'demo' credentials.

## Usage

1) You need Microsoft Excel already installed on your computer

2) Open sample.xlsm file

3) Enable macros

4) Insert your tokens as parameters

> Select Credentials sheet and insert your tokens
> 
> **X-AppSecretToken-Parameter**=your-app-token
> 
> **X-AgreementGrantToken-Parameter**=your-grant-token
> 
> You can use 'demo' as parameters and you will get demo data.

5) Select "Customers" or "Invoices" sheet to get information from Reviso

**Attention**: Currently, you can't work with macros in Excel Online.


## Example
The following example demonstrate using the Reviso REST API to get booked invoices.

    Private Sub GetData()
    	Dim Client As New WebClient
    	Client.TimeoutMs = 30000
    	Client.BaseUrl = "https://rest.reviso.com/invoices-experimental/booked?pagesize=10000"
    
    	Dim Request As New WebRequest
    	Request.Format = WebFormat.Json
       
    	Request.AddHeader "X-AgreementGrantToken", "demo"
    	Request.AddHeader "X-AppSecretToken", "demo"
    	Request.AddHeader "Content-Type", "application/json"
    
    	Dim Response As WebResponse
    	Set Response = Client.Execute(Request)
    
    	If Response.StatusCode <> Ok Then
    		Debug.Print "Error: " & Response.StatusDescription
    		Exit Sub
    	End If
    
    	Dim Json As Object
    	Set Json = WebHelpers.ParseJson(Response.Content)
    
    	For Each element In Json("collection")
    		Debug.Print "displayInvoiceNumber: " & element("displayInvoiceNumber")
    		Debug.Print "date: " & element("date")
    	Next element
    
    End Sub


## Notes
How to make REST call with VBA in Excel?

Follow this link for more information:
[https://github.com/VBA-tools/VBA-Web](https://github.com/VBA-tools/VBA-Web)





## Further reading

The official API documentation can be found here: http://api-docs.reviso.com/

For a more gentle introduction you can read more on our website: 

 - https://www.reviso.com/developer/connect
 - https://www.reviso.com/developer/about-the-rest-api
