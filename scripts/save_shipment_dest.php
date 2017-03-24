<?php
require_once 'connection.php';
$id = isset($_POST['id']) ? intval($_POST['id']) : 0; //755
$mode = isset($_POST['mode']) ? $mysqli->real_escape_string($_POST['mode']) : ''; //edit
$vh_id = isset($_POST['vh_id']) ? intval($_POST['vh_id']) : 0; //755
$id_poi = isset($_POST['id_poi']) ? intval($_POST['id_poi']) : 0; //755
$remainder = isset($_POST['remainder']) ? intval($_POST['remainder']) : 0; //755

$id_shipment = isset($_POST['id_shipment']) ? intval($_POST['id_shipment']) : 0; //755
$user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0; //755
$arrive_est = isset($_POST['arrive_est']) ? $mysqli->real_escape_string($_POST['arrive_est']) : '0000-00-00';

$response = array();
$response['code'] = 'ERROR';
$response['msg'] = '';
$sql = "";
$error = false;
$mode = 'add';
switch ($mode) {
    case "add":
        $sql = "INSERT INTO shipment_dest (`id_shipment`,`id_poi`,`arrive_est`,`vh_id`,`remainder`)";
        $sql .= "values('" . $id_shipment . "','" . $id_poi . "','" . $arrive_est . "','" . $vh_id . "','" . $remainder . "')";
        $response['sql'] = $sql;
        if (!$mysqli->query($sql)) {
            $response['msg'] = $mysqli->error;
            $error = true;
        } else {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'Add Shipment Destination Success';
            $lastId = $mysqli->insert_id;
        }
        break;
    case 'edit':
        $sql = "UPDATE shipment_dest (`id_shipment`,`id_poi`,`arrived_est`,`vh_id`,`remainder`)";
        $sql .= "SET id_shipment='" . $id_shipment . "',id_poi='" . $id_poi . "',arrive_est'" . $arrive_est . "',vh_id='" . $vh_id . "',remainder='" . $remainder . "' where id='" . $id . "'";
        $response['sql'] = $sql;
        if (!$mysqli->query($sql)) {
            $response['msg'] = $mysqli->error;
            $error = true;
        } else {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'Add Shipment Destination Success';
            $lastId = $mysqli->insert_id;
        }
        break;
    case 'delete':
        $sql = "DELETE FROM shipment where id='" . $id . "' LIMIT 1";
        if ($mysqli->query($sql)) {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'Delete Shipment Destination Success';
        } else {
            $response['msg'] = "Delete Shipment Error :" . $mysqli->error;
        }

        break;
}
$mysqli->close();
print json_encode($response);
?>