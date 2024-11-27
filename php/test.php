
<?php
session_start();
require_once 'vendor/autoload.php';

$id_token = filter_input(INPUT_POST, 'id_token');
define('CLIENT_ID', '524548971866-qp24jbj4q3ud2gj00cgc7vpfre3fv4r4.apps.googleusercontent.com');

$client = new Google_Client(['client_id' => CLIENT_ID]); 
$payload = $client->verifyIdToken($id_token);
if ($payload) {
    $userid = $payload['sub'];
}

//DBなどとのやりとり

$_SESSION['login'] = true;
exit;
