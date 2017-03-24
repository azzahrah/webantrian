<?php

require_once 'connection.php';
$response = array();
$tgl_pendaftaran = date('Y-m-d');
$mode = isset($_POST['mode']) ? $mysqli->real_escape_string($_POST['mode']) : 'normal'; //755

$keterangan = isset($_POST['keterangan']) ? $mysqli->real_escape_string($_POST['keterangan']) : ''; //755
$sql = "select * from video ORDER by nomor ASC";
switch ($mode) {
    case 'normal':
        break;
    case 'search':
        $sql = "select * from video WHERE keterangan like '%$keterangan%' ORDER by nomor ASC";
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