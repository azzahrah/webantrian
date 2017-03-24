var CUT_ENGINE = "cutengine";
var RESUME_ENGINE = "resumeengine";
var GET_LAST_POSITION = "position";
var OVER_SPEED = "overspeed";
var ENABLE_ALARM_PARK = "enable_alarm_park";

var form_shipment = {
    id: "form_shipment",
    view: "form",
    "elements": [
        {
            "view": "combo", "name": "vh_id", "label": "Nopol", "labelWidth": "170", suggest: "scripts/combo_vehicle.php"
        }
        ,
        {
            cols: [
                {"view": "combo", "name": "id_driver", "label": "Driver 1", "labelWidth": "170", "suggest": "scripts/combo_driver.php"},
                {view: "button", value: "+", width: 40, click: function () {
                        $$("window_driver").show();
                    }
                }
            ]
        },
        {
            cols: [
                {"view": "combo", "name": "id_driver2", "label": "Driver 2", "labelWidth": "170", "suggest": "scripts/combo_driver.php"},
                {view: "button", value: "+", width: 40, click: function () {
                        $$("window_driver").show();
                    }
                }
            ]
        },
        {
            cols: [
                {"view": "combo", "name": "id_asal", "label": "Asal", "labelWidth": "170", options: "scripts/combo_poi.php"},
                {view: "button", value: "+", width: 40, click: function () {
                        $$("window_poi").show();
                    }}
            ]
        },
        {
            cols: [
                {"view": "combo", "name": "id_tujuan", "label": "Tujuan", "labelWidth": "170", options: "scripts/combo_poi.php"},
                {view: "button", value: "+", width: 40, click: function () {
                        $$("window_poi").show();
                    }}
            ]
        },
        {
            "view": "combo", "name": "est_day", "label": "Lama Perjalanan (Hari)", "labelWidth": "170",
            options: [
                {id: 1, value: "1 Hari"},
                {id: 2, value: "2 Hari"},
                {id: 3, value: "3 Hari"},
                {id: 4, value: "4 Hari"}
            ]
        }
        ,
//        {
//            "view": "combo", "name": "id_kernet", "label": "Kernet", "labelWidth": "170", "suggest": "scripts/combo_kernet.php"
//
//        },        
        {
            "view": "text", "name": "no_order", "label": "No Order", "labelWidth": "170"
        },
        {
            "view": "datepicker", format: "%Y-%m-%d", stringResult: true, "name": "tgl_transaksi", "label": "Tgl Transaksi", "labelWidth": "170"
        },
//        {
//            "view": "text", "name": "no_sj", "label": "No SJ", "labelWidth": "170"
//        },
//        {
//            "view": "text", "name": "no_sm", "label": "No SM", "labelWidth": "170"
//        },
//        {
//            "view": "text", "name": "kode_tax", "label": "Kode Tax", "labelWidth": "170"
//        },
//        {
//            "view": "datepicker", format: "%Y-%m-%d", stringResult: true, "name": "tgl_berangkat", "label": "Tanggal Berangkat", "labelWidth": "170"
//        },

//        {
//            "view": "combo", "name": "area", "label": "Area", "labelWidth": "170", "suggest": "scripts/combo_area.php"},
//        {
//            "view": "combo", "name": "type_unit", "label": "Unit", "suggest": "scripts/load_vehicle_brand.php", "labelWidth": "170"
//        },
//        {
//            "view": "combo", "name": "vendor", "label": "Vendor", "suggest": "scripts/load_vendor.php", "labelWidth": "170"
//        },
        {
            "view": "text", "name": "keterangan", "label": "Keterangan", "labelWidth": "170"
        }, {
            margin: 10,
            cols: [
                {},
                {id: "btn_save_shipment", view: "button", label: "Save", type: "form", align: "center", width: 120},
                {id: "btn_cancel_shipment", view: "button", label: "Cancel", align: "center", width: 120}
            ]
        }
    ]
};
var form_pendaftaran = {
    id: "form_pendaftaran",
    view: "form",
    "elements": [
        {
            view: "segmented", name: "jenis_pendaftaran", label: "Jenis Pendaftaran", value: "baru", options: [{id: "baru", value: "Baru"}, {id: "perpanjangan", value: "Perpanjangan"},{id: "mengulang", value: "Mengulang"}], labelWidth: 170
        },
        {
            view: "text", name: "nama", label: "Nama", labelWidth: 170
        },
        {
            view: "text", name: "alamat", label: "Alamat", labelWidth: 170
        },
        {
            view: "segmented", name: "kelamin", label: "Jenis Kelamin", options: [{id: "LK", value: "Laki-Laki"}, {id: "PR", value: "Perempuan"}], labelWidth: 170
        },
        {
            view: "text", name: "tmp_lahir", label: "Tempat Lahir", labelWidth: 170
        },
        {
            view: "text", name: "tgl_lahir", label: "Tanggal Lahir", placeholder: '0000-00-00',value: '1980-01-01', labelWidth: 170,pattern:{ mask:"####-##-##", allow:/[0-9]/g}
        },

//        {
//            view: "segmeted", name: "pengulangan", label: "Pengulangan", value: 0,options:[{id:1,value:"Ya"},{id:0,value:"Tidak"}], labelWidth: 170
//        },
        {
            margin: 10,
            cols: [
                {view: "button", label: "Clear", type: "danger", align: "center", width: 120, click: function () {
                        app.pendaftaran.form.clear();
                    }
                },
                {},
                {id: "btn_save_pendaftaran", view: "button", label: "Save", type: "form", align: "center", width: 120},
                {id: "btn_cancel_pendaftaran", view: "button", label: "Close", align: "center", width: 120}
            ]
        }
    ]
};
var form_mengulang = {
    id: "form_mengulang",
    view: "form",
    "elements": [
        {
            view: "segmented", name: "jenis_pendaftaran", label: "Jenis Pendaftaran", value: "baru", options: [{id: "baru", value: "Baru"}, {id: "perpanjangan", value: "Perpanjangan"},{id: "mengulang", value: "Mengulang"}], labelWidth: 170
        },
        {
            view: "text", name: "nama", label: "Nama", labelWidth: 170
        },
        {
            view: "text", name: "alamat", label: "Alamat", labelWidth: 170
        },
        {
            view: "segmented", name: "kelamin", label: "Jenis Kelamin", options: [{id: "LK", value: "Laki-Laki"}, {id: "PR", value: "Perempuan"}], labelWidth: 170
        },
        {
            view: "text", name: "tmp_lahir", label: "Tempat Lahir", labelWidth: 170
        },
        {
            view: "text", name: "tgl_lahir", label: "Tanggal Lahir", placeholder: '0000-00-00',value: '1980-01-01', labelWidth: 170
        },

//        {
//            view: "segmeted", name: "pengulangan", label: "Pengulangan", value: 0,options:[{id:1,value:"Ya"},{id:0,value:"Tidak"}], labelWidth: 170
//        },
        {
            margin: 10,
            cols: [
                {view: "button", label: "Clear", type: "danger", align: "center", width: 120, click: function () {
                        app.pendaftaran.form.clear();
                    }
                },
                {},
                {id: "btn_save_pendaftaran", view: "button", label: "Save", type: "form", align: "center", width: 120},
                {id: "btn_cancel_pendaftaran", view: "button", label: "Close", align: "center", width: 120}
            ]
        }
    ]
};
var form_video = {
    id: "form_video",
    view: "form",
    "elements": [
        {
            view: "text", name: "id", label: "Nama", labelWidth: 170, hidden: true
        },
        {
            view: "text", name: "nomor", label: "Order", labelWidth: 170
        },
        {
            view: "text", name: "keterangan", label: "Keterangan Video", labelWidth: 170
        },
        {
            view: "text", name: "file", label: "Nama FIle", labelWidth: 170
        },
        {
            margin: 10,
            cols: [
                {view: "button", label: "Clear", type: "danger", align: "center", width: 120, click: function () {
                        app.video.form.clear();
                    }
                },
                {},
                {view: "button", label: "Save", type: "form", align: "center", width: 120, click: function () {
                        app.video.save();
                    }
                },
                {view: "button", label: "Close", align: "center", width: 120, click: function () {
                        app.video.close();
                    }
                }
            ]
        }
    ]
};

