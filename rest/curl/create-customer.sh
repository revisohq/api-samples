#!/bin/sh

json='
{
    "currency": "EUR",
    "customerGroup": {
        "customerGroupNumber": 1
    },
    "name": "Anti Pesto Ltd.",
    "paymentTerms": {
        "paymentTermsNumber": 2
    },
    "vatZone": {
        "vatZoneNumber": 1
    }
}'

echo $json | curl -i https://rest.reviso.com/customers \
	--request POST \
	--header "Content-Type: application/json" \
	--header "X-AppSecretToken: $APP_SECRET_TOKEN" \
	--header "X-AgreementGrantToken: $AGREEMENT_GRANT_TOKEN" \
	--data @-
