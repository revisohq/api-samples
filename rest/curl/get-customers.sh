#!/bin/sh

curl -i https://rest.reviso.com/customers \
	--request GET \
	--header "Content-Type: application/json" \
	--header "X-AppSecretToken: $APP_SECRET_TOKEN" \
	--header "X-AgreementGrantToken: $AGREEMENT_GRANT_TOKEN" \