var form_runningtext = {
    id: "form_runningtext",
    view: "form",
    "elements": [
        {
            view: "text", name: "id", label: "id", labelWidth: 170, hidden: true
        },
        {
            view: "text", name: "runningtext", label: "Text", labelWidth: 170
        },
        {
            margin: 10,
            cols: [
                {view: "button", label: "Clear", type: "danger", align: "center", width: 120, click: function () {
                        app.runningtext.form.clear();
                    }
                },
                {},
                {view: "button", label: "Save", type: "form", align: "center", width: 120, click: function () {
                        app.runningtext.save();
                    }
                },
                {view: "button", label: "Close", align: "center", width: 120, click: function () {
                        app.runningtext.close();
                    }
                }
            ]
        }
    ]
};

var form_cari_pendaftaran = {
    id: "form_pengulangan",
    view: "form",
    "elements": [
        {
            view: "text", name: "nama", label: "Nama", labelWidth: 170
        },
        {
            view: "text", name: "alamat", label: "Alamat", labelWidth: 170
        },
        {
            view: "radio", name: "kelamin", label: "Jenis Kelamin", options: [{id: "LK", value: "Laki-Laki"}, {id: "PR", value: "Perempuan"}], labelWidth: 170
        },
        {
            view: "text", name: "tmp_lahir", label: "Tempat Lahir", labelWidth: 170
        },
        {
            view: "datepicker", name: "tgl_lahir", stringResult: true, format: "%Y-%m-%d %H:%i:%s", label: "Tanggal Lahir", value: '0000-00-00 00:00:00', labelWidth: 170
        },
        {
            margin: 10,
            cols: [
                {view: "button", label: "Clear", type: "danger", align: "center", width: 120, click: function () {
                        app.pendaftaran.form.clear();
                    }
                },
                {},
                {id: "btn_save_pendaftaran", view: "button", label: "Save", type: "form", align: "center", width: 120},
                {id: "btn_cancel_pendaftaran", view: "button", label: "Close", align: "center", width: 120}
            ]
        }
    ]
};
var form_antrian = {
    id: "form_antrian",
    view: "form",
    "elements": [
        {
            view: "text", name: "id", label: "ID", hidden: true, labelWidth: 120
        },
        {
            view: "combo", name: "tujuan", label: "Tujuan", options: [{id: "teori", value: "Teori"}, {id: "foto", value: "Foto"}, {id: "pengambilan", value: "Pengambilan Hasil"}], labelWidth: 120,
            on: {onChange: function (newv, oldv) {
                    app.antrian.tujuan = newv;
                    app.antrian.load(newv);
                }
            }
        },
        {
            view: "text", name: "nomor", label: "Nomor Antrian", readonly: true, labelWidth: 120
        },
        {
            view: "text", name: "nama", label: "Nama", readonly: true, labelWidth: 120
        },
        {
            view: "text", name: "alamat", label: "Alamat", readonly: true, labelWidth: 120
        },
        {
            margin: 10,
            cols: [
                {view: "button", label: "Berikutnya", type: "form", align: "center", height: 40, click: function () {
                        app.antrian.load_next();
                    }
                },
                {view: "button", label: "Panggil", align: "center", height: 40, click: function () {
                        app.antrian.call();
                    }
                },
                {view: "button", label: "Finish", align: "center", height: 40, click: function () {
                        app.antrian.finish();
                    }
                },
                {view: "button", label: "Hold", type: "danger", align: "center", height: 40, click: function () {
                        app.antrian.hold();
                    }
                }
            ]
        }
    ]
};
var form_update_hasil_teori = {
    id: "form_update_hasil_teori",
    view: "form",
    "elements": [
        {
            view: "text", name: "id", label: "ID", hidden: true, labelWidth: 170
        },
        {
            view: "text", name: "jenis_pendaftaran", label: "Jenis Pendaftaran", readonly: true, labelWidth: 170
        },
        {
            view: "text", name: "nama", label: "Nama", readonly: true, labelWidth: 170
        },
        {
            view: "text", name: "alamat", label: "Alamat", readonly: true, labelWidth: 170
        },
        {
            view: "segmented", name: "lulus_teori", label: "Hasil Teori", value: 0, options: [{id: 1, value: "Lulus"}, {id: 2, value: "Tidak Lulus"}], readonly: true, labelWidth: 170
        },
        {
            view: "segmented", name: "lulus_praktek", label: "Hasil Praktek", value: 0, options: [{id: 1, value: "Lulus"}, {id: 2, value: "Tidak Lulus"}], readonly: true, labelWidth: 170
        },
        {
            margin: 10,
            cols: [
                {},
                {view: "button", label: "Save", type: "form", align: "center", width: 120, click: function () {
                        app.pendaftaran.save_update_teori();
                    }
                },
                {view: "button", label: "Close", align: "center", width: 120, click: function () {
                        app.pendaftaran.window_update_teori.close();
                    }
                }
            ]
        }
    ]
};
var form_shipment_dest = {
    id: "form_shipment_dest",
    view: "form",
    "elements": [
        {view: "text", name: "id", hidden: true},
        {view: "text", name: "mode", hidden: true},
        {view: "text", name: "id_shipment", hidden: true},
        {"view": "combo", "name": "id_poi", "label": "Tujuan", "labelWidth": "170", options: "scripts/combo_poi.php"},
        {"view": "datepicker", "name": "arrive_est", "label": "Estimasi Tiba", format: "%Y-%m-%d", stringResult: true, "labelWidth": "170"},
        {"view": "text", "name": "keterangan", "label": "Keterangan", "labelWidth": "170"},
        {view: "segmented", name: "remainder", options: [
                {id: 1, value: "Alarm Jika Terlambat"},
                {id: 0, value: "Tanpa Alarm"}
            ]
        },
        {
            margin: 10,
            cols: [
                {},
                {id: "btn_save_shipment_dest", view: "button", label: "Save", type: "form", align: "center", width: 120},
                {id: "btn_cancel_shipment_dest", view: "button", type: "danger", label: "Cancel", align: "center", width: 120}
            ]
        }
    ]
};
var form_user = {
    id: "form_user",
    "view": "form",
    "elements": [
        {"view": "text", "name": "id", "labelWidth": "100", hidden: true},
        {"view": "text", "name": "mode", "labelWidth": "100", hidden: true},
        {"view": "text", "name": "real_name", label: "Nama Lengkap", "labelWidth": "100"},
        {"view": "text", "name": "login", label: "Login", "labelWidth": "100"},
        {"view": "text", "name": "password", label: "Password", "labelWidth": "100"},
        {"view": "combo", "name": "level_id", label: "User Level", "labelWidth": "100", suggest: "scripts/combo_user_level.php",
            on: {
                onChange: function (newVal, oldVal) {
                    if (newVal == "1" || newVal == "4") {
                        $$("user_access").show();
                    } else {
                        $$("user_access").hide();
                    }
                }
            }},
        {"view": "multiselect", id: "user_access", "name": "user_access", label: "Hak Akses", "labelWidth": "100", suggest: "scripts/combo_user_access.php", hidden: true},
        {
            cols: [
                {"view": "button", "value": "Save", click: function () {
                        var values = $$("form_user").getValues();
                        console.log(values);
                        webix.ajax().post("scripts/save_user.php", values,
                                function (text, xml, xhr) {
                                    webix.message(xml.json().code + "<br>" + xml.json().msg);
                                });
                    }
                },
                {"view": "button", type: "danger", "value": "Cancel", click: function () {
                        $$("window_user").hide();
                    }
                }
            ]
        }
    ]
};
var form_direction = {
    view: "form",
    elements: [
        {view: "fieldset", label: "Hitung Biaya BBM (Optional)", body: {
                rows: [
                    {"view": "text", validate: webix.rules.isNumber, "id": "speed_direction", value: "60", "label": "Kecepatan (Km/Jam)", "labelWidth": "130"},
                    {"view": "text", validate: webix.rules.isNumber, "id": "price_per_liter", value: "6500", "label": "Harga BBM/Liter (Rp)", "labelWidth": "130"},
                    {"view": "text", validate: webix.rules.isNumber, "id": "dist_per_liter", value: "20", "label": "Jarak(Km) /Liter", "labelWidth": "130"}
                ]
            }},
        {view: "fieldset", label: "Lokasi Yang Dilewati", body: {
                rows: [{id: "list_direction",
                        view: "list", select: true,
                        template: "#id#. #poi#"}
                ]
            }},
        {view: "fieldset", label: "Tambah Lokasi", body: {
                cols: [
                    {"view": "combo", "id": "poi_direction", "label": "Location", "labelWidth": "100", suggest: "scripts/combo_poi.php"},
                    {"view": "button", type: "form", value: "Add", width: 80, click: function () {
                            var id = $$("poi_direction").getValue();
                            var poi = app.pois[id];
                            console.log(poi);
                            if (poi == null)
                                return;
                            dir.pois.push(poi);

                            var table = $$("list_direction");
                            table.clearAll();
                            table.parse(dir.pois);
                        }
                    },
                    {"view": "button", value: "Direction", width: 80, click: function () {
                            dir.get_direction();
                        }
                    }, {"view": "button", type: "danger", width: 80, value: "Clear", click: function () {
                            $$("list_direction").clearAll();
                            dir.pois = [];
                            dir.pois.length = 0;

                            dir.clear_direction();
                            $$("list_result_direction").clearAll();
                        }
                    }
                ]
            }
        },
        {view: "fieldset", label: "Hasil Pencarian Rute", body: {
                id: "list_result_direction",
                view: "list", select: true,
                template: "#id#. #descr#"
            }}

    ]
};
var form_command = {
    width: 400,
    view: "form",
    borderless: true,
    elements: [
        {view: "combo", label: "Nopol", id: "cbo_vehicle", options: "scripts/combo_vehicle.php", labelWidth: 120},
        {view: "button", label: "Cut Engine", id: "nopol", labelWidth: 120},
        {view: "button", label: "Resume Engine", id: "imei", labelWidth: 120}
    ],
    rules: {
        "email": webix.rules.isEmail,
        "login": webix.rules.isNotEmpty
    }
};

