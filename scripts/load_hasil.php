<?php
require_once 'connection.php';
$tgl_pendaftaran = date('Y-m-d');
$response = array();
$sql = "select * from pendaftaran WHERE stage>=1 and (`jenis_pendaftaran`='baru' or `jenis_pendaftaran`='mengulang') and DATE(tgl_pendaftaran)='" . $tgl_pendaftaran . "' ORDER by id DESC LIMIT 20";
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