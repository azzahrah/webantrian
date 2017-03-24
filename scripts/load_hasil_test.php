<?php

require_once 'connection.php';
$response = array();
$result = $mysqli->query("select * from pendaftaran WHERE lulus_teori='0' or lulus_praktik='0' ORDER by id DESC");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        array_push($response, $row);
    }
    $result->free();
}
$mysqli->close();
echo json_encode($response);
?>