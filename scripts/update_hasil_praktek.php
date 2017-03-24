<?php

require 'connection.php';
require 'f.php';
$id = isset($_POST['id']) ? intval($_POST['id']) : 0; //755
$lulus_teori= isset($_POST['lulus_teori']) ? intval($_POST['lulus_teori']) : 0; //edit
$lulus_praktek= isset($_POST['lulus_praktek']) ? intval($_POST['lulus_praktek']) : 0; //edit

$response = array();
$response['code'] = 'SUCCESS';
$response['msg'] = 'Update Hasil Praktek Sukses';
$response['nomor'] = '';
$errors = array();

$nomor = get_no_antrian('foto');
$response['nomor'] = $nomor;

$mysqli->autocommit(false);
$sql = "UPDATE pendaftaran SET lulus_teori='$lulus_teori',lulus_praktek='$lulus_praktek',`nomor`='{$nomor}',tujuan='foto' where id='$id'";
if (!$mysqli->query($sql)) {
    $errors[] = $mysqli->error;
    $response['code'] = 'ERROR';
}
if ($hasil == 1) {
    $tujuan = 'foto';
    $sql = "INSERT INTO antrian (";
    $sql .= "`id_pendaftaran`,`tujuan`,`nomor`)";
    $sql .= " values('" . $id . "','" . $tujuan . "','" . $nomor . "')";
    if (!$mysqli->query($sql)) {
        $errors[] = $mysqli->error;
        $response['code'] = 'ERROR';
    }
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