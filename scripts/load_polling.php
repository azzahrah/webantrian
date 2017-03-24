<?php
require_once 'connection.php';
$response = array();
$from_date=isset($_POST['from_date'])?$mysqli->real_escape_string($_POST['from_date']):'';
$to_date=isset($_POST['to_date'])?$mysqli->real_escape_string($_POST['to_date']):'';
$sql = "SELECT * FROM polling_ikm WHERE DATE(tgl)=CURDATE() ORDER BY id DESC";
if($from_date !=""){
   $sql = "select * from polling_ikm where DATE(tgl)>='".  $from_date ."' and DATE(tgl)<='".  $to_date ."' ORDER BY id DESC"; 
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