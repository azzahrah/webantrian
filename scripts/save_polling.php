<?php

require_once 'connection.php';
require_once 'f.php';
$id = isset($_POST['id']) ? intval($_POST['id']) : 0; //755
$mode = isset($_POST['mode']) ? $mysqli->real_escape_string($_POST['mode']) : ''; //edit
$runningtext = isset($_POST['runningtext']) ? $mysqli->real_escape_string($_POST['runningtext']) : ''; //edit
$response = array();
$response['code'] = 'ERROR';
$response['msg'] = "";
$sql = "";
switch ($mode) {
    case "add":
        $sql = "INSERT INTO runningtext (";
        $sql .= "`runningtext`)";
        $sql .= " values('" . $runningtext . "')";
        if (!$mysqli->query($sql)) {
            $errors[] = $mysqli->error;
            $response['msg'] = $mysqli->error;
        } else {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'Add Runningtext Sukses';
        }
        break;
    case 'edit':
        $sql = "UPDATE runningtext set runningtext='" . $runningtext . "' WHERE id='$id'";
        if (!$mysqli->query($sql)) {
            $errors[] = $mysqli->error;
            $response['msg'] = $mysqli->error;
        } else {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'Update Runningtext Sukses';
        }
        break;
    case 'delete':
        $sql = "DELETE FROM polling_ikm where id='" . $id . "' LIMIT 1";
        if (!$mysqli->query($sql)) {
            $errors[] = $mysqli->error;
            $response['msg'] = $mysqli->error;
        } else {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'Delete Polling Sukses';
        }
        break;
}

$mysqli->close();
print json_encode($response);
?>