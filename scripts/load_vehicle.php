<?php
require_once 'session.php';
require_once 'connection.php';
$user_level = isset($_SESSION['user_level']) ? $mysqli->real_escape_string($_SESSION['user_level']) : '';
$session_id = isset($_SESSION['user_id']) ? intval($_SESSION['user_id']) : '';
$response = array();
$query ="";
switch ($user_level){
    case "admin":
        $query = isset($_POST['user_id']) ? " where user_id='" . intval($_POST['user_id']) . "'" : '';
        if(intval($_POST['user_id']) ==0){
            $query = "";        
        }
        break;
    case "reseller":
        $query = isset($_POST['user_id']) ? " where user_id='" . intval($_POST['user_id']) . "'" : " where user_id='" . intval($user_id) . "' and reseller_id='". intval($reseller_id) ."'" ;
        break;
    default :
        $query ="user_id='". intval($session_id) ."'" ;        
        break;
}
$result = $mysqli->query("select * from view_vehicle_simple " . $query . " ORDER by nopol");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        array_push($response, $row);
    }
    $result->free();
}
$mysqli->close();
echo json_encode($response);
?>