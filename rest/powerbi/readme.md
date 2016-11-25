# Power BI

Example of how to work with the Reviso REST API from Microsoft Power BI.
Using this sample you can connect to your customers and booked invoices, you can see on a map where they are and also customer's balance.

## Getting Access
In order to get access to the API you first need to register an app to get an appSecretToken. With that in place you need to run your users through a flow in order to obtain an agreementGrantToken that you can use to interact with their data.

The whole process is described in detail here: [https://www.reviso.com/developer/connect](https://www.reviso.com/developer/connect)



## Usage

1) Install Power BI Desktop: this is used to connect to and transform your data. Follow this link to download the application: [https://powerbi.microsoft.com/en-us/get-started/](https://powerbi.microsoft.com/en-us/get-started/)

2) Open sample.pbix file

3) Insert your tokens as Parameters

> Edit Queries Edit Parameters buttons on Power Bi Desktop application 
> 
> **X-AppSecretToken-Parameter**=your-app-token
> 
> **X-AgreementGrantToken-Parameter**=your-grant-token
> 
> You can use 'demo' as parameters and you will get demo data.

4) Publish your dashboard online in order to visualize and analyze everything in one place.


## Further reading

The official API documentation can be found here: http://api-docs.reviso.com/

For a more gentle introduction you can read more on our website: 

 - https://www.reviso.com/developer/connect
 - https://www.reviso.com/developer/about-the-rest-api
