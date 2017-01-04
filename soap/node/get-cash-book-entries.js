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

		console.log('Fetching CashBookEntry handles for a specific CashBook...');

		client.setSecurity(new Cookie(client.lastResponseHeaders));
		client.CashBook_GetEntries({cashBookHandle: {Number: CASH_BOOK_ID}}, (err, data) => {
			if (err) return console.error(err);

			console.log('Fetching CashBookEntry data...');

			var entityHandles = {entityHandles: data.CashBook_GetEntriesResult};
			client.CashBookEntry_GetDataArray(entityHandles, (err, data) => {
				if (err) return console.error(err);
				console.log('Done');
				console.log(JSON.stringify(data, null, 2));
			});
		});
	});
});
