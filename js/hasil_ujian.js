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
    url_load: 'scripts/load_hasil.php'
};
var views_hasil = {
    id: "views_hasil",
    rows: [
        {view: "toolbar",
            height: 100,
            elements: [
                //{view: "label", label: "HASIL UJIAN TEORI DAN PRAKTEK",css:{"font-size":"44px"}},
                {view: "label", template: "<div style='padding-top:30px;font-size:42px;font-weight:bold;'><center>HASIL UJIAN TEORI DAN PRAKTIK</center></div>"}

            ]
        },
        {
            id: "tbl_pendaftaran",
            view: "datatable",
            select: true, multiselect: true, rowHeight: 40, headerRowHeight: 50,
            css: 'my_style',
            columns: [
                {id: "id", header: "ID", width: 50},
                {id: "jenis_pendaftaran", header: "BARU/MENGULANG", width: 200, template: function (obj) {
                        if (obj.jenis_pendaftaran == 'baru') {
                            return "<div style='color:blue;font-weight:bold;'>Baru</div>";
                        }
                        return "<div style='color:orange;font-weight:bold;'>Mengulang</div>";
                    }
                },
                {id: "nomor", header: "NOMOR ANTRIAN", width: 150},
                {id: "nama", header: "NAMA", width: 250},
                {id: "alamat", header: "ALAMAT", width: 200, fillspace: true},
                {id: "lulus_teori", header: {text: "TEORI", css: {"background": "red", "color": "white"}}, width: 170, template: function (obj) {
                        if (obj.stage == 0 && obj.lulus_teori == 0) {
                            return "<div style='color:blue;font-weight:bold;'>Antrian</div>";
                        } else if (obj.stage = 1 && obj.lulus_teori == 0) {
                            return "<div style='color:orange;font-weight:bold;'>Proses</div>";
                        } else if (obj.stage == 1 && obj.lulus_teori == 2) {
                            return "<div style='color:red;font-weight:bold;'>Gagal</div>";
                        } else if (obj.stage == 1 && obj.lulus_teori == 1) {
                            return "<div style='color:green;font-weight:bold;'>Lulus</div>";
                        } else if (obj.lulus_teori == 2) {
                            return "<div style='color:red;font-weight:bold;'>Gagal</div>";
                        } else if (obj.lulus_teori == 1) {
                            return "<div style='color:green;font-weight:bold;'>Lulus</div>";
                        }
                    }
                },
                {id: "lulus_praktik", header: {text: "PRAKTIK", css: {"background": "green", "color": "white"}}, width: 170, template: function (obj) {
                        if (obj.lulus_teori == 1) {
                            if (obj.stage == 2 && obj.lulus_praktik == 0) {
                                return "<div style='color:blue;font-weight:bold;'>Antrian</div>";
                            } else if (obj.stage = 3 && obj.lulus_praktik == 0) {
                                return "<div style='color:orange;font-weight:bold;'>Proses</div>";
                            } else if (obj.stage = 3 && obj.lulus_praktik == 2) {
                                return "<div style='color:red;font-weight:bold;'>Gagal</div>";
                            } else if (obj.stage = 3 && obj.lulus_praktik == 1) {
                                return "<div style='color:green;font-weight:bold;'>Lulus</div>";
                            } else {
                                return "<div style='color:blue;font-weight:bold;'>-</div>";
                            }
                        }else{
                            return "<div style='color:blue;font-weight:bold;'>-</div>";
                        }
                    }
                },
            ]
        }
    ]
};
var views_antrian = {
    id: "views_antrian",
    rows: [
        {view: "toolbar", elements: [
                {id: "btn_refresh_antrian", view: "button", value: "Refresh", width: 60},
                {width: 3},
                {id: "btn_print_antrian", view: "button", value: "Centak Nomor", width: 100}
            ]
        },
        {
            id: "tbl_antrian",
            view: "datatable",
            select: true, multiselect: true, rowHeight: 40,
            columns: [
                {id: "id", header: "ID"},
                {id: "nomor", header: "Nomor"},
                {id: "tujuan", header: "Tujuan"},
                {id: "nama", header: "Nama", width: 120},
                {id: "alamat", header: "Alamat", width: 120},
                {id: "category", header: "Baru/Perpanjangan", width: 120}
            ]
        }
    ]
};
var views_hold = {
    id: "views_hold",
    rows: [
        {view: "toolbar", elements: [
                {id: "btn_refresh_hold", view: "button", value: "Refresh", width: 60},
                {width: 3},
                {id: "btn_unhold_antrian", view: "button", value: "Unhold", width: 100, click: function () {
                        app.pendaftaran.unhold();
                    }
                }
            ]
        },
        {
            id: "tbl_hold",
            view: "datatable",
            select: true, multiselect: true, rowHeight: 40,
            columns: [
                {id: "id", header: "ID"},
                {id: "category", header: "Baru/Perpj", width: 120},
                {id: "nomor", header: "Nomor"},
                {id: "tujuan", header: "Tujuan"},
                {id: "nama", header: "Nama", width: 120},
                {id: "alamat", header: "Alamat", width: 120}
            ]
        }
    ]
};
var right_container = {
    rows: [
        views_hasil, {gravity: 0.000000000001}
    ]
};
function format_lulus(value) {
    if (value == 0)
        return "highlight";
}
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
var appui = {
    id: "main",
    type: "space",
    rows: [
        views_hasil
    ]
};
var app = {
    hReconnect: null,
    user_id: 0,
    session: '',
    login: false,
    pendaftaran: pendaftaran
};
app.pendaftaran.getData = function () {
    var temp = [];
    for (var i in app.pendaftaran.data) {
        var v = app.pendaftaran.data[i];
        console.log(v);
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
app.pendaftaran.load = function () {
    console.log('app.pendaftaran.load');
    // app.pendaftaran.clear();
    webix.ajax().post(app.pendaftaran.url_load, {user_id: app.user_id}, function (text, xml, xhr) {
        // console.log(text);
        try {
            var result = xml.json();
            for (var i in result) {
                try {
                    var v = result[i];
                    v.stage = parseInt(v.stage);
                    v.lulus_prakti = parseInt(v.lulus_prakti, 10);
                    v.lulus_teori = parseInt(v.lulus_teori, 10);
                    app.pendaftaran.data[v.id] = v;
                } catch (e) {
                    console.log(e);
                }
            }
            setTimeout(function () {
                app.pendaftaran.table.clearAll();
                app.pendaftaran.table.parse(app.pendaftaran.getData());
                app.pendaftaran.table.refresh();
                // app.progress.hideProgress();
            }, 1000);
        } catch (e) {
            console.log(e);
            app.progress.hideProgress();
        }
    });
};
app.pendaftaran.refresh = function () {
    app.pendaftaran.table.clearAll();
    app.pendaftaran.table.load(app.pendaftaran.url_load);
};
var loopHandler;
app.loop = function () {
    clearTimeout(loopHandler);
    app.pendaftaran.load();
    loopHandler = setTimeout('app.loop()', 10000);
};

app.init = function () {
    webix.ui(appui);
    app.pendaftaran.table = $$("tbl_pendaftaran");
    app.loop();
};