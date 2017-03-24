<?php

require_once 'connection.php';
$response = array();
$tgl_pendaftaran = date('Y-m-d');
$mode = isset($_POST['mode']) ? $mysqli->real_escape_string($_POST['mode']) : 'normal'; //755
$runningtext = isset($_POST['runningtext']) ? $mysqli->real_escape_string($_POST['runningtext']) : ''; //755
$sql = "select * from runningtext ORDER by id DESC";
switch ($mode) {
    case 'normal':
        break;
    case 'search':
        $sql = "select * from runningtext WHERE runningtext like '%$runningtext%' ORDER by runningtext ASC";
        break;    
}
$result = $mysqli->query($sql);
if ($result) {
    while ($row = $result->fetch_assoc()) {
        array_push($response, $row);
    }
    $result->free();
}
$mysqli->close();
echo json_encode($response);
?>