var form_route = {
    id: "form_route",
    "view": "form",
    "elements": [
        {
            "view": "text",
            "name": "route",
            "label": "Nama Rute",
            "labelWidth": "100"
        },
        {
            cols: [{
                    "view": "combo",
                    "name": "id_asal",
                    "label": "Lokasi Asal",
                    "labelWidth": "100",
                    readonly: false,
                    options: "scripts/combo_poi.php"},
                {view: "button", value: "+", width: 40, click: function () {
                        $$("window_poi").show();
                    }}
            ]
        },
        {
            cols: [{
                    "view": "combo",
                    "name": "id_tujuan",
                    "label": "Lokasi Tujuan",
                    "labelWidth": "100",
                    readonly: false,
                    options: "scripts/combo_poi.php"},
                {view: "button", value: "+", width: 40, click: function () {
                        $$("window_poi").show();
                    }}
            ]
        },
        {
            "view": "richselect",
            "name": "durasi",
            "label": "Durasi",
            "labelWidth": "100",
            options: [{id: 1, value: "1 Hari"}, {id: 2, value: "2 Hari"}, {id: 3, value: "3 Hari"}, {id: 4, value: "4 Hari"}]
        }, {
            cols: [
                {"view": "button",
                    "value": "Save",
                    click: function () {
                        webix.ajax().post("scripts/save_route.php", $$("form_route").getValues(),
                                function (text, xml, xhr) {
                                    console.log(text);
                                    console.log(xml.json());
                                    //console.log(JSON.stringify(text));
                                });
                    }}, {"view": "button",
                    type: "danger",
                    "value": "Cancel",
                    click: function () {
                        $$("window_route").hide();
                    }}
            ]

        }
    ]
};
var form_poi = {
    id: "form_poi",
    "view": "form",
    "elements": [
        {
            "view": "text", "name": "poi", "label": "Nama POI", "labelWidth": "100"
        },
        {
            "view": "text", "name": "lat", "label": "Latitude", "labelWidth": "100"
        },
        {
            "view": "text", "name": "lng", "label": "Longitude", "labelWidth": "100"
        },
        {
            "view": "text", "name": "ket", "label": "Keterangan", "labelWidth": "100"
        }, {height: 10},
        {
            cols: [
                {"view": "button",
                    "value": "Save",
                    click: function () {
                        webix.ajax().post("scripts/save_poi.php", $$("form_poi").getValues(),
                                function (text, xml, xhr) {
                                    webix.message(xml.json().code + "<br>" + xml.json().msg);
                                });
                    }}, {"view": "button",
                    type: "danger",
                    "value": "Cancel",
                    click: function () {
                        $$("window_poi").hide();
                    }}
            ]

        }
    ]
};

