/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  HP
 * Created: Nov 2, 2016
 */


CREATE
    /*[ALGORITHM = {UNDEFINED | MERGE | TEMPTABLE}]
    [DEFINER = { user | CURRENT_USER }]
    [SQL SECURITY { DEFINER | INVOKER }]*/
    VIEW `pusatgps`.`view_shipment` 
    AS
(
SELECT s.*,
v.nopol,
ss.status,
poi_asal.poi AS poi_asal,
poi_tujuan.poi AS poi_tujuan,
d.driver
 FROM shipment s 
LEFT JOIN vehicle v ON V.id=s.vh_id 
LEFT JOIN shipment_status ss ON ss.id=id_status
LEFT JOIN driver d ON d.id=s.id_driver1
LEFT JOIN poi poi_asal ON poi_asal.id= s.id_asal
LEFT JOIN poi poi_tujuan ON poi_tujuan.id=s.id_tujuan
);
