<?php

require 'connection.php';
require 'f.php';
$id = isset($_POST['id']) ? intval($_POST['id']) : 0; //755
$tujuan = isset($_POST['tujuan']) ? $mysqli->real_escape_string($_POST['tujuan']) : ''; //edit
$response = array();
$response['tag'] = 'reg_sim';
$response['sub_tag'] = 'next';
$row = get_antrian($tujuan);
if ($row != null) {
    $response['data'] = $row;
}
$mysqli->close();
print json_encode($response);
?>