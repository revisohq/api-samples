var appSecretToken = process.env.APP_SECRET_TOKEN;
var agreementGrantToken = process.env.AGREEMENT_GRANT_TOKEN;

var reviso = require('reviso')(appSecretToken, agreementGrantToken);

// the key has to be included in both url and body
var settingKey = 'foo';

var setting = {
	'settingKey': settingKey,
	'content': {
		'bar': 'baz'
	}
};

reviso({
	method: 'PUT',
	url: '/app-settings/agreement/' + settingKey,
	body: setting
}, function(error, response, body) {
	console.log(JSON.stringify(body, null, 2));
});
