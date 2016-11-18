<?php

$wsdlUrl = 'https://soap.reviso.com/api1/?wsdl';

$client = new SoapClient($wsdlUrl, array('trace' => 1, 'exceptions' => 1));

$connectResponse = $client->ConnectWithToken(array(
	'appToken' => getenv('APP_SECRET_TOKEN'),
	'token' => getenv('AGREEMENT_GRANT_TOKEN')
));

$debtorHandles = $client->Debtor_GetAll()->Debtor_GetAllResult->DebtorHandle;

$entityHandles = array('entityHandles' => $debtorHandles);

$debtorDataObjects = $client->Debtor_GetDataArray($entityHandles)
	->Debtor_GetDataArrayResult->DebtorData;

foreach ($debtorDataObjects as $i => $debtorData) {
	echo $debtorData->Number . ': ' . $debtorData->Name . PHP_EOL;
}
