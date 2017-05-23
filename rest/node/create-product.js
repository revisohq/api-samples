var appSecretToken = process.env.APP_SECRET_TOKEN;
var agreementGrantToken = process.env.AGREEMENT_GRANT_TOKEN;

var reviso = require('reviso')(appSecretToken, agreementGrantToken);

// remember to replace the the productGroup with your own value

var product = {
	"name": "Arkenstone",
	"productNumber": "P-42",
	"salesPrice": 10000,
	"productGroup": {
		"productGroupNumber": 1
	}
};

reviso({
	method: 'POST',
	url: '/products',
	body: product
}, function(error, response, body) {
	console.log(JSON.stringify(body, null, 2));
});
