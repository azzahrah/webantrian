<?php

require_once 'connection.php';
require_once 'f.php';
$ids_json = isset($_POST['data']) ? json_decode($_POST['data']) : '';

//$user_level = isset($_SESSION['user_level']) ? $mysqli->real_escape_string($_SESSION['user_level']) : '';
$id = isset($_POST['id']) ? intval($_POST['id']) : 0; //755
$vh_id = isset($_POST['vh_id']) ? intval($_POST['vh_id']) : 0; //755
$user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0; //755
$mode = isset($_POST['mode']) ? $mysqli->real_escape_string($_POST['mode']) : ''; //edit
$nama = isset($_POST['nama']) ? addslashes($mysqli->real_escape_string($_POST['nama'])) : ''; //edit
$alamat = isset($_POST['alamat']) ? addslashes($mysqli->real_escape_string($_POST['alamat'])) : ''; //edit
$kelamin = isset($_POST['kelamin']) ? $mysqli->real_escape_string($_POST['kelamin']) : 'LK'; //edit
$no_ktp = isset($_POST['no_ktp']) ? $mysqli->real_escape_string($_POST['no_ktp']) : ''; //edit
$no_sim = isset($_POST['no_sim']) ? $mysqli->real_escape_string($_POST['no_sim']) : ''; //edit
$no_hp = isset($_POST['no_hp']) ? $mysqli->real_escape_string($_POST['no_hp']) : ''; //edit
$tmp_lahir = isset($_POST['tmp_lahir']) ? addslashes($mysqli->real_escape_string($_POST['tmp_lahir'])) : ''; //edit
$tgl_lahir = isset($_POST['tgl_lahir']) ? $mysqli->real_escape_string($_POST['tgl_lahir']) : '0000-00-00 00:00:00'; //edit
$jenis_pendaftaran = isset($_POST['jenis_pendaftaran']) ? $mysqli->real_escape_string($_POST['jenis_pendaftaran']) : ''; //edit


$tujuan = 'teori';
$lulus_teori = 0;
$lulus_praktik = 0;
$stage = 0;

if ($jenis_pendaftaran == 'perpanjangan') {
    $tujuan = 'foto';
    $lulus_teori = 1;
    $lulus_praktik = 1;
    $stage = 4; //antri foto
} else if ($jenis_pendaftaran == 'baru') {
    $tujuan = 'teori';
}else if ($jenis_pendaftaran == 'mengulang') {
    $tujuan = 'praktik';
    $lulus_teori = 1;
    $lulus_praktik = 0;
    $stage = 2;
}
$response = array();
$response['code'] = 'ERROR';
$response['msg'] = array();
$sql = "";
$error = false;
$errors = array();
switch ($mode) {
    case "add":
        $nomor = get_no_antrian($tujuan);
        $sql = "INSERT INTO pendaftaran (";
        $sql .= "`tgl_pendaftaran`,`jenis_pendaftaran`,`tujuan`,`nomor`,`nama`,`alamat`,`kelamin`,`tmp_lahir`,`tgl_lahir`,`lulus_teori`,`lulus_praktik`,`stage`)";
        $sql .= " values('" . date('Y-m-d') . "','" . $jenis_pendaftaran . "','" . $tujuan . "','" . $nomor . "','" . $nama . "','" . $alamat . "','" . $kelamin . "','" . $tmp_lahir . "','" . $tgl_lahir . "','" . $lulus_teori . "','" . $lulus_praktik . "','$stage')";
        $response['sql'] = $sql;
        break;
    case 'edit':

        $sql = "UPDATE pendaftaran SET nama='" . $nama . "',alamat='" . $alamat . "',kelamin='" . $kelamin . "',tmp_lahir='" . $tmp_lahir . "',tgl_lahir='" . $tgl_lahir . "' WHERE id='$id'";
        $response['sql'] = $sql;
        break;
    case 'ulangi_praktik':
        $nomor = get_no_antrian($tujuan);
        $sql = "UPDATE pendaftaran SET tgl_pendaftaran='" . date('Y-m-d') . "',nomor='$nomor',tujuan='praktik',stage='3',called='0',hold='0' WHERE id='$id' and gagal>='1'";
        if (!$mysqli->query($sql)) {
            $errors[] = $mysqli->error;
            $response['msg'] = $mysqli->error;
        }else{
           $response['code']='SUCCESS';
           $response['msg']='Update Ulang Praktik Sukses';           
        }
        $sql = "";
        break;
    case 'delete':
        $sql = "DELETE FROM pendaftaran where id='" . $id . "' LIMIT 1";
        break;
    case 'update_teori':
        $mysqli->autocommit(false);
        foreach ($ids_json as $value) {
            $id = $value->id;
            $response['msg'][] = $value;
            $sql = "update pendaftaran SET lulus_teori='" . $value->lulus . "' WHERE id='" . $value->id . "' LIMIT 1";
            if (!$mysqli->query($sql)) {
                $errors[] = $mysqli->error;
            }
        }
        if (count($errors) === 0) {
            $response['msg'][] = 'Tambah Data Pendaftaran Sukses';
            $mysqli->commit();
        } else {
            $response['msg'] = $errors;
            $mysqli->rollback();
        }
        $sql = "";
        break;
    case 'update_praktik':
        $mysqli->autocommit(false);
        foreach ($ids_json as $value) {
            $id = $value->id;
            $response['msg'][] = $value;
            $sql = "update pendaftaran SET lulus_praktik='" . $value->lulus . "' WHERE id='" . $value->id . "' LIMIT 1";
            if (!$mysqli->query($sql)) {
                $errors[] = $mysqli->error;
            }
        }
        if (count($errors) === 0) {
            $response['msg'][] = 'Tambah Data Pendaftaran Sukses';
            $mysqli->commit();
        } else {
            $response['msg'] = $errors;
            $mysqli->rollback();
        }
        $sql = "";
        break;
}
if ($sql != "") {
    $mysqli->autocommit(false);
    if (!$mysqli->query($sql)) {
        $errors[] = $mysqli->error;
    }
    if (count($errors) === 0) {
        $response['msg'][] = 'Tambah Data Pendaftaran Sukses';
        $mysqli->commit();
    } else {
        $response['msg'] = $errors;
        $mysqli->rollback();
    }
}
$mysqli->close();
print json_encode($response);
?>