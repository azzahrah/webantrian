<?php
require_once 'connection.php';
$response = array();
$sql = "select SQL_NO_CACHE * from video ORDER by nomor ASC";
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