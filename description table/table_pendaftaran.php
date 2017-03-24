<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Penjelasan fiel-fiel tabel pendaftaran
 * stage=0, masih mendaftar
 * stage=1, teori
 * stage=2, praktek
 * stage=3, foto
 * stage=4, pengambilan hasil
 * stage=5, selesai
 * 
 * lulus_teori=0, masih belum
 * lulus_teori=1, lulus teori, stage diupdate =2
 * lulus_teori=2, tidak lulus, stage diupdate =5
 * 
 * lulus_praktek=0, masih belum 
 * lulus_praktek=1, lulus praktek, stage diupdate=3
 * lulus_praktek=2, tidak lulus, stage diupdate=5
 * jika praktek tidak lulus, buat jadwal praktek ulang, 
 * kirim notifikasi kepada pendaftara jika mendekati waktu praktek
 * 
 * 
 * saat mendaftar baru set field-field
 * -------------------------------------------
 * stage=0
 * lulus_teori=0
 * lulus_praktek=0
 * saat mendaftar perpanjangan set field-field
 * --------------------------------------------
 * stage=3
 * lulus_teori=1
 * lulus_praktek=1
 */
?>