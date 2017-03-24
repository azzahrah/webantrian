<?php
require_once 'connection.php';
require_once '../f.php';
$response = array();
$tgl_pendaftaran = date('Y-m-d');
$id = isset($_POST['id']) ? intval($_POST['id']) : '';
$tag = isset($_POST['tag']) ? $mysqli->real_escape_string($_POST['tag']) : '';
$sub_tag = isset($_POST['sub_tag']) ? $mysqli->real_escape_string($_POST['sub_tag']) : '';
$tujuan = isset($_POST['tujuan']) ? $mysqli->real_escape_string($_POST['tujuan']) : '';
$lulus = isset($_POST['lulus']) ? intval($_POST['lulus']) : '';
$hold = isset($_POST['hold']) ? intval($_POST['hold']) : '0';
$stage = isset($_POST['stage']) ? intval($_POST['stage']) : '0';
$where = "";
$response['tag'] = $tag;
$response['sub_tag'] = $sub_tag;
$response['code'] = 'ERROR';
$response['msg'] = 'TIDAK ADA INFO';
$errors = array();
if ((strcmp($tag, "antrian") == 0) && (strcmp($sub_tag, "load") == 0)) {
    $response['data'] = array();
    if ($tujuan == 'teori') {
        $where = " where stage='0' and tujuan='$tujuan' and called='0' and hold='0' and tgl_pendaftaran='$tgl_pendaftaran'"; // " WHERE called='0' and tgl_pendaftaran='$tgl_pendaftaran'";
    } else if ($tujuan == 'praktik') {
        $where = " where stage='2' and tujuan='$tujuan' and called='0' and hold='0' and tgl_pendaftaran='$tgl_pendaftaran'"; // " WHERE called='0' and tgl_pendaftaran='$tgl_pendaftaran'";
    } else if ($tujuan == 'foto') {
        $where = " where stage='4' and tujuan='$tujuan' and called='0' and hold='0' and tgl_pendaftaran='$tgl_pendaftaran'"; // " WHERE called='0' and tgl_pendaftaran='$tgl_pendaftaran'";
    } else if ($tujuan == 'ambil') {
        $where = " WHERE stage='5' and tujuan='$tujuan' and called='0' and hold='0' and tgl_pendaftaran='$tgl_pendaftaran'";
    } else {
        $where = " where stage='-1'";
    }
    $sql = "select * from pendaftaran " . $where . " ORDER by nomor ASC limit 10";
    $response['sql'] = $sql;
    $result = $mysqli->query($sql);
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            array_push($response['data'], $row);
        }
        $result->free();
        $response['code'] = 'SUCCESS';
        $response['msg'] = 'Load Antrian Sukses...';
        $response['sql'] = $sql;
    } else {
        $response['code'] = 'ERROR';
        $response['msg'] = 'Load Antrian Error...';
        $response['sql'] = $sql;
    }
} elseif ((strcmp($tag, "antrian") == 0) && (strcmp($sub_tag, "load_hasil") == 0)) {
    $response['data'] = array();
    $where = " WHERE tujuan='$tujuan'  and tgl_pendaftaran='$tgl_pendaftaran'";
    $sql = "select * from pendaftaran " . $where . " ORDER by nomor ASC";
    $result = $mysqli->query($sql);
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            array_push($response['data'], $row);
        }
        $result->free();
        $response['code'] = 'SUCCESS';
        $response['msg'] = 'Load Antrian Sukses...';
        $response['sql'] = $sql;
    } else {
        $response['code'] = 'ERROR';
        $response['msg'] = 'Load Antrian Error...';
        $response['sql'] = $sql;
    }
} elseif ((strcmp($tag, "antrian") == 0) && (strcmp($sub_tag, "update_called") == 0)) {
    /*
     * 0 antri teori
     * 1 sedang teori
     * 2 antri praktik
     * 3 sedang praktik
     * 4 antri foto
     * 5 antri ambil
     * 6 selesaai
     * 7 gagal
     */
    $sql = ""; // "UPDATE pendaftaran SET called='1',stage='1',called_count=called_count+1 where id='$id'"; // and tujuan='$tujuan'";
    if ($tujuan == 'teori') {
        $sql = "UPDATE pendaftaran SET `called`='1',`stage`='1' where id='" . $id . "'"; // and tujuan='$tujuan'";                  
    } else if ($tujuan == 'praktik') {
        $sql = "UPDATE pendaftaran SET called='1',stage='3',called_count=called_count+1 where id='" . $id . "'"; // and tujuan='$tujuan'";                  
    } else if ($tujuan == 'foto') {
        //Khusus foto ke 
        $sql = "UPDATE pendaftaran SET called='0',tujuan='ambil',`stage`='5',called_count=called_count+1 where id='$id'"; // and tujuan='$tujuan'";                  
    } else if ($tujuan == 'ambil') {
        $sql = "UPDATE pendaftaran SET called='1',stage='6',called_count=called_count+1 where id='$id'"; // and tujuan='$tujuan'";                  
    }
    if (!$mysqli->query($sql)) {
        $response['msg'] = $mysqli->error;
        $response['code'] = 'ERROR';
        $response['sql'] = $sql;
    } else {
        $response['msg'] = 'Update Called Success';
        $response['code'] = 'SUCCESS';
        $response['sql'] = $sql;
    }
} elseif ((strcmp($tag, "antrian") == 0) && (strcmp($sub_tag, "update_hasil") == 0)) {
    /*
     * 0 antri teori
     * 1 sedang teori
     * 2 antri praktik
     * 3 sedang praktik
     * 4 antri foto
     * 5 antri ambil
     * 6 selesaai
     * 7 gagal
     */
    $sql = "UPDATE pendaftaran SET lulus_teori='$lulus',called='0' where id='$id'"; // and tujuan='$tujuan'";
    if (($tujuan == 'teori') && ((int) $lulus == 2)) {
        $sql = "UPDATE pendaftaran SET lulus_teori='$lulus',called='0',stage='7' where id='$id' and stage='1'"; // and tujuan='$tujuan'";               
    } else if (($tujuan == 'teori') && ((int) $lulus == 1)) {
        $sql = "UPDATE pendaftaran SET lulus_teori='$lulus',tujuan='praktik',called='0',stage='2' where id='$id' and stage='1'"; // and tujuan='$tujuan'";               
    } else if (($tujuan == 'praktik') && ((int) $lulus == 2)) {
        $sql = "UPDATE pendaftaran SET lulus_praktik='$lulus',called='1',stage='7',gagal='1' where id='$id' and stage='3'"; // and tujuan='$tujuan'";               
    } else if (($tujuan == 'praktik') && ((int) $lulus == 1)) {
        $sql = "UPDATE pendaftaran SET lulus_praktik='$lulus',tujuan='foto',called='0',stage='4' where id='$id' and stage='3'"; // and tujuan='$tujuan'";               
    }
    if (!$mysqli->query($sql)) {
        $response['msg'] = $mysqli->error;
        $response['code'] = 'ERROR';
    } else {
        $response['msg'] = 'Update Called Success';
        $response['code'] = 'SUCCESS';
    }
} elseif ((strcmp($tag, "antrian") == 0) && (strcmp($sub_tag, "cancel_update_hasil") == 0)) {
    /*
     * 0 antri teori
     * 1 sedang teori
     * 2 antri praktik
     * 3 sedang praktik
     * 4 antri foto
     * 5 antri ambil
     * 6 selesaai
     * 7 gagal
     */

    $sql = '';
    if (($tujuan == 'teori') && ((int) $lulus == 1)) {
        $sql = "UPDATE pendaftaran SET lulus_teori='$lulus',tujuan='praktik',called='0',stage='2',gagal='0' where id='$id'"; // and tujuan='$tujuan'";               
    }else if (($tujuan == 'teori') && ((int) $lulus == 2)) {
        $sql = "UPDATE pendaftaran SET lulus_teori='2',tujuan='teori',called='1',stage='7',gagal='1' where id='$id'"; // and tujuan='$tujuan'";               
    }else if (($tujuan == 'praktik') && ((int) $lulus == 1)) {
        $sql = "UPDATE pendaftaran SET lulus_praktik='$lulus',tujuan='foto',called='0',stage='4',gagal='0' where id='$id'"; // and tujuan='$tujuan'";               
    } else if (($tujuan == 'praktik') && ((int) $lulus == 2)) {
        $sql = "UPDATE pendaftaran SET lulus_teori='2',stage='7', called='1',gagal='1' where id='$id'"; // and tujuan='$tujuan'";               
    }else if (($tujuan == 'foto') && ((int) $lulus == 1)) {
        $sql = "UPDATE pendaftaran SET lulus_teori='1',lulus_praktik='$lulus',called='0',stage='4' where id='$id'"; // and tujuan='$tujuan'";               
    }else if (($tujuan == 'foto') && ((int) $lulus == 2)) {
        $sql = "UPDATE pendaftaran SET tujuan='praktik',lulus_praktik='2',called='1',stage='7',gagal='1' where id='$id'"; // and tujuan='$tujuan'";               
    }
    if (!$mysqli->query($sql)) {
        $response['msg'] = $mysqli->error;
        $response['code'] = 'ERROR';
        $response['sql'] = $sql;
        $response['post'] = $_POST;
    } else {
        $response['msg'] = 'Cancel Update Success';
        $response['code'] = 'SUCCESS';
        $response['sql'] = $sql;
        //$response['post'] = $_POST;
        $result = $mysqli->query("SELECT * FROM pendaftaran where id='$id'");
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $response['data'] = $row;
            }
        }
    }
} elseif ((strcmp($tag, "antrian") == 0) && (strcmp($sub_tag, "load_hold") == 0)) {
    $response['data'] = array();
    $where = " WHERE hold='1' and tujuan ='" . $tujuan . "' and called='0' and tgl_pendaftaran='$tgl_pendaftaran'"; // " WHERE called='0' and tgl_pendaftaran='$tgl_pendaftaran'";
    $result = $mysqli->query("select * from pendaftaran " . $where . " ORDER by nomor ASC");
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            array_push($response['data'], $row);
        }
        $result->free();
        $response['code'] = 'SUCCESS';
        $response['msg'] = 'Load data hold Sukses...';
    } else {
        $response['code'] = 'ERROR';
        $response['msg'] = 'Load data hold Error...';
    }
} elseif ((strcmp($tag, "antrian") == 0) && (strcmp($sub_tag, "hold") == 0)) {
    $sql = "UPDATE pendaftaran SET hold='" . $hold . "' where id='$id'";
    if (!$mysqli->query($sql)) {
        $response['msg'] = $mysqli->error;
        $response['code'] = 'ERROR';
    } else {
        $response['msg'] = 'Hold Antrian Sukses';
        $response['code'] = 'SUCCESS';
    }
} elseif ((strcmp($tag, "antrian") == 0) && (strcmp($sub_tag, "finish") == 0)) {
    $sql = "UPDATE pendaftaran SET hold='" . $hold . "' where id='$id'";
    if (!$mysqli->query($sql)) {
        $response['msg'] = $mysqli->error;
        $response['code'] = 'ERROR';
    }
} elseif ((strcmp($tag, "antrian") == 0) && (strcmp($sub_tag, "next") == 0)) {
    $response['data'] = get_antrian($tujuan);
    if ($response['data'] != null) {
        $response['code'] = 'SUCCESS';
        $response['msg'] = 'Loading Antrian Sukses';
    } else {
        $response['msg'] = 'Data Antrian Kosong';
    }
} elseif (strcmp($tag, "login") == 0) {
    $username = isset($_POST['username']) ? $mysqli->real_escape_string($_POST['username']) : '';
    $password = isset($_POST['password']) ? $mysqli->real_escape_string($_POST['password']) : '';
    $result = $mysqli->query("select * from user WHERE login='" . $username . "' and password=PASSWORD('$password')");
    if ($result) {
        if ($result->num_rows > 0) {
            $response['code'] = 'SUCCESS';
            $response['msg'] = 'LOGIN SUCCESS';
            $row = $result->fetch_assoc();
            $response['data'] = $row;
        } else {
            $response['code'] = 'ERROR';
            $response['msg'] = 'LOGIN ERROR';
        }
        $result->free();
    }
} elseif (strcmp($tag, "user") == 0) {
    $id = isset($_POST['id']) ? addslashes($mysqli->real_escape_string($_POST['id'])) : ''; //edit
    $nama = isset($_POST['nama']) ? addslashes($mysqli->real_escape_string($_POST['nama'])) : ''; //edit
    $alamat = isset($_POST['alamat']) ? addslashes($mysqli->real_escape_string($_POST['alamat'])) : ''; //edit
    $kelamin = isset($_POST['kelamin']) ? $mysqli->real_escape_string($_POST['kelamin']) : 'LK'; //edit
    $no_ktp = isset($_POST['no_ktp']) ? $mysqli->real_escape_string($_POST['no_ktp']) : ''; //edit
    $no_sim = isset($_POST['no_sim']) ? $mysqli->real_escape_string($_POST['no_sim']) : ''; //edit
    $no_hp = isset($_POST['no_hp']) ? $mysqli->real_escape_string($_POST['no_hp']) : ''; //edit
    $pendidikan = isset($_POST['pendidikan']) ? $mysqli->real_escape_string($_POST['pendidikan']) : ''; //edit
    $pekerjaan = isset($_POST['pekerjaan']) ? $mysqli->real_escape_string($_POST['pekerjaan']) : ''; //edit
    $tmp_lahir = isset($_POST['tmp_lahir']) ? addslashes($mysqli->real_escape_string($_POST['tmp_lahir'])) : ''; //edit
    $tgl_lahir = isset($_POST['tgl_lahir']) ? $mysqli->real_escape_string($_POST['tgl_lahir']) : '0000-00-00 00:00:00'; //edit
    $jenis_pendaftaran = isset($_POST['jenis_pendaftaran']) ? $mysqli->real_escape_string($_POST['jenis_pendaftaran']) : ''; //edit
    $login = isset($_POST['login']) ? $mysqli->real_escape_string($_POST['login']) : ''; //edit
    $password = isset($_POST['password']) ? $mysqli->real_escape_string($_POST['password']) : ''; //edit

    switch ($sub_tag) {
        case 'add':
            $sql = "INSERT INTO user (";
            $sql .= "`tgl_pendaftaran`,`nama`,`alamat`,`kelamin`,`tmp_lahir`,`tgl_lahir`,`pendidikan`,`pekerjaan`,`no_hp`,`no_ktp`,`login`,`password`)";
            $sql .= " values('" . date('Y-m-d') . "','" . $nama . "','" . $alamat . "','" . $kelamin . "','" . $tmp_lahir . "','" . $tgl_lahir . "','" . $pendidikan . "','" . $pekerjaan . "','" . $no_hp . "','" . $no_ktp . "','" . $login . "',PASSWORD('" . $password . "'))";
            break;
        case 'edit':
            $sql = "UPDATE user (";
            $sql .= "`tgl_pendaftaran`,`nama`,`alamat`,`kelamin`,`tmp_lahir`,`tgl_lahir`,`pendidikan`,`pekerjaan`,`no_hp`,`no_ktp`,`login`,`password`)";
            $sql .= " nama='" . $nama . "',alamat='" . $alamat . "',kelamin='" . $kelamin . "',tmp_lahir='" . $tmp_lahir . "',tgl_lahir='" . $tgl_lahir . "',pendidikan='" . $pendidikan . "',pekerjaan='" . $pekerjaan . "',no_hp='" . $no_hp . "',no_ktp='" . $no_ktp . "' where id='$id'";
            break;
    }

    if (!$mysqli->query($sql)) {
        $response['msg'] .= $mysqli->error;
        $response['code'] = 'ERROR';
    } else {
        $response['msg'] .= 'Pendaftaran Success';
        $response['code'] = 'SUCCESS';
    }
} elseif (strcmp($tag, "save_polling") == 0) {
	$nama = isset($_POST['nama']) ? $mysqli->real_escape_string($_POST['nama']) : ''; //edit
    $pilihan = isset($_POST['pilihan']) ? $mysqli->real_escape_string($_POST['pilihan']) : ''; //edit
    $comment = isset($_POST['comment']) ? $mysqli->real_escape_string($_POST['comment']) : ''; //edit
	
	if (!$mysqli->query("INSERT INTO polling_ikm (`tgl`,`nama`,`pilihan`,`comment`) value('". date('Y-m-d H:i:s')."','". $nama."','". $pilihan."','".$comment ."')")) {
        $response['msg'] .= $mysqli->error;
        $response['code'] = 'ERROR';
    } else {
        $response['msg'] .= 'Pendaftaran Success';
        $response['code'] = 'SUCCESS';
    }
}

