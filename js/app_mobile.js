var pendaftaran = {
    tree: null,
    list: null,
    total: 0,
    data: [],
    table: null,
    rows: [],
    form: null,
    window: null,
    window_update_teori: null,
    form_update_teori: null,
    views: null,
    view_lbl_total: null,
    url_load: 'scripts/load_pendaftaran.php',
    url_save: 'scripts/save_pendaftaran.php',
    url_get_antrian: 'scripts/get_last_antrian.php',
    url_update_hold: 'scripts/update_hold.php',
    url_update_antrian: 'scripts/update_antrian.php',
    url_update_teori: 'scripts/update_hasil_teori.php',
    url_update_praktek: 'scripts/update_hasil_praktek.php',
    url_update_tujuan: 'scripts/update_tujuan.php',
};
var antrian = {
    tujuan: 'teori',
    tree: null,
    list: null,
    total: 0,
    data: [],
    table: null,
    rows: [],
    form: null,
    window: null,
    views: null,
    view_lbl_total: null,
    url_load: 'scripts/load_antrian.php',
    url_save: 'scripts/save_antrian.php',
    url_load_next: 'scripts/load_antrian_next.php',
    url_load_hold: 'scripts/load_hold.php'
};
var user = {
    data: [],
    table: null,
    form: null,
    window: null,
    views: null,
    combo: null,
    tree: null,
    lbl_total: null,
    load_url: 'scripts/load_user.php',
    save_url: 'scripts/save_user.php'
};

