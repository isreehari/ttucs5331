<?php



	$_POST = json_decode(file_get_contents('php://input'));

$url = 'http://api.bls.gov/publicAPI/v2/timeseries/data/';
$method = 'POST';

$registrationKey = ""; // API key

if(is_null($registrationKey))
{
	$query = array(
	'seriesid'  => $_POST->seriesid,
	'startyear' =>  $_POST->startyear,
	'endyear'   =>  $_POST->endyear
	);

}
else {
	$query = array(
	'seriesid'  => $_POST->seriesid,
	'startyear' =>  $_POST->startyear,
	'endyear'   =>  $_POST->endyear,
	'registrationKey' => $registrationKey
	);
}
$pd = json_encode($query);
$contentType = 'Content-Type: application/json';
$contentLength = 'Content-Length: ' . strlen($pd);

$result = file_get_contents(
$url, null, stream_context_create(
	array(
		'http' => array(
			'method' => $method,
			'header' => $contentType . "\r\n" . $contentLength . "\r\n",
			'content' => $pd
		),
	)
)
);

header('Content-Type: application/json');
echo json_encode($result);


die();





?>