//switch ($tag) {
//    case 'reg_sim':
//        switch ($sub_tag) {
//            case 'add':
//                $nama = isset($_POST['nama']) ? addslashes($mysqli->real_escape_string($_POST['nama'])) : ''; //edit
//                $alamat = isset($_POST['alamat']) ? addslashes($mysqli->real_escape_string($_POST['alamat'])) : ''; //edit
//                $kelamin = isset($_POST['kelamin']) ? $mysqli->real_escape_string($_POST['kelamin']) : 'LK'; //edit
//                $no_ktp = isset($_POST['no_ktp']) ? $mysqli->real_escape_string($_POST['no_ktp']) : ''; //edit
//                $no_sim = isset($_POST['no_sim']) ? $mysqli->real_escape_string($_POST['no_sim']) : ''; //edit
//                $no_hp = isset($_POST['no_hp']) ? $mysqli->real_escape_string($_POST['no_hp']) : ''; //edit
//                $tmp_lahir = isset($_POST['tmp_lahir']) ? addslashes($mysqli->real_escape_string($_POST['tmp_lahir'])) : ''; //edit
//                $tgl_lahir = isset($_POST['tgl_lahir']) ? $mysqli->real_escape_string($_POST['tgl_lahir']) : '0000-00-00 00:00:00'; //edit
//                $jenis_pendaftaran = isset($_POST['jenis_pendaftaran']) ? $mysqli->real_escape_string($_POST['jenis_pendaftaran']) : ''; //edit
//
//                $lulus_teori = 0;
//                $lulus_praktik = 0;
//                $tujuan = '';
//                if ($jenis_pendaftaran == 'perpanjangan') {
//                    $tujuan = 'foto';
//                    $lulus_teori = 1;
//                    $lulus_praktik = 1;
//                } else if ($jenis_pendaftaran == 'baru') {
//                    $tujuan = 'teori';
//                }
//                $nomor = get_no_antrian($tujuan);
//                $sql = "INSERT INTO pendaftaran (";
//                $sql .= "`tgl_pendaftaran`,`jenis_pendaftaran`,`tujuan`,`nomor`,`nama`,`alamat`,`kelamin`,`tmp_lahir`,`tgl_lahir`,`lulus_teori`,`lulus_praktik`)";
//                $sql .= " values('" . date('Y-m-d') . "','" . $jenis_pendaftaran . "','" . $tujuan . "','" . $nomor . "','" . $nama . "','" . $alamat . "','" . $kelamin . "','" . $tmp_lahir . "','" . $tgl_lahir . "','" . $lulus_teori . "','" . $lulus_praktik . "')";
//
//                if (!$mysqli->query($sql)) {
//                    $response['msg'] = $mysqli->error;
//                    $response['code'] = 'ERROR';
//                } else {
//                    $response['msg'] = 'Pendaftaran Success';
//                    $response['code'] = 'SUCCESS';
//                }
//                break;
//        }
//        break;
//}
$mysqli->close();
echo json_encode($response);
?>