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
				// DebtorPayment, CreditorInvoice, CreditorPayment, FinanceVoucher or ManualDebtorInvoice
				Type: "FinanceVoucher",
				// in which CashBook do you want to create the entry
				CashBookHandle: {Number: CASH_BOOK_ID},
				// on which account do you want to book the entry
				AccountHandle: {Number: 1000},
				// which contra account should be used in the entry
				ContraAccountHandle: {Number: 1100},
				Date: "2017-01-04T00:00:00.000Z",
				// when creating multi line transacations you can reuse the VoucherNumber 
				// to indicate that they are originating from the same document
				VoucherNumber: 42,
				Text: "Bank deposit",
				// when creating an entry in the default currency this should be the same as the Amount
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
