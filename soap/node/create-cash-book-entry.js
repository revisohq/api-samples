var soap = require('soap');
var Cookie = require('soap-cookie');

var url = 'https://soap.reviso.com/api1/?wsdl';

var credentials = {
	token: process.env.AGREEMENT_GRANT_TOKEN,
	appToken: process.env.APP_SECRET_TOKEN
};

// change this to match the ID of your target CashBook (Day Book)
var CASH_BOOK_ID = 1;

console.log('Creating SOAP client...');

soap.createClient(url, (err, client) => {
	if (err) return console.error(err);

	console.log('Connecting...');

	client.ConnectWithToken(credentials, (err, data) => {
		if (err) return console.error(err);

		console.log('Creating cash book entry...');

		var cashBookEntryData = {
			data: {
				Type: "FinanceVoucher",
				CashBookHandle: {Number: CASH_BOOK_ID},
				AccountHandle: {Number: 1000},
				ContraAccountHandle: {Number: 1100},
				Date: "2017-01-04T00:00:00.000Z",
				VoucherNumber: 42,
				Text: "Bank deposit",
				AmountDefaultCurrency: 1337.00,
				CurrencyHandle: {Code: "EUR"},
				Amount: 1337.00
			}
		};

		client.setSecurity(new Cookie(client.lastResponseHeaders));
		client.CashBookEntry_CreateFromData(cashBookEntryData, (err, result) => {
			if (err) return console.error(err);
			console.log(result);

			console.log('Fetching cash book entry...');

			client.CashBookEntry_GetData({entityHandle: result.CashBookEntry_CreateFromDataResult}, (err, result) => {
				if (err) return console.error(err);
				console.log(result);
			});
		});
	});
});
