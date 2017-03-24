/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  HP
 * Created: Nov 7, 2016
 */

INSERT INTO track_backup (tdate,sdate,user_id,vh_id,imei,nopol,lat,lng,speed,angle,acc,charge,gsm,sat,address,poi,odometer,batt,gf_id,gf) 
SELECT tdate,sdate,user_id,vh_id,imei,nopol,lat,lng,speed,angle,acc,charge,gsm,sat,address,poi,odometer,batt,gf_id,gf FROM track