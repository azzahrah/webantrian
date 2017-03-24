<?php
require_once 'connection.php';
//$user_level = isset($_SESSION['user_level']) ? $mysqli->real_escape_string($_SESSION['user_level']) : '';

$id = isset($_POST['id']) ? intval($_POST['id']) : 0; //755
$vh_id = isset($_POST['vh_id']) ? intval($_POST['vh_id']) : 0; //755
$user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0; //755
$mode = isset($_POST['mode']) ? $mysqli->real_escape_string($_POST['mode']) : ''; //edit
$id_status = isset($_POST['id_status']) ? $mysqli->real_escape_string($_POST['id_status']) : -1; //edit
$est_day = isset($_POST['est_day']) ? intval($_POST['est_day']) : 0; //edit

$type_unit = isset($_POST['type_unit']) ? $mysqli->real_escape_string($_POST['type_unit']) : ''; //edit
$no_order = isset($_POST['no_order']) ? $mysqli->real_escape_string($_POST['no_order']) : ''; //edit
$no_sj = isset($_POST['no_sj']) ? $mysqli->real_escape_string($_POST['no_sj']) : ''; //edit
$no_sm = isset($_POST['no_sm']) ? $mysqli->real_escape_string($_POST['no_sm']) : ''; //edit
$kode_tax = isset($_POST['kode_tax']) ? $mysqli->real_escape_string($_POST['kode_tax']) : ''; //edit
$area = isset($_POST['area']) ? $mysqli->real_escape_string($_POST['area']) : ''; //edit
$tgl_transaksi = isset($_POST['tgl_transaksi']) ? $mysqli->real_escape_string($_POST['tgl_transaksi']) : ''; //edit
$nama_pengirim = isset($_POST['nama_pengirim']) ? $mysqli->real_escape_string($_POST['nama_pengirim']) : ''; //edit
$kernet = isset($_POST['kernet']) ? $mysqli->real_escape_string($_POST['kernet']) : ''; //edit
$id_asal = isset($_POST['id_asal']) ? intval($_POST['id_asal']) : 0;
$id_tujuan = isset($_POST['id_tujuan']) ? intval($_POST['id_tujuan']) : 0;
$id_driver = isset($_POST['id_driver']) ? intval($_POST['id_driver']) : 0;
$id_driver2 = isset($_POST['id_driver2']) ? intval($_POST['id_driver2']) : 0;
$start = isset($_POST['start']) ? $mysqli->real_escape_string($_POST['start']) : '0000-00-00';
$descr = isset($_POST['descr']) ? $mysqli->real_escape_string($_POST['descr']) : '';

$destinations = isset($_POST['destinations']) ? $_POST['destinations'] : '';
$arrDestinations = json_decode($destinations);

$response = array();
$response['code'] = 'ERROR';
$response['msg'] = '';
$sql = "";
$error = false;
switch ($mode) {
    case "add":
        $sql = "INSERT INTO shipment (";
        $sql .= "`vh_id`,`user_id`,`id_asal`,`id_tujuan`,`est_day`,`id_driver`,";
        $sql .= "`id_driver2`,`descr`,`no_order`,`no_sj`,`no_sm`,`tgl_transaksi`)";
        
        $sql .= " values('" . $vh_id . "','" . $user_id . "','" . $id_asal . "','" . $id_tujuan . "',";
        $sql .= "'" . $est_day . "','" . $id_driver . "','" . $id_driver2 . "','" . $descr . "',";
        $sql .= "'" . $no_order . "','" . $no_sj . "','" . $no_sm . "','" . $tgl_transaksi . "')";
        $response['sql'] = $sql;
        if (!$mysqli->query($sql)) {
            $response['msg'] = $mysqli->error;
            $error = true;
        } else {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'Add Shipment Sukses';
            $lastId = $mysqli->insert_id;
        }
        break;
    case 'edit':
        $mysqli->autocommit(FALSE);
        $sql = "UPDATE shipment SET ";
        $sql .= "vh_id='" . $vh_id . "',user_id='" . $user_id . "',est_day='" . $est_day . "',";
        $sql .= "id_asal='" . $id_asal. "',id_tujuan='" . $id_tujuan. "',id_driver='" . $id_driver . "',";
        $sql .= "id_driver2='" . $id_driver2 . "',descr='" . $descr . "',";
        $sql .= "no_order='" . $no_order . "',no_sj='" . $no_sj . "',no_sm='" . $no_sm . "',";
        $sql .= "kode_tax='" . $kode_tax . "',area='" . $area . "',tgl_transaksi='" . $tgl_transaksi . "'";
        $sql .= " WHERE id='" . $id . "'";
        $response['sql'] = $sql;
        if (!$mysqli->query($sql)) {
            $response['msg'] =$sql;//." ". $mysqli->error;
            $error = true;
        } else {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'Update Shipment Sukses';
//            $lastId = $id;
//            $mysqli->query("DELETE FROM shipment_dest where shipment_id='" . $lastId . "'");
//            foreach ($arrDestinations as $result) {
//                $sql = "INSERT INTO shipment_dest (`shipment_id`,`nama_penerima`,`poi_id`,`poi`,`lat`,`lng`,`dist`,`arrive_est`,`duration`) values(";
//                $sql .="'" . $lastId . "',";
//                $sql .="'" . $result->nama_penerima . "',";
//                $sql .="'" . intval($result->poi_id) . "',";
//                $sql .="'" . $result->poi . "',";
//                $sql .="'" . floatval($result->lat) . "',";
//                $sql .="'" . floatval($result->lng) . "',";
//                $sql .="'" . floatval($result->dist) . "',";
//                $sql .="'" . $result->arrive_est . "',";
//                $sql .="'" . $result->duration . "')";
//
//                if (!$mysqli->query($sql)) {
//                    $response['code'] = 'ERROR';
//                    $response['msg'] = $mysqli->error;
//                    $response['sql'] = $sql;
//                    $error = true;
//                } else {
//                    $response['code'] = 'SUCCESS';
//                    $response['msg'] = "INSERT DATA SUCCESS";
//                }
//            }
        }
        if (!$error) {
            $mysqli->commit();
        }
        break;
    case 'update_status':
        if ($status != -1) {
            
            $sql = "UPDATE shipment SET id_status='" . $id_status . "',`start`='". date('Y-m-d') ."',arrive_est='". date('Y-m-d', strtotime("+". $est_day ." day"))   ."' where id='" . $id . "' LIMIT 1";
            if ($mysqli->query($sql)) {
                $response['code'] = 'SUCCESS';
                $response['msg'] = 'UPDATE Status Shipment Sukses';
            } else {
                $response['msg'] = "UPDATE Status Shipment Error :" . $mysqli->error;
            }
        }else{
           $response['msg'] = 'UPDATE UPDATE -1'; 
        }
        $mysqli->close();
        break;
    case 'delete':
        $sql = "DELETE FROM shipment where id='" . $id . "' LIMIT 1";
        if ($mysqli->query($sql)) {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'Delete Shipment Sukses';
        } else {
            $response['msg'] = "Delete Shipment Error :" . $mysqli->error;
        }
        $mysqli->close();
        break;
}
print json_encode($response);
?>