var appSecretToken = process.env.APP_SECRET_TOKEN;
var agreementGrantToken = process.env.AGREEMENT_GRANT_TOKEN;

var reviso = require('reviso')(appSecretToken, agreementGrantToken);

reviso('/self', (error, response, body) => {
	console.log(JSON.stringify(body, null, 2));
});
