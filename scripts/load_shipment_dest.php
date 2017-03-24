<?php
require_once 'connection.php';
$response = array();
//$query = isset($_GET['filter']['value']) ? " where nopol like '%" . $mysqli->real_escape_string($_GET['filter']['value']) . "%'" : '';
$id = isset($_GET['id']) ?intval($_GET['id']):0;
$result = $mysqli->query("select * from view_shipment_dest WHERE id_shipment='" . $id ."'");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        array_push($response, $row);
    }
    $result->free();
}
$mysqli->close();
echo json_encode($response);
?>