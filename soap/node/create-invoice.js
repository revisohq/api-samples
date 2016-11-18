var soap = require('soap');
var Cookie = require('soap-cookie');

var url = 'https://soap.reviso.com/api1/?wsdl';

var credentials = {
	token: process.env.AGREEMENT_GRANT_TOKEN,
	appToken: process.env.APP_SECRET_TOKEN
};

console.log('Creating SOAP client...');

soap.createClient(url, (err, client) => {
	if (err) return console.error(err);

	console.log('Connecting...');

	client.ConnectWithToken(credentials, (err, data) => {
		if (err) return console.error(err);

		console.log('Creating draft invoice...');

		var invoiceData = {
			data: {
				DebtorHandle: {Number: '1'},
				DebtorName: 'Wayne Enterprises',
				Date: '2016-06-16T00:00:00',
				TermOfPaymentHandle: {Id: '4'},
				DueDate: '2016-06-16T00:00:00',
				CurrencyHandle: {Code: 'EUR'},
				ExchangeRate: 1,
				IsVatIncluded: true,
				LayoutHandle: {Id: '3'},
				DeliveryDate: null,
				NetAmount: 100,
				VatAmount: 0,
				GrossAmount: 100,
				Margin: 0,
				MarginAsPercent: 0
			}
		};

		client.setSecurity(new Cookie(client.lastResponseHeaders));
		client.CurrentInvoice_CreateFromData(invoiceData, (err, result) => {
			if (err) return console.error(err);
			console.log(result);

			console.log('Fetching draft invoice...');

			client.CurrentInvoice_GetData({entityHandle: result.CurrentInvoice_CreateFromDataResult}, (err, result) => {
				if (err) return console.error(err);
				console.log(result);
			});
		});
	});
});