var form_vehicle = {
    id: "form_vehicle",
    "view": "form",
    "elements": [
        {"view": "text", "name": "id", "labelWidth": "100", hidden: true},
        {"view": "text", "name": "mode", "labelWidth": "100", hidden: true},
        {
            cols: [
                {view: "combo", label: "Pemilik", id: "user_id", suggest: "scripts/combo_user.php", labelWidth: 100},
                {view: "button", type: "icon", icon: "plus", width: 40, click: function () {
                        $$("window_user").show();
                    }}
            ]
        },
        {"view": "text", "name": "nopol", "label": "Nopol", "labelWidth": "100"},
        {"view": "text", "name": "imei", "label": "Imei", "labelWidth": "100"},
        {"view": "text", "name": "phone", "label": "Phone", "labelWidth": "100"},
        {
            cols: [
                {view: "combo", label: "Driver", id: "drv_name", suggest: "scripts/combo_driver.php", labelWidth: 100},
                {view: "button", type: "icon", icon: "plus", width: 40, click: function () {
                        $$("window_driver").show();
                    }}
            ]
        },
        {"view": "combo", "name": "gps_brand", "label": "GPS Model", "labelWidth": "100", suggest: "scripts/combo_gps_brand.php"},
        {"view": "text", "name": "ket", "label": "Keterangan", "labelWidth": "100"}, {height: 10},
        {
            cols: [
                {id: "btn_save_vehicle", view: "button", "value": "Save", click: function () {
                        webix.ajax().post("scripts/save_vehicle.php", $$("form_vehicle").getValues(),
                                function (text, xml, xhr) {
                                    webix.message(xml.json().code + "<br>" + xml.json().msg);
                                });
                    }
                },
                {id: "btn_close_vehicle", "view": "button", type: "danger", "value": "Cancel", click: function () {
                        $$("window_vehicle").hide();
                    }
                }
            ]
        }
    ]
};

var form_driver = {
    id: "form_driver",
    "view": "form",
    "elements": [
        {"view": "text", "name": "id", "labelWidth": "100", hidden: true},
        {"view": "text", "name": "mode", "labelWidth": "100", hidden: true},
        {"view": "text", "name": "driver", label: "Nama", "labelWidth": "100"},
        {"view": "text", "name": "alamat", label: "Alamat", "labelWidth": "100"},
        {"view": "text", "name": "hp", label: "Phone 1", "labelWidth": "100"},
        {"view": "text", "name": "hp2", label: "Phone 2", "labelWidth": "100"},
        {
            cols: [
                {"view": "button", "value": "Save", click: function () {
                        var values = $$("form_driver").getValues();
                        console.log(values);
                        webix.ajax().post("scripts/save_driver.php", values,
                                function (text, xml, xhr) {
                                    webix.message(xml.json().code + "<br>" + xml.json().msg);
                                });
                    }
                },
                {"view": "button", type: "danger", "value": "Cancel", click: function () {
                        $$("window_driver").hide();
                    }
                }
            ]
        }
    ]
};


