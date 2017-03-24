<?php

require_once 'connection.php';
require_once 'f.php';
$id = isset($_POST['id']) ? intval($_POST['id']) : 0; //755
$nomor = isset($_POST['nomor']) ? intval($_POST['nomor']) : 0; //755
$mode = isset($_POST['mode']) ? $mysqli->real_escape_string($_POST['mode']) : ''; //edit
$file = isset($_POST['file']) ? $mysqli->real_escape_string($_POST['file']) : ''; //edit
$keterangan = isset($_POST['keterangan']) ? $mysqli->real_escape_string($_POST['keterangan']) : ''; //edit
$response = array();
$response['code'] = 'ERROR';
$response['msg'] = "";
$sql = "";
switch ($mode) {
    case "add":
        $sql = "INSERT INTO video (";
        $sql .= "`keterangan`,`file`)";
        $sql .= " values('" . $keterangan . "','" . $file . "')";
        if (!$mysqli->query($sql)) {
            $errors[] = $mysqli->error;
            $response['msg'] = $mysqli->error;
        } else {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'Add Video Sukses';
        }
        break;
    case 'edit':
        $sql = "UPDATE video set keterangan='" . $keterangan . "',file='" . $file . "',nomor='" . $nomor . "' WHERE id='$id'";
        if (!$mysqli->query($sql)) {
            $errors[] = $mysqli->error;
            $response['msg'] = $mysqli->error;
        } else {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'Update Video Sukses';
        }
        break;
     case 'up_order':
        $sql = "UPDATE video set nomor=nomor+1 WHERE id='$id'";
        if (!$mysqli->query($sql)) {
            $errors[] = $mysqli->error;
            $response['msg'] = $mysqli->error;
        } else {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'Update Video Sukses';
        }
        break;    
    case 'down_order':
        $sql = "UPDATE video set nomor=nomor-1 WHERE id='$id'";
        if (!$mysqli->query($sql)) {
            $errors[] = $mysqli->error;
            $response['msg'] = $mysqli->error;
        } else {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'Update Video Sukses';
        }
        break;        
    case 'delete':
        $sql = "DELETE FROM video where id='" . $id . "' LIMIT 1";
        if (!$mysqli->query($sql)) {
            $errors[] = $mysqli->error;
            $response['msg'] = $mysqli->error;
        } else {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'Delete Video Sukses';
        }
        break;
}

$mysqli->close();
print json_encode($response);
?>