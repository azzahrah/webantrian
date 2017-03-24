<?php

require_once 'connection.php';
$response = array();
$tgl_pendaftaran = date('Y-m-d');
$mode = isset($_POST['mode']) ? $mysqli->real_escape_string($_POST['mode']) : 'normal'; //755
$sub_tag = isset($_POST['sub_tag']) ? $mysqli->real_escape_string($_POST['sub_tag']) : ''; //755
$nama = isset($_POST['nama']) ? $mysqli->real_escape_string($_POST['nama']) : ''; //755
$sub_filter = isset($_POST['sub_filter']) ? $mysqli->real_escape_string($_POST['sub_filter']) : ''; //755
$currDate=date('Y-m-d');

$sql = "select * from pendaftaran WHERE tgl_pendaftaran='$currDate' ORDER by id DESC";
switch ($mode) {
    case 'normal':
        break;
    case 'search':
        $sql = "select * from pendaftaran WHERE nama like '%$nama%' and gagal='1' ORDER by nama ASC";
        break;
    case 'filter':
        switch ($sub_filter) {
            case 'date':
                $tgl_pendaftaran = isset($_POST['tgl_pendaftaran']) ? $mysqli->real_escape_string($_POST['tgl_pendaftaran']) : ''; //755
                $sql = "select * from pendaftaran WHERE tgl_pendaftaran='" . $tgl_pendaftaran . "' ORDER by id DESC";
                break;
            case 'tujuan':
                $tujuan = isset($_POST['tujuan']) ? $mysqli->real_escape_string($_POST['tujuan']) : ''; //755
                $sql = "select * from pendaftaran WHERE tgl_pendaftaran='$currDate' and tujuan='" . $tujuan . "' ORDER by id DESC";
                break;
        }
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