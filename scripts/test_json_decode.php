<?php
require 'connection.php';
require 'f.php';
$dec = json_decode($_POST['data']);

$response=array();
foreach ($dec as $value) {
    $response[]=$value->id;
}
echo json_encode($response);
?>