var columns_pendaftaran = [
    {id: "id", header: "ID", width: 50, hidden: true},
    {id: "tujuan", header: ["TUJUAN", {content: "selectFilter"}], width: 120},
    {id: "nomor", header: ["NOMOR", {content: "textFilter"}], width: 120},
    {id: "nama", header: ["NAMA", {content: "textFilter"}], width: 120},
    {id: "alamat", header: ["ALAMAT", {content: "textFilter"}], width: 120},
    {id: "lulus_teori", header: {text: "TEORI"}, width: 120, template: function (obj) {
            if (obj.lulus_teori == 1) {
                return "<div style='color:blue;font-weight:bold;'>Lulus</div>";
            } else if (obj.lulus_teori == 2) {
                return "<div style='color:red;font-weight:bold;'>Tidak Lulus</div>";
            } else {
                return "N/A";
            }
        }
    },
    {id: "lulus_praktek", header: {text: "PRAKTIK"}, width: 120, template: function (obj) {
            if (obj.lulus_praktek == 1) {
                return "<div style='color:blue;font-weight:bold;'>Lulus</div>";
            } else if (obj.lulus_teori == 2) {
                return "<div style='color:red;font-weight:bold;'>Tidak Lulus</div>";
            } else {
                return "N/A";
            }
        }
    }
];
var columns_pendaftaran2 = [
    {id: "id", header: "ID", width: 50, hidden: true},
    {id: "tujuan", header: ["TUJUAN"], width: 120},
    {id: "nomor", header: ["NOMOR"], width: 120},
    {id: "nama", header: ["NAMA"], width: 120},
    {id: "alamat", header: ["ALAMAT"], width: 120},
    {id: "lulus_teori", header: "TEORI", width: 120, template: function (obj) {
            if (obj.lulus_teori == 1) {
                return "<div style='color:blue;font-weight:bold;'>Lulus</div>";
            } else if (obj.lulus_teori == 2) {
                return "<div style='color:red;font-weight:bold;'>Tidak Lulus</div>";
            } else {
                return "N/A";
            }
        }
    },
    {id: "lulus_praktek", header: {text: "PRAKTIK"}, width: 120, template: function (obj) {
            if (obj.lulus_praktek == 1) {
                return "<div style='color:blue;font-weight:bold;'>Lulus</div>";
            } else if (obj.lulus_teori == 2) {
                return "<div style='color:red;font-weight:bold;'>Tidak Lulus</div>";
            } else {
                return "N/A";
            }
        }
    }
];
var views_pendaftaran = {
    id: "views_pendaftaran",
    rows: [
        {view: "toolbar", elements: [
                {id: "btn_add_pendaftaran", view: "button", value: "Add", width: 60},
                {id: "btn_edit_pendaftaran", view: "button", value: "Edit", width: 60},
                {id: "btn_delete_pendaftaran", view: "button", value: "Delete", width: 60},
                {id: "btn_refresh_pendaftaran", view: "button", value: "Refresh", width: 60},
                {width: 3},
                {id: "btn_antri_pengambilan", view: "button", value: "Pengambilan SIM", width: 150, click: function () {
                        app.pendaftaran.update_tujuan('ambil');
                    }
                },
                {id: "btn_print_pendaftaran", view: "button", value: "Cetak Nomor Antrian", width: 150}

            ]
        },
        {
            id: "tbl_pendaftaran",
            view: "datatable",
            select: true, multiselect: true, rowHeight: 40,
            columns: columns_pendaftaran
        }
    ]
};
var views_antrian = {
    id: "views_antrian",
    rows: [
        form_antrian,
        {
            view: "tabview",
            cells: [{
                    header: "Data Antrian",
                    rows: [
                        {id: "tbl_antrian",
                            view: "datatable",
                            select: true, multiselect: true, rowHeight: 40,
                            columns: columns_pendaftaran2
                        },
                        {view: "toolbar", elements: [
                                {id: "btn_refresh_antrian", view: "button", value: "Refresh", width: 60},
                                {width: 3},
                                {id: "btn_print_antrian", view: "button", value: "Centak Nomor", width: 100},
                                {view: "button", value: "Selesai Foto", width: 100}
                            ]
                        },
                        {gravity: 0.00001}
                    ]

                }, {
                    header: "Data Panggil",
                    id: "views_call",
                    rows: [
                        {view: "toolbar", elements: [
                                {id: "btn_refresh_hold", view: "button", value: "Refresh", width: 60, click: function () {
                                        app.antrian.load_hold();
                                    }},
                                {width: 3},
                                {id: "btn_unhold_antrian", view: "button", type: "danger", value: "Unhold", width: 100, click: function () {
                                        app.antrian.unhold();
                                    }
                                }
                            ]
                        },
                        {
                            id: "tbl_call",
                            view: "datatable",
                            select: true, multiselect: true, rowHeight: 40,
                            columns: columns_pendaftaran2
                        }
                    ]
                }, {
                    header: "Data Hold",
                    id: "views_hold",
                    rows: [
                        {view: "toolbar", elements: [
                                {id: "btn_refresh_hold", view: "button", value: "Refresh", width: 60, click: function () {
                                        app.antrian.load_hold();
                                    }},
                                {width: 3},
                                {id: "btn_unhold_antrian", view: "button", type: "danger", value: "Unhold", width: 100, click: function () {
                                        app.antrian.unhold();
                                    }
                                }
                            ]
                        },
                        {
                            id: "tbl_hold",
                            view: "datatable",
                            select: true, multiselect: true, rowHeight: 40,
                            columns: columns_pendaftaran2
                        }
                    ]
                }]

        }
    ]
};
var views_hasil_test = {
    id: "views_hasil_test",
    rows: [
        {view: "toolbar",
            height: 40,
            elements: [
//                {id: "btn_add_hasil", view: "button", value: "Add", width: 60},
//                {id: "btn_edit_hasil", view: "button", value: "Edit", width: 60},
//                {id: "btn_delete_hasil", view: "button", value: "Delete", width: 60},
                {view: "button", value: "Refresh", width: 120, click: function () {
                        var table = $$("tbl_hasil_test");
                        table.clearAll();
                        table.load('scripts/load_hasil_test.php');
                    }
                },
                {width: 3},
                {id: "btn_update_hasil", view: "button", value: "Print", width: 150, click: function () {
                        webix.toExcel($$("tbl_hasil_test"));
                    }
                }
            ]
        },
        {
            id: "tbl_hasil_test",
            view: "datatable",
            select: true, multiselect: true, rowHeight: 40,
            columns: columns_pendaftaran,
            url: 'scripts/load_hasil_test.php'
        }, {
            view: "toolbar",
            height: 40,
            elements: [
                {view: "button", type: "form", value: "Lulus Teori", width: 120, click: function () {
                        app.pendaftaran.update_hasil('update_teori', 1);
                    }
                },
                {view: "button", type: "danger", value: "Tidak Lulus Teori", width: 120, click: function () {
                        app.pendaftaran.update_hasil('update_teori', 2);
                    }
                },
                {view: "button", type: "form", value: "Lulus Praktik", width: 120, click: function () {
                        app.pendaftaran.update_hasil('update_praktik', 1);
                    }
                },
                {view: "button", type: "danger", value: "Tidak Lulus Praktek", width: 120, click: function () {
                        app.pendaftaran.update_hasil('update_praktik', 2);
                    }
                }
            ]
        },
        {gravity: 0.00001}
    ]
};
var right_container = {
    rows: [
        {
            view: "tabbar", borderless: true, multiview: true, options: [
                {id: "views_pendaftaran", value: "Pendaftaran", width: 150},
                {id: "views_antrian", value: "Antrian", width: 150},
                {id: "views_hasil_test", value: "Hasil", width: 150}
            ]
        },
        {
            cells: [views_pendaftaran, views_antrian, views_hasil_test]
        }, {gravity: 0.000000000001}
    ]
};
formatStatus = function (val, row) {
    if (row.status === "stop") {
        return {"text-color": "#2B65EC", "color": "#2B65EC"};
    } else if (row.status === "on") {
        return {"text-color": "#3EA055", "color": "#3EA055"};
    }
    return {"text-color": "red", "color": "red"};
};
format_red = function (obj) {
    return {"color": "#FF0000"};
};
format_green = function (obj) {
    return {"color": "#00FF00"};
};
format_yellow = function (obj) {
    return {"color": "#FFFF00"};
};
var tabs_vehicle = {
    view: "scrollview",
    body: {
        rows: [
            {
                view: "toolbar", elements: [
                    {view: "button", type: "icon", icon: "user", label: "User", popup: 'popup_user', width: 65},
                    {view: "button", type: "icon", icon: "location-arrow", label: "Playback", width: 80},
                    {id: "lbl_gps_total", view: "label", label: "Total:0"}

                ]
            },
            {
                id: "tbl_vehicle",
                view: "datatable",
                subrow: "#details#",
                subRowHeight: "auto",
                autoheight: true,
                autowidth: true,
                select: true,
                onContext: {},
                columns: [
                    {id: "id", header: "#", width: 60, hidden: true},
                    {id: "nopol", header: [{content: "textFilter", placeholder: "Search Nopol"}],
                        css: 'tbl_info',
                        cssFormat: formatStatus, template: "{common.subrow()} #nopol#", width: 160},
                    {id: "tdate", header: "Date", format: "%Y-%m-%d %H:%i:%s", width: 170}
                ]}, {gravity: 0.000001}
        ]
    }
};
var left_container = {
    width: 320,
    view: "scrollview",
    multi: true,
    body: {
        rows: [
            {
                header: "Vehicle",
                body: tabs_vehicle
            },
            {
                //  minHeight: 200,
                header: "Playback", collapsed: true,
                body: {
                    id: "form_playback",
                    view: "form", elements: [
                        {view: "datepicker", stringResult: true, timepicker: true, format: "%Y-%m-%d %H:%i:%s", date: new Date(), name: "from_date", label: "From"},
                        {view: "datepicker", stringResult: true, timepicker: true, format: "%Y-%m-%d %H:%i:%s", date: new Date(), name: "to_date", label: "To"},
                        {
                            cols: [
                                {view: "button", type: "form", value: "Search", click: function () {
                                        app.download_report();
                                    }
                                },
                                {view: "button", type: "danger", value: "Excel", click: function () {
                                        app.download_report_excel();
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            {
                collapsed: true,
                minHeight: 300,
                header: "Point of Interest",
                body: {
                    rows: [
                        {view: "toolbar", elements: [
                                {id: "txt_search_poi", view: "text", value: "Search"},
                                {view: "button", type: "form", value: "Refresh", width: 60, click: function () {
                                        var table = $$("tbl_poi");
                                        table.clearAll();
                                        table.load(table.config.url);
                                    }},
                                {id: "btn_add_poi", view: "button", type: "form", value: "Add", width: 60, click: function () {
                                        $$("window_poi").show();
                                    }
                                }
                            ]
                        },
                        {
                            id: "tbl_poi", view: "datatable", select: true,
                            columns: [
                                {id: "id", header: "#", width: 30},
                                {id: "poi", header: "Nama POI"},
                                {id: "descr", header: "Keterangan"}
                            ],
                            url: 'scripts/load_poi.php'
                        }]
                }
            }, {gravity: 0.00009}
        ]
    }
};
var appui = {
    id: "main",
    type: "clean",
    rows: [
        {
            fillspace: true,
            view: "toolbar", elements: [
                {view: "label", label: "Sistem Antrian"},
                {view: "button", type: "danger", value: "Logout", click: function () {
                        webix.confirm("Logout?", function (result) {
                            if (result) {
                                window.location.href = 'scripts/do_logout.php';
                            }
                        });
                    }
                }
            ]
        }, {
            fillspace: true,
            rows: [{
                    cols: [{
                            view: "tabbar", borderless: true, multiview: true, options: [
                                {id: "views_pendaftaran", value: "Pendaftaran"},
                                {id: "views_antrian", value: "Antrian"},
                                {id: "views_hasil_test", value: "Hasil"}
                            ]
                        },
                        {
                            cells: [views_pendaftaran, views_antrian, views_hasil_test]
                        }
                    ]
                }
            ]
        }
        , {gravity: 0.000000000001}
    ]
};
var toolbar = {
    view: "toolbar", elements: [
        {view: "label", label: "Sistem Antrian"},
        {view: "button", type: "danger", value: "Logout", width: 80, click: function () {
                webix.confirm("Logout?", function (result) {
                    if (result) {
                        window.location.href = 'scripts/do_logout.php';
                    }
                });
            }
        }
    ]
};
var tabbar = {
    view: "tabbar", multiview: true, type: "bottom", options: [
        {value: 'Pendaftaran', id: 'tab_registration'},
        {value: 'Form', id: 'formView'},
        {value: 'About', id: 'aboutView'}
    ]
};
var views_registration = {
    view: "",
    body: {
        rows: [{view: "toolbar", elements: [
                    {view: "button", value: "Add", click: function () {
                            $$("tab_registration").showBatch("b2");
                        }
                    },
                    {id: "btn_edit_pendaftaran", view: "button", value: "Edit"},
                    {id: "btn_delete_pendaftaran", view: "button", value: "Delete"},
                    {id: "btn_refresh_pendaftaran", view: "button", value: "Refresh"}
                ]
            },
            {
                id: "tbl_pendaftaran",
                view: "datatable",
                select: true, multiselect: true, rowHeight: 40,
                columns: columns_pendaftaran
            }, {gravity: 0.00001}]
    },
    batch: "b1"
};
var views_form_registration = {
    rows: [
        {view: "toolbar", elements: [
                {view: "button", value: "<<Back", width: 80, click: function () {
                        $$("tab_registration").showBatch("b1");
                    }
                }, {},
                {view: "button", value: "Save", width: 80},
                {view: "button", value: "Clear", width: 80}
            ]
        },
        {
            id: "form_pendaftaran",
            view: "form",
            "elements": [
                {
                    view: "radio", name: "jenis_pendaftaran", label: "Jenis Pendaftaran", value: "baru", options: [{id: "baru", value: "Baru"}, {id: "perpanjangan", value: "Perpanjangan"}]
                },
                {
                    view: "text", name: "nama", label: "Nama"
                },
                {
                    view: "text", name: "alamat", label: "Alamat"
                },
                {
                    view: "radio", name: "kelamin", label: "Jenis Kelamin", options: [{id: "LK", value: "Laki-Laki"}, {id: "PR", value: "Perempuan"}]
                },
                {
                    view: "text", name: "tmp_lahir", label: "Tempat Lahir"
                },
                {
                    view: "datepicker", name: "tgl_lahir", stringResult: true, format: "%Y-%m-%d %H:%i:%s", label: "Tanggal Lahir", value: '0000-00-00 00:00:00'
                }
            ]
        },
        {gravity: 0.000001}
    ],
    batch: "b2"
};
var tab_registration = {
    id: 'tab_registration',
    view: "toolbar", visibleBatch: "b1",
    cols: [views_registration, views_form_registration]
};
var data = {
    cells: [
        tab_registration,
        {
            id: "formView",
            template: "Place for the form control"
        },
        {
            id: "aboutView",
            template: "About the app"
        }
    ]
};
var appui_test = {
    id: "main",
    type: "clean",
    rows: [
        toolbar,
        data,
        tabbar,
        {gravity: 0.000001}
    ]
};
var tabbar2 = {
    id: "main_tabbar",
    view: "tabbar", type: "bottom", multiview: true, options: [
        {value: "<span class='webix_icon fa-car'></span><span style='padding-left: 4px'>GPS</span>", id: 'views_vehicle'},
        {value: "<span class='webix_icon fa-map-marker'></span><span style='padding-left: 4px'>Map</span>", id: 'views_map'},
        {value: "<span class='webix_icon fa-user'></span><span style='padding-left: 1px'>User</span>", id: 'views_user'}
    ], height: 50
};
var views_registration2 = {
    id: "views_vehicle",
    view: "multiview",
    cells: [{
            id: "view_list_vehicle",
            rows: [
                {
                    view: "toolbar", elements: [
                        {id: "lbl_gps_all", view: "label", label: "Total 0"},
                        {id: "lbl_gps_on", view: "label", label: "On 0"},
                        {id: "lbl_gps_off", view: "label", label: "Off 0"},
                        {id: "btn_vehicle_control", view: "button", value: "Control", width: 70, popup: "popup_vehicle"}
                    ]
                }, {
                    view: "scrollview",
                    body: {
                        id: "tbl_vehicle",
                        view: "datatable",
                        subrow: "#details#",
                        subRowHeight: "auto",
                        autoheight: true,
                        autowidth: false,
                        select: true,
                        columns: [
                            {id: "id", header: "#", width: 60, hidden: true},
                            {id: "nopol", header: [{content: "textFilter", placeholder: "Search Nopol"}], cssFormat: formatStatus, template: "{common.subrow()} #nopol#", width: 160},
                            {id: "tdate", header: "Date", format: "%Y-%m-%d %H:%i:%s", fillspace: true}
                        ]
                    }
                }, {gravity: 0.00001}
            ]
        }, {
            id: "view_edit_vehicle",
            batch: "view_edit_vehicle",
            rows: [
                {view: "toolbar", elements: [
                        {id: "btn_vehicle_back", view: "button", value: "<< Back", align: 'left', width: 60},
                        {},
                        {id: "btn_vehicle_save", view: "button", type: "form", value: "Save", align: 'right', width: 60},
                        {id: "btn_vehicle_cancel", view: "button", type: "danger", value: "Cancel", align: 'right', width: 60}
                    ]
                }, {
                    id: "form_vehicle",
                    view: "form",
                    elements: [
                        {name: "nopol", view: "text", label: "Nopol", value: "", labelWidth: 100},
                        {name: "imei", view: "text", label: "Imei", value: "", labelWidth: 100},
                        {name: "phone", view: "text", label: "Phone", value: "", labelWidth: 100},
                        {name: "drv_name", view: "text", label: "Driver", labelWidth: 100},
                        {name: "drv_phone", view: "text", label: "Phone Driver", labelWidth: 100},
                        {name: "install_date", view: "datepicker", stringResult: true, format: "%Y-%m-%d", label: "Install Date", labelWidth: 100},
                        {name: "gps_brand", view: "combo", label: "Model", suggest: "scripts/combo_gps_brand.php", labelWidth: 100},
                        {name: "user_id", view: "combo", label: "User", suggest: "scripts/combo_user.php", labelWidth: 100},
                        {name: "timezone", view: "combo", label: "GMT", suggest: "scripts/combo_timezone.php", labelWidth: 100}

                    ]
                },
                {gravity: 0.0000001}
            ]
        }, {
            id: "view_control_vehicle",
            batch: "view_control_vehicle",
            rows: [{view: "toolbar", elements: [
                        {id: "btn_control_back", view: "button", value: "<< Back", align: 'left', width: 60, click: function () {
                                app.vehicle.views.setValue("view_list_vehicle");
                            }
                        },
                        {}

                    ]
                }, {
                    id: "form_control",
                    view: "form",
                    elements: [
                        {name: "nopol", view: "text", label: "Nopol", value: "", labelWidth: 100},
                        {name: "imei", view: "text", label: "Imei", value: "", labelWidth: 100},
                        {name: "phone", view: "text", label: "Phone", value: "", labelWidth: 100},
                        {cols: [
                                {view: "button", type: "danger", value: "Cut Engine", align: 'right'},
                                {view: "button", type: "form", value: "Resume Engin", align: 'right', click: function () {
                                        app.vehicle.views.setValue("view_list_vehicle");
                                    }
                                }
                            ]
                        },
                        {cols: [
                                {view: "button", type: "form", value: "Position", align: 'right'},
                                {view: "button", type: "danger", value: "Active Siren", align: 'right', click: function () {
                                        app.vehicle.views.setValue("view_list_vehicle");
                                    }
                                }
                            ]
                        },
                        {cols: [
                                {view: "button", type: "danger", value: "Lock Door", align: 'right'},
                                {view: "button", type: "form", value: "Open Door", align: 'right', click: function () {
                                        app.vehicle.views.setValue("view_list_vehicle");
                                    }
                                }
                            ]
                        }
                    ]
                },
                {gravity: 0.0000001}
            ]
        }
    ]
};
var uiapp2 = {
    id: "main",
    rows: [
        {
            view: "toolbar",
            elements: [
                {id: "combo_user", view: "combo", placeholder: "Select User", options: {}},
                {id: "btn_logout", view: "button", type: "danger", value: "Logout", width: 100, click: function () {
                        webix.confirm("Logout?", function (result) {
                            if (result) {
                                window.location.href = 'scripts/do_logout.php';
                            }
                        });
                    }
                }

            ]
        },
        {
            id: "views_main",
            cells: [
                views_regisration2
            ]
        },
        tabbar,
        {gravity: 0.000001}
    ]
};
var app = {
    hReconnect: null,
    user_id: 0,
    session: '',
    login: false,
    pendaftaran: pendaftaran,
    antrian: antrian,
    user: user
};
var myutil = {
    second: 1,
    minute: 60,
    hour: 1 * 60 * 60,
    day: 1 * 60 * 60 * 24,
    month: 1 * 60 * 60 * 24 * 30,
    year: 1 * 60 * 60 * 24 * 30 * 12
};
app.log = function (msg) {
    console.log(msg);
};
var context;
var bufferLoader;
app.sound = function () {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    bufferLoader = new BufferLoader(context,
            [
                'sounds/2.mp3',
                'sounds/2.mp3',
                'sounds/7.mp3',
                'sounds/7.mp3'
            ],
            app.finishedLoading
            );
    bufferLoader.load();
};
var digits = [];
var sources = [];
app.finishedLoading = function (bufferList) {
    // Create two sources and play them both together.
    var source1 = context.createBufferSource();
    var source2 = context.createBufferSource();
    var source3 = context.createBufferSource();
    source1.buffer = bufferList[0];
    source2.buffer = bufferList[1];
    source3.buffer = bufferList[2];
    source1.connect(context.destination);
    source2.connect(context.destination);
    source3.connect(context.destination);
    source1.start(0);
    source2.start(1);
    source3.start(2);
};
app.get_vehicles = function () {
    var temp = [];
    for (var i in app.vehicles) {
        temp.push(app.vehicles[i]);
    }
    return temp;
};
app.parse_vehicle = function (item) {
    try {
        var newv = {
            id: parseInt(item.id, 10),
            vh_id: parseInt(item.id, 10),
            user_id: parseInt(item.user_id, 10),
            nopol: item.nopol,
            tdate: item.tdate,
            sdate: item.sdate,
            speed: parseFloat(item.speed),
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lng),
            acc: item.acc,
            charge: item.charge,
            alarm: item.alarm,
            fcut: item.fcut,
            batt: item.bat,
            angle: item.angle,
            status: 'off',
            icon_map: item.icon_map,
            icon: item.icon,
            poi: item.poi,
            address: item.address
        };
        return newv;
    } catch (e) {
        return null;
    }
};
var websocket = {
    connected: false,
    socket: null,
    hReconnect: null,
    server: "ws://localhost:7070"
            // server: "ws://192.168.2.87:7070"
};
websocket.init = function () {
    websocket.socket = new WebSocket(websocket.server);
    websocket.socket.onopen = function (evt) {
        websocket.connected = true;
        app.log('onopen');
        //login,object_type,object_name,
        //login,controller,PC 1
        //login,display,Display 1
        //login,display,Display 2

        if (websocket.hReconnect) {
            clearTimeout(websocket.hReconnect);
        }
    };
    websocket.socket.onmessage = function (evt) {
        var data = JSON.parse(evt.data);
        console.log(data);
    };
    websocket.socket.onclose = function (evt) {
        websocket.connected = false;
        app.log('onclose');
        if (websocket.hReconnect) {
            clearTimeout(websocket.hReconnect);
        }
        websocket.hReconnect = setTimeout(function () {
            if (websocket.connected == false) {
                websocket.init();
            }
        }, 5000);
    };
    websocket.socket.onerror = function (evt) {
        app.log('onerror');
        websocket.connected = false;
        if (websocket.hReconnect) {
            clearTimeout(websocket.hReconnect);
        }
        websocket.hReconnect = setTimeout(function () {
            if (websocket.connected == false) {
                websocket.init();
            }
        }, 5000);
    };
};
app.createSession = function () {
    var d = new Date().getTime();
    app.session = 'xxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
};
app.user.load = function () {
    app.user.clear();
    app.progress.showProgress({delay: 60000, hide: true});
    //app.user.progressbar.showProgress({delay: 60000, hide: true});
    webix.ajax().post(app.user.load_url, {}, function (text, xml, xhr) {
        try {
            var result = xml.json();
            // console.log(result.data);
            var options = [];
            for (var i in result) {
                var u = result[i];
                u.password = '';
                app.user.data.push(u);
                options.push({id: parseInt(u.id, 10), value: u.real_name});
            }
            setTimeout(function () {
                //app.user.lbl_total.setValue("User:" + app.user.data.length);
                var listUser = app.user.combo.getPopup().getList();
                listUser.clearAll();
                listUser.parse(options);
                app.user.tree.parse(app.user.get_tree_user(), "json");
                app.user.table.parse(app.user.data);
                app.progress.hideProgress();
                for (var i in options) {
                    app.user_id = options[i].id;
                    break;
                }
            }, 1000);
        } catch (e) {
            console.log(e);
            app.progress.hideProgress();
        }
    });
};
app.change_user = function (id) {
    app.map.clear();
    app.vehicle.clear();
    app.user_id = id;
    app.markerIsDraw = false;
    app.vehicle.load();
    app.poi.load();
    websocket.init();
};
/* App User */
app.user.clear = function () {
    if (app.user.table) {
        app.user.table.clearAll();
    }
    if (app.user.data) {
        app.user.data = [];
        app.user.data.length = 0;
    }
};
app.user.load = function () {
    app.user.clear();
    app.progress.showProgress({delay: 60000, hide: true});
    //app.user.progressbar.showProgress({delay: 60000, hide: true});
    webix.ajax().post(app.user.load_url, {}, function (text, xml, xhr) {
        try {
            var result = xml.json();
            // console.log(result.data);
            var options = [];
            for (var i in result) {
                var u = result[i];
                u.password = '';
                app.user.data.push(u);
                options.push({id: parseInt(u.id, 10), value: u.real_name});
            }
            setTimeout(function () {
                console.log();
                //app.user.tree.parse(app.user.get_tree_user());
                //app.user.table.parse(app.user.data);
                $$("tree_user").parse(app.user.get_tree_user());
                app.progress.hideProgress();
                for (var i in options) {
                    app.change_user(options[i].id);
                    break;
                }
            }, 1000);
        } catch (e) {
            console.log(e);
            app.progress.hideProgress();
        }
    });
};
app.user.get_tree_user = function () {
    //console.log(data);
    function getChildren(reseller_id, data) {
        var temp = [];
        for (var i in data) {
            if ((data[i].reseller_id == reseller_id) && (data[i].level_id != '1') && (data[i].level_id != '4')) {
                console.log(data[i].state);
                temp.push({
                    id: data[i].id,
                    icon: data[i].state == 1 ? 'user_ok' : 'user_disable',
                    value: data[i].real_name
                });
            }
        }
        return temp;
    }
    // console.log(app.users);
    //Get User Doesnot Have Parent
    var temp = [{
            id: "group_0",
            value: "Ungroup",
            data: getChildren(0, app.user.data)
        }];
    for (var i in app.user.data) {
        // console.log(data[i]);
        if (app.user.data[i].level_id == '1' || app.user.data[i].level_id == '4') {
            //console.log(data[i].level_id);
            temp.push({
                id: "group_" + app.user.data[i].id,
                icon: app.user.data[i].level_id == '4' ? 'user_reseller' : 'user_admin',
                value: app.user.data[i].real_name,
                data: getChildren(app.user.data[i].id, app.user.data)
            });
        }
    }
    //console.log(temp);
    return temp;
};
/* App Pendaftaran */
app.pendaftaran.add = function () {
    app.pendaftaran.form.setValues({mode: 'add'});
    app.pendaftaran.window.show();
};
app.pendaftaran.edit = function () {
    var row = app.pendaftaran.table.getSelectedItem();
    if (row == null) {
        webix.message({type: 'error', text: 'Pilih Data Shipment'});
        return;
    }
    row['mode'] = 'edit';
    app.pendaftaran.form.setValues(row);
    app.pendaftaran.window.show();
};
app.pendaftaran.delete = function () {
    var row = app.pendaftaran.table.getSelectedItem();
    if (row == null) {
        webix.message({type: 'error', text: 'Pilih Data Pendaftaran'});
        return;
    }
    webix.confirm('Hapus pendaftaran?', function (result) {
        if (result) {
            row['mode'] = 'delete';
            app.pendaftaran.form.setValues(row);
            app.pendaftaran.save();
        }
    });
};
app.pendaftaran.save = function () {
    var values = app.pendaftaran.form.getValues();
    console.log(values);
    webix.ajax().post(app.pendaftaran.url_save, values, function (text, xml, xhr) {
        console.log(xml.json());
        webix.message({type: 'error', text: xml.json().msg});
        app.pendaftaran.refresh();
    });
};
app.pendaftaran.refresh = function () {
    app.pendaftaran.table.clearAll();
    app.pendaftaran.table.load(app.pendaftaran.url_load);
};
app.pendaftaran.update_status = function (row, id_status) {
    console.log(row);
    //console.log('update status shipment, id:'+ row.id +',status:'+ id_status);
    var values = {id: row.id, mode: 'update_status', est_day: parseInt(row.est_day, 10), id_status: id_status};
    console.log(values);
    webix.ajax().post(app.pendaftaran.url_save, values, function (text, xml, xhr) {
        webix.message({type: 'error', text: xml.json().msg});
    });
};
app.pendaftaran.update_hasil = function (jenis, lulus) {
    var list = [];
    $$("tbl_hasil_test").eachRow(function (id) {
        var row = this.getItem(id);
        if ((jenis == 'update_teori') && (parseInt(row.lulus_teori, 10) === 0) && (row.ch1 != undefined)) {
            var item = {id: row.id, lulus: lulus};
            list.push(item);
            console.log(item);
        } else if ((jenis == 'update_praktik') && (parseInt(row.lulus_praktik, 10) === 0) && (row.ch1 != undefined)) {
            var item = {id: row.id, lulus: lulus};
            list.push(item);
            console.log(item);
        }
    });

    if (list.length > 0) {
        var values = {
            mode: jenis,
            total: list.length,
            data: JSON.stringify(list)
        };
        console.log(values);
        webix.ajax().post(app.pendaftaran.url_save, values, function (text, xml, xhr) {
            console.log(text);
            webix.message({type: 'error', text: xml.json().msg});
        });
    }
};
app.pendaftaran.update_praktik_multi = function () {
    var list = [];
    $$("tbl_hasil_test").eachRow(function (id) {
        var row = this.getItem(id);
        if (row.lulus_praktik == 0) {
            var item = {id: row.id, lulus_praktik: row.ch1};
            list.push(item);
        }
    });

    if (list.length > 0) {
        var data = {
            mode: 'update_praktik_multi',
            total: list.length,
            data: list
        };
        webix.ajax().post(app.pendaftaran.url_save, data, function (text, xml, xhr) {
            webix.message({type: 'error', text: xml.json().msg});
        });
    }
};
app.pendaftaran.getList = function () {
    var temp = [];
    for (var i in app.pendaftaran.data) {
        var v = app.pendaftaran.data[i];
        temp.push({id: v.id, value: v.nopol});
    }
    return temp;
};
app.pendaftaran.getData = function () {
    var temp = [];
    for (var i in app.pendaftaran.data) {
        var v = app.pendaftaran.data[i];
        temp.push(v);
    }
    app.pendaftaran.total = temp.length;
    return temp;
};
app.pendaftaran.clear = function () {
    app.pendaftaran.data = [];
    app.pendaftaran.data.length = 0;
    if (app.pendaftaran.table) {
        app.pendaftaran.table.clearAll();
    }
};
app.pendaftaran.update_tujuan = function (tujuan) {
    var row = $$("tbl_pendaftaran").getSelectedItem();
    if (row == null) {
        webix.message({type: 'error', text: "Pilih Data"});
        return;
    }
    if (row.lulus_teori == 0 || row.lulus_praktek == 0) {
        webix.message({type: 'error', text: "Maaf Peserta Tidak Lulus"});
        return;
    }
    row['tujuan'] = tujuan;
    console.log(row);
    webix.ajax().post(app.pendaftaran.url_update_tujuan, row, function (text, xml, xhr) {
        webix.message({type: 'error', text: xml.json().msg});
    });
};

app.pendaftaran.update_teori = function () {
    var row = app.pendaftaran.table.getSelectedItem();
    if (row == null) {
        webix.message({type: 'error', text: 'Pilih Data'});
        return;
    }
    if (row.tujuan == 'foto') {
        webix.message({type: 'error', text: 'Sudah Antri Di Foto'});
        return;
    }
    $$("window_update_hasil_teori").show();
    $$("form_update_hasil_teori").setValues(row);
};
app.pendaftaran.save_update_teori = function () {
    var values = app.pendaftaran.form_update_teori.getValues();
    //Sudah Antri di foto
    if (values.tujuan == 'foto') {
        webix.message({type: 'error', text: 'Sudah Antri Di Foto'});
        return;
    }
    if (values.lulus_teori == 0) {
        webix.message({type: 'error', text: 'Hasil Teori Belum Dipilih'});
        return;
    }
    if (values.lulus_praktek == 0) {
        webix.message({type: 'error', text: 'Hasil Praktek Belum Dipilih'});
        return;
    }
    app.progress.showProgress({delay: 60000, hide: true});
    webix.ajax().post(app.pendaftaran.url_update_teori, values, function (text, xml, xhr) {
        console.log(text);
        try {
            var result = xml.json();
            setTimeout(function () {
                app.progress.hideProgress();
                webix.message({type: 'error', text: result.msg});
            }, 1000);
        } catch (e) {
            console.log(e);
            app.progress.hideProgress();
        }
    });
};
app.pendaftaran.load = function () {
    console.log('app.pendaftaran.load');
    app.pendaftaran.clear();
    app.progress.showProgress({delay: 60000, hide: true});
    webix.ajax().post(app.pendaftaran.url_load, {user_id: app.user_id}, function (text, xml, xhr) {
        console.log(text);
        try {
            var result = xml.json();
            for (var i in result) {
                try {
                    var v = result[i];
                    app.pendaftaran.data[v.id] = v;
                } catch (e) {
                    console.log(e);
                }
            }
            setTimeout(function () {
                //app.vehicle.view_lbl_total.setValue("Objects :" + rows.length);
                // app.alarm.draw_markers();
                // $$("lbl_total_pendaftaran").setValue("Total Alarm:" + app.pendaftaran.data.length);
                app.pendaftaran.table.clearAll();
                app.pendaftaran.table.parse(app.pendaftaran.getData());
                app.pendaftaran.table.refresh();
                app.progress.hideProgress();
            }, 1000);
        } catch (e) {
            console.log(e);
            app.progress.hideProgress();
        }
    });
};
/* App Antrian */
app.antrian.clear = function () {
    app.antrian.data = [];
    app.antrian.data.length = 0;
    if (app.antrian.table) {
        app.antrian.table.clearAll();
    }
};
app.antrian.load = function (tujuan) {
    console.log('app.antrian.load:' + tujuan);
    app.antrian.clear();
    app.progress.showProgress({delay: 60000, hide: true});
    webix.ajax().post(app.antrian.url_load, {tujuan: tujuan}, function (text, xml, xhr) {
        console.log(text);
        try {
            var result = xml.json();
            for (var i in result) {
                try {
                    var v = result[i];
                    app.antrian.data.push(v);
                } catch (e) {
                    console.log(e);
                }
            }
            app.antrian.table.clearAll();
            app.antrian.table.parse(app.antrian.data);
            app.antrian.table.refresh();
            setTimeout(function () {
                app.progress.hideProgress();
            }, 1000);
        } catch (e) {
            console.log(e);
            app.progress.hideProgress();
        }
    });
};
app.antrian.load_hold = function () {
    var table = $$("tbl_hold");
    table.clearAll();
    table.load(app.antrian.url_load_hold);
};
app.antrian.load_next = function () {
    app.progress.showProgress({delay: 60000, hide: true});
    var data = {
        tag: 'reg_sim',
        sub_tag: 'next',
        tujuan: app.antrian.tujuan
    };
    webix.ajax().post(app.antrian.url_load_next, data, function (text, xml, xhr) {
        console.log(xml.json());
        try {
            var result = xml.json();
            setTimeout(function () {
                app.progress.hideProgress();
                if (result.exist === 1) {
                    result['data']['tujuan'] = app.antrian.tujuan;
                    app.antrian.form.setValues(result['data']);
                } else {
                    webix.message({type: 'error', text: 'Antrian ' + app.antrian.tujuan + 'Kosong'});
                }
            }, 100);
        } catch (e) {
            console.log(e);
            app.progress.hideProgress();
        }
    });
};
app.antrian.call = function () {
    var values = app.antrian.form.getValues();
    console.log(values);

    if (values.nomor == '') {
        webix.message({type: 'error', text: 'Form Tidak Boleh Kosong'});
        return;
    }

    try {
        console.log(websocket.socket.readyState);
        if (websocket.socket.readyState !== 1) {
            webix.message({type: 'error', text: 'Koneksi Keserver Error'});
            return;
        }
        data = JSON.stringify("antrian,change," + values.tujuan + "," + values.nomor);
        websocket.socket.send(data);
    } catch (e) {
        webix.message({type: 'error', text: e});
        return;
    }
    var data = {
        id: values.id,
        mode: 'update_called',
        tujuan: values.tujuan
    };
    //values['mode'] = 'update_called';
    app.progress.showProgress({delay: 60000, hide: true});
    webix.ajax().post(app.antrian.url_save, data, function (text, xml, xhr) {
        console.log(text);
        try {
            var result = xml.json();
            setTimeout(function () {
                app.progress.hideProgress();
                webix.message({type: 'error', text: result.msg});
                if (result.code == 'SUCCESS') {
                    app.antrian.load(values.tujuan);
                }
            }, 1000);
        } catch (e) {
            console.log(e);
            app.progress.hideProgress();
        }
    });
};
app.antrian.hold = function () {
    var row = app.antrian.form.getValues();
    if (row == null) {
        webix.message({type: 'error', text: "Form kosong... apa yang mau dihold???"});
        return;
    }
    app.antrian.update_hold(row.id, 1);
};
app.antrian.unhold = function () {
    var row = $$("tbl_hold").getSelectedItem();
    if (row == null) {
        webix.message({type: 'error', text: "Pilih Data"});
        return;
    }
    app.antrian.update_hold(row.id, 0);
};
app.antrian.update_hold = function (id, hold) {
    var data = {
        tag:'antrian',
        sub_tag: 'update_hold',
        hold: hold,
        id: id
    };
    app.progress.showProgress({delay: 60000, hide: true});
    webix.ajax().post(app.antrian.url_save, data, function (text, xml, xhr) {
        console.log(text);
        try {
            var result = xml.json();
            setTimeout(function () {
                //app.antrian.load();
                app.progress.hideProgress();
                webix.message({type: 'error', text: result.msg});
                if (result.code == 'SUCCESS') {
                    app.antrian.load(app.antrian.tujuan);
                }
            }, 100);
        } catch (e) {
            console.log(e);
            app.progress.hideProgress();
        }
    });
};
app.antrian.finish = function () {
    var row = app.antrian.form.getValues();
    if (row == null) {
        webix.message({type: 'error', text: "Form kosong... apa yang mau dihold???"});
        return;
    }
    var data = {
        tag: 'antrian',
        sub_tag: 'update_called',
        tujuan:row.tujuan,
        id: row.id
    };
    app.progress.showProgress({delay: 60000, hide: true});
    webix.ajax().post(app.antrian.url_save, data, function (text, xml, xhr) {
        console.log(text);
        try {
            var result = xml.json();

            setTimeout(function () {
                app.progress.hideProgress();
                webix.message({type: 'error', text: result.msg});
                if (result.code == 'SUCCESS') {
                    app.antrian.load(app.antrian.tujuan);
                }
            }, 100);
        } catch (e) {
            console.log(e);
            app.progress.hideProgress();
        }
    });
};
app.antrian.print = function (row) {
    if (row == undefined) {
        row = app.antrian.table.getSelectedItem();
    }
    if (row == null) {
        webix.message({type: 'error', text: 'Pilih Data'});
        return;
    }
    var nomor = '';
    var tujuan = '';
    //Jenis Pendaftaran
    if (row.jenis_pendaftaran == 'baru') {
        nomor = 'B-' + row.nomor;
    } else if (row.jenis_pendaftaran == 'perpanjangan') {
        nomor = 'P-' + row.nomor;
    }
    //Tujuan
    if (row.tujuan == 'teori') {
        tujuan = 'Ruang Teori';
    } else if (row.tujuan == 'foto') {
        tujuan = 'Ruang Foto';
    } else if (row.tujuan == 'hasil') {
        tujuan = 'Ambil SIM';
    }
    var w = window.open('', 'Print', 'width=300,height=200,menubar=no,toolbar=no');
    var html = '<html><body><table>';
    html += '<tr><td><center><div style="font-size:14px;font-weight:bold;">Nomor Antrian</div></center></td></tr>';
    html += '<tr><td><center><div style="font-size:24px;font-weight:bold;">' + nomor + '</div></center></td></tr>';
    html += '<tr><td><center><div style="font-size:14px;font-weight:bold;">' + tujuan + '</div></center></td></tr>';
    html += '</table></body></html>';
    w.document.write(html);
    w.print();
    w.close();
};
var loopHandler;
app.loop = function () {
    clearTimeout(loopHandler);
//    if (app.vehicle.tree != null) {
//        app.vehicle.tree.refresh();
//    }
//    //Get Alarm
//    try {
//        webix.ajax().post("scripts/load_alarm.php", {user_id: app.user_id}, function (text, xml, xhr) {
//            try {
//                var result = xml.json();
//                if (result.total > 0) {
//                }
//            } catch (e) {
//
//            }
//        });
//    } catch (e) {
//        console.log(e);
//    }
    loopHandler = setTimeout('app.loop()', 10000);
};
app.init_selector = function () {
    app.progress = $$("main");
    app.user.tree = $$("tree_user");
    app.pendaftaran.table = $$("tbl_pendaftaran");
    app.pendaftaran.form = $$("form_pendaftaran");
    app.pendaftaran.window = $$("window_pendaftaran");
    app.antrian.table = $$("tbl_antrian");
    app.antrian.form = $$("form_antrian");
    app.antrian.window = $$("window_antrian");
    app.pendaftaran.window_update_teori = $$("window_update_hasil_teori");
    app.pendaftaran.form_update_teori = $$("form_update_hasil_teori");
    webix.extend(app.progress, webix.ProgressBar);
};
app.init_events = function () {
//    app.pendaftaran.table.attachEvent("onItemClick", function (id) {
//    });
//    app.pendaftaran.table.attachEvent("onItemDblClick", function (id) {
//
//    });
//    $$("btn_add_pendaftaran").attachEvent("onItemClick", function (id) {
//        app.pendaftaran.add();
//    });
//    $$("btn_edit_pendaftaran").attachEvent("onItemClick", function (id) {
//        app.pendaftaran.edit();
//    });
//    $$("btn_delete_pendaftaran").attachEvent("onItemClick", function (id) {
//        app.pendaftaran.delete();
//    });
//    $$("btn_print_pendaftaran").attachEvent("onItemClick", function (id) {
//        app.pendaftaran.print_antrian(1)
//    });
//    $$("btn_refresh_pendaftaran").attachEvent("onItemClick", function (id) {
//        app.pendaftaran.refresh();
//    });
//    $$("btn_save_pendaftaran").attachEvent("onItemClick", function (id) {
//        app.pendaftaran.save();
//    });
//    $$("btn_cancel_pendaftaran").attachEvent("onItemClick", function (id) {
//        app.pendaftaran.cancel();
//    });
//    $$('menu_pendaftaran').attachTo(app.vehicle.table);
//    $$("menu_pendaftaran").attachEvent("onItemClick", function (id) {
//        var context = this.getContext();
//        var list = context.obj;
//        console.log(list.nopol);
//    });
};
app.init_windows = function () {
    webix.ui({
        id: "window_pendaftaran", view: "window", width: 500, height: 300, position: "center", move: true, resize: true,
        head: {
            view: "toolbar", margin: -4, cols: [
                {view: "label", label: "Form Pendaftaran"},
                {view: "icon", icon: "times-circle", align: "left",
                    click: "$$('window_pendaftaran').hide();"}
            ]
        }
        , body: {
            view: "scrollview",
            body: webix.copy(form_pendaftaran)
        }
    });
    webix.ui({
        id: "window_list_user", view: "window", width: 600, height: 400,
        position: "center", move: true, resize: true,
        head: {
            view: "toolbar", margin: -4, cols: [
                {view: "label", label: "Data User"},
                {view: "icon", icon: "times-circle", align: "left",
                    click: "$$('window_list_user').hide();"}

            ]
        },
        body: {
            rows: [{
                    view: "toolbar", margin: -4, cols: [
                        {view: "text", value: "Search", width: 250, on: {
                                onChange: function (newv, oldv) {
                                    $$("tbl_user").filter("#login", newv);
                                }
                            }},
                        {view: "button", value: "Refresh", width: 60, click: function () {
                                app.load_user();
                            }},
                        {view: "button", value: "Add", width: 60, click: function () {
                                $$("form_user").setValues({mode: "add"});
                                $$("window_user").show();
                            }},
                        {view: "button", value: "Edit", width: 60, click: function () {
                                var item = $$("tbl_user").getSelectedItem();
                                item["mode"] = "edit";
                                $$("form_user").setValues(item);
                                $$("window_user").show();
                            }},
                        {view: "button", type: "danger", value: "Delete", width: 60, click: function () {
                                var values = $$("form_user").getValues();
                                values["mode"] = "delete";
                                webix.confirm("Delete User:" + values.real_name, function (result) {
                                    if (result) {
                                        webix.ajax().post("scripts/save_user.php", values, {
                                            error: function (text, data, XmlHttpRequest) {
                                                webix.message(text);
                                            },
                                            success: function (text, data, XmlHttpRequest) {
                                                webix.message(data.json().msg);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    ]
                }, {
                    body: {
                        id: "tbl_user",
                        view: "datatable",
                        select: true,
                        columns: [
                            {id: "login", header: "Login"},
                            {id: "real_name", header: "Nama Lengkap"},
                            {id: "user_level", header: "Level"},
                            {id: "expired_date", header: "Expired Date"}
                        ]
                    }
                }
            ]
        }
    });
    webix.ui({
        id: "window_user", view: "window", width: 400, height: 330,
        position: "center", move: true, resize: true,
        head: {
            view: "toolbar", margin: -4, cols: [
                {view: "label", label: "Input User"},
                {view: "icon", icon: "times-circle", align: "left", click: "$$('window_user').hide();"}
            ]
        }, body: form_user
    });
    webix.ui({
        view: "popup",
        id: "my_menu",
        head: "Submenu",
        width: 200,
        body: {
            id: "list_menu",
            view: "list",
            data: [
                {id: "User", name: "1. User"},
                {id: "Vehicle", name: "2. Vehicle"},
                {id: "Report", name: "3. Orders"},
                {id: "Logout", name: "3. Logout"}
            ],
            datatype: "json",
            template: "#name#",
            autoheight: true,
            select: true,
            on: {
                onAfterSelect: function (id) {
                    switch (id) {
                        case "Logout":
                            webix.confirm("Logout", function (result) {
                                console.log(result);
                                if (result) {
                                    window.location.href = 'scripts/do_logout.php';
                                }
                            });
                            break;
                        case "User":
                            $$("window_list_user").show();
                            break;
                        case "Vehicle":
                            $$("window_list_vehicle").show();
                            break;
                        case "Report":
                            $$("window_report").show();
                            break;
                    }
//                    $$("my_menu").hide();
//                    $$("window_login").show();
                }
            }
        }
    });
    webix.ui({
        view: "popup",
        id: "popup_user",
        head: "Submenu",
        width: 300,
        height: 400,
        resize: true,
        body: {
            rows: [{
                    view: "toolbar", elements: [
                        {view: "label", label: ".:Daftar User:."},
                        {view: "icon", icon: "times-circle", align: "left",
                            click: "$$('popup_user').hide();"}
                    ]
                },
                {
                    id: "tree_user",
                    view: "tree", select: true,
                    on: {
                        onItemClick: function (node) {
                            console.log(node);
                            $$("popup_user").hide();
                            app.change_user(node);
                        }
                    }
                }, {
                    view: "toolbar", elements: [
                        {view: "text", on: {
                                onTimedKeyPress: function () {
                                    console.log(this.getValue());
                                    app.user.tree.filter("#value#", this.getValue());
                                }
                            }},
                        {view: "button", value: "Reset", width: 70, click: function () {
                                console.log(app.user.get_tree_user());
                                app.user.tree.parse(app.user.get_tree_user(), "json");
                            }}
                    ]
                }]
        }
    });
    webix.ui({
        view: "contextmenu",
        id: "menu_pendaftaran",
        data: [
            {id: 1, value: "Add"},
            "Edit",
            "Delete",
            {$template: "Separator"}
            ,
            "Info",
            "Playback"
        ]
    });
    webix.ui({
        id: "window_update_hasil_teori", view: "window", width: 500, height: 260, position: "center", move: true, resize: true,
        head: {
            view: "toolbar", margin: -4, cols: [
                {view: "label", label: "Update Hasil Teori"},
                {view: "icon", icon: "times-circle", align: "left",
                    click: "$$('window_update_hasil_teori').hide();"}
            ]
        }
        , body: {
            view: "scrollview",
            body: webix.copy(form_update_hasil_teori)
        }
    });
};
app.init = function () {
    app.createSession();
    webix.ui.fullScreen();
    webix.ui(appui_test);
    app.init_windows();
    app.init_selector();
    app.init_events();
    app.pendaftaran.load();
    app.antrian.load();
    app.loop();
    websocket.init();

};