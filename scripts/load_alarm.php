<?php
require_once 'session.php';
require_once 'connection.php';
$response = array();
$query = isset($_POST['user_id']) ? " where user_id='" . intval($_POST['user_id']) . "'" : '0';
$result = $mysqli->query("select * from track_alarm " . $query . " ORDER by tdate DESC");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        array_push($response, $row);
    }
    $result->free();
}
$mysqli->close();
echo json_encode($response);
?>