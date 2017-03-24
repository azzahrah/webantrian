<?php

/*
 * File ini digunakan untuk mengupdate status antrian, called='1' nomor x tujuan sudah dipanggil
 * 
 * 
 */
require 'connection.php';
require 'f.php';
$id = isset($_POST['id']) ? intval($_POST['id']) : 0; //755
$tag = isset($_POST['tag']) ? $mysqli->real_escape_string($_POST['tag']) : ''; //755
$sub_tag = isset($_POST['sub_tag']) ? $mysqli->real_escape_string($_POST['sub_tag']) : ''; //755
$tujuan = isset($_POST['tujuan']) ? $mysqli->real_escape_string($_POST['tujuan']) : ''; //755
$hold = isset($_POST['hold']) ? $mysqli->real_escape_string($_POST['hold']) : ''; //755
$mode = isset($_POST['mode']) ? $mysqli->real_escape_string($_POST['mode']) : ''; //755
$response = array();
$response['code'] = 'SUCCESS';
$response['msg'] = 'Update Antrian Sukses';
$errors = array();
$sql="";
//$sql = "UPDATE antrian SET called='1',called_count=called_count+1 where id='$id' and tujuan='$tujuan'";
switch ($tag) {
    case 'antrian':
        switch ($sub_tag) {
            case 'update_called':
                $sql = "UPDATE pendaftaran SET called='1',called_count=called_count+1 where id='$id' and tujuan='$tujuan'";
                break;
            case 'update_hold':
                $sql = "UPDATE pendaftaran SET hold='$hold',called='$hold' where id='$id'";
                break;
        }
        if (!$mysqli->query($sql)) {
            $errors[] = $mysqli->error;
            $response['code'] = 'ERROR';
        }
        break;
}

$mysqli->close();
print json_encode($response);
?>