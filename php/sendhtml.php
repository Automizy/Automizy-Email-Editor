<?php

require __DIR__ . '/../.composer/autoload.php';

$client = new \GuzzleHttp\Client(array('base_uri' => 'https://api.automizy.com'));
$emailValidator = new \Zend\Validator\EmailAddress();

$email = $_POST['email'];
$html = $_POST['html'];

if(!$emailValidator->isValid($email)){
    die();
}

try {

	$response = $client->post('oauth', array(
		'form_params'	=> array(
			'client_id' 		=> '7126b34ce9ab5e165be78f79a3c52e4a1a5ee25d',
			'client_secret' 	=> 'f69c1473f9964d08485d3609d36d711f8e855d2f',
			'grant_type' 	=> 'client_credentials'
		)
	));
	
	$responseBody = $response->getBody();
	$result = json_decode($responseBody->getContents(), JSON_OBJECT_AS_ARRAY);

	$response = $client->get('contacts?'.\GuzzleHttp\Psr7\build_query([
            'where' => [
                [
                    ['email', 'eq', $email]
                ]
            ]
        ]), array(
		'headers' => array(
			'Authorization' => 'Bearer ' . $result['access_token'],
			'Accept' => 'application/json',
		)
	));
	$body = $response->getBody();
	$contact = json_decode($body->getContents(), JSON_OBJECT_AS_ARRAY);

    if(empty($contact['_embedded']['contacts'])){
        $responseContacts = $client->post('contacts', array(
            'form_params'	=> array(
                'email' 		=> $email,
                'customFields' 	=> [
                    'from-emaileditor' => 1
                ]
            ),
            'headers' => array(
                'Authorization' => 'Bearer ' . $result['access_token'],
                'Accept' => 'application/json',
            )
        ));
    }else{
        $id = $contact['_embedded']['contacts'][0]['id'];
        $responseContacts = $client->patch('contacts/'.$id, array(
            'form_params'	=> array(
                'customFields' 	=> [
                    'from-emaileditor' => 1
                ]
            ),
            'headers' => array(
                'Authorization' => 'Bearer ' . $result['access_token'],
                'Accept' => 'application/json',
            )
        ));
    }


    $connection = new \PhpAmqpLib\Connection\AMQPStreamConnection('mq-int.protopmail.com', 5671, 'client', 'client');
    $channel = $connection->channel();
    $channel->queue_declare('prod.send.email.editor.result', false, true, false, false);
    $message = new \PhpAmqpLib\Message\AMQPMessage(json_encode([
        'targetEmailAddress' => $email,
        'htmlCode' => $html
    ]), [
        'delivery_mode' => 2
    ]);
    $channel->basic_publish($message, '', 'prod.send.email.editor.result');


} catch(\GuzzleHttp\Exception\ClientException $ex) {
	// error in query
	echo $ex->getResponse()->getBody()->getContents();
}catch(\GuzzleHttp\Exception\ServerException $ex) {
	// error when connecting to server
	echo $ex->getResponse()->getBody()->getContents();
}