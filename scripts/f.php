<?php
function get_no_antrian($tujuan) {
    global $mysqli;
    $nomor = 0;
    $date=date('Y-m-d');
    //$sql = "SELECT MAX(nomor) as no from antrian where tujuan='" . $tujuan . "' LIMIT 1";
    $sql = "SELECT MAX(nomor) as no from pendaftaran where tgl_pendaftaran='$date'";
    if ($result = $mysqli->query($sql)) {
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $nomor =(int)$row['no']+1;
            }
        } else {
            $nomor = 1;
        }
        $result->free();
    }
    if ($nomor == 0) {
        $nomor = 1;
    }
    //$mysqli->close();
    return $nomor;
}
function get_antrian($tujuan) {
    global $mysqli;
    $row=null;
    $date=date('Y-m-d');
    $sql = "SELECT * from pendaftaran where tgl_pendaftaran='$date' and tujuan='" . $tujuan . "' and called='0' and hold='0' ORDER BY nomor ASC LIMIT 1";
    if ($result = $mysqli->query($sql)) {
        if ($result->num_rows > 0) {
           $row = $result->fetch_assoc();
        }
        $result->free();
    }
    return $row;
}
?>