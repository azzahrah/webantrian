<?php
/*
 * File ini digunakan untuk mengupdate status antrian, called='1' nomor x tujuan sudah dipanggil
 * 
 * 
 */
require 'connection.php';
require 'f.php';
$id = isset($_POST['id']) ? intval($_POST['id']) : 0; //755
$tujuan = isset($_POST['tujuan']) ? $mysqli->real_escape_string($_POST['tujuan']) : ''; //755
$hold = isset($_POST['hold']) ? intval($_POST['hold']) : 0; //755
$response = array();
$response['code'] = 'SUCCESS';
$response['msg'] = 'Update Antrian Sukses';
$errors = array();

$sql = "UPDATE antrian SET hold='". $hold ."' where id='$id'";
if (!$mysqli->query($sql)) {
    $errors[] = $mysqli->error;
    $response['code'] = 'ERROR';
}
$mysqli->close();
print json_encode($response);
?>