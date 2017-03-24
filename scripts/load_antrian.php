<?php
require_once 'connection.php';
$response = array();
$tgl_pendaftaran = date('Y-m-d');
$tujuan = isset($_POST['tujuan']) ? $mysqli->real_escape_string($_POST['tujuan']) : '';
$where = "";
if ($tujuan == 'teori') {
    $where = " where lulus_teori='0' and lulus_praktik='0' and tujuan ='" . $tujuan . "' and called='0' and tgl_pendaftaran='$tgl_pendaftaran'"; // " WHERE called='0' and tgl_pendaftaran='$tgl_pendaftaran'";
} else if ($tujuan == 'praktik') {
    $where = " where lulus_teori='1' and lulus_praktik='0' and tujuan ='" . $tujuan . "' and called='0' and tgl_pendaftaran='$tgl_pendaftaran'"; // " WHERE called='0' and tgl_pendaftaran='$tgl_pendaftaran'";
} else if ($tujuan == 'foto') {
    $where = " where lulus_teori='1' and lulus_praktik='1' and tujuan ='" . $tujuan . "' and called='0' and tgl_pendaftaran='$tgl_pendaftaran'"; // " WHERE called='0' and tgl_pendaftaran='$tgl_pendaftaran'";
} else {
    $where = " WHERE called='0' and tgl_pendaftaran='$tgl_pendaftaran'";   
}
$result = $mysqli->query("select * from antrian " . $where . " ORDER by nomor ASC limit 50");

if ($result) {
    while ($row = $result->fetch_assoc()) {
        array_push($response, $row);
    }
    $result->free();
}
$mysqli->close();
echo json_encode($response);
?>