<?php
$response['tag']='antrian';
$response['sub_tag']='load';
$response['data']=array();

$res=array();
array_push($res, "Test1");
array_push($res, "Test2");
echo json_encode($res);

?>