<?php

require_once 'connection.php';
$response = array();
$query = isset($_GET['filter']['value']) ? " where nama like '%" . $mysqli->real_escape_string($_GET['filter']['value']) . "%'" : '';
$result = $mysqli->query("select * from antrian WHERE hold='1' ORDER by hold_date ASC");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        array_push($response, $row);
    }
    $result->free();
}
$mysqli->close();
echo json_encode($response);
?>