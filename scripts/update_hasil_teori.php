<?php
/*
 * File ini digunakan untuk mengupdate status lulus_teori dan lulus_praktek
 * Jika lulus teori dan praktek tujuan diupdate menjadi ='foto'
 * sebaliknya, called='1' dan finish='1'
 * 
 */
require 'connection.php';
require 'f.php';
$id = isset($_POST['id']) ? intval($_POST['id']) : 0; //755
$lulus_teori= isset($_POST['lulus_teori']) ? intval($_POST['lulus_teori']) : 0; //edit
$lulus_praktek= isset($_POST['lulus_praktek']) ? intval($_POST['lulus_praktek']) : 0; //edit
$nama= isset($_POST['nama']) ? $mysqli->real_escape_string($_POST['nama']) : ''; //edit
$alamat= isset($_POST['alamat']) ? $mysqli->real_escape_string($_POST['alamat']) : ''; //edit



$response = array();
$response['code'] = 'SUCCESS';
$response['msg'] = 'Update Hasil Teori Sukses';
$response['nomor'] = '';
$errors = array();
$mysqli->autocommit(false);
if (($lulus_teori == 1) && ($lulus_praktek ==1)) {
    $sql = "UPDATE pendaftaran SET lulus_teori='$lulus_teori',lulus_praktek='$lulus_praktek',tujuan='foto',called='0' where id='$id'";
}else{
    $sql = "UPDATE pendaftaran SET lulus_teori='$lulus_teori',lulus_praktek='$lulus_praktek',tujuan='foto',called='1',finish='1' where id='$id'";
}
if (!$mysqli->query($sql)) {
    $errors[] = $mysqli->error;
    $response['code'] = 'ERROR';
}

if (($lulus_teori == 1) && ($lulus_praktek ==1)) {
    $sql = "UPDATE antrian SET tujuan='foto',called='0' where id='$id'";
}else{
    $sql = "UPDATE antrian SET tujuan='foto',called='1',finish='1' where id='$id'";
}

if (!$mysqli->query($sql)) {
    $errors[] = $mysqli->error;
    $response['code'] = 'ERROR';
}

if (count($errors) <= 0) {
    $mysqli->commit();
} else {
    $response['msg']=$errors;
    $mysqli->rollback();
}
$mysqli->close();
print json_encode($response);
?>