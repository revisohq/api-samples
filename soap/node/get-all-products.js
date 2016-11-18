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

		console.log('Fetching Product handles...');

		client.setSecurity(new Cookie(client.lastResponseHeaders));
		client.Product_GetAll({}, (err, data) => {
			if (err) return console.error(err);

			console.log('Fetching Product data...');

			var entityHandles = {entityHandles: data.Product_GetAllResult};
			client.Product_GetDataArray(entityHandles, (err, data) => {
				if (err) return console.error(err);
				console.log('Done');
				console.log(JSON.stringify(data, null, 2));
			});
		});
	});
});
