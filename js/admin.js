var form_shipment = {
    id: "form_shipment",
    view: "form",
    "elements": [
        {
            "view": "combo", "name": "vh_id", "label": "Nopol", "labelWidth": "170", suggest: "scripts/combo_vehicle.php"
        }
        , {
            cols: [
                {"view": "combo", "name": "id_asal", "label": "Asal", "labelWidth": "170", options: "scripts/combo_poi.php"},
                {view: "button", value: "+", width: 40, click: function () {
                        admin.poi.window.show();
                    }}
            ]
        }
        , {
            cols: [
                {"view": "combo", "name": "id_tujuan", "label": "Tujuan", "labelWidth": "170", options: "scripts/combo_poi.php"},
                {view: "button", value: "+", width: 40, click: function () {
                        admin.poi.window.show();
                    }}
            ]
        }
        ,
        {
            cols: [
                {"view": "combo", "name": "id_driver1", "label": "Driver 1", "labelWidth": "170", "suggest": "scripts/combo_driver.php"},
                {view: "button", value: "+", width: 40, click: function () {
                        admin.driver.window.show();
                    }
                }
            ]
        },
        {
            cols: [
                {"view": "combo", "name": "id_driver2", "label": "Driver 2", "labelWidth": "170", "suggest": "scripts/combo_driver.php"},
                {view: "button", value: "+", width: 40, click: function () {
                        admin.driver.window.show();
                    }
                }
            ]
        },
        {
            "view": "combo", "name": "id_kernet", "label": "Kernet", "labelWidth": "170", "suggest": "scripts/combo_kernet.php"

        },
        {
            "view": "text", "name": "no_order", "label": "No Order", "labelWidth": "170"
        },
        {
            "view": "datepicker", format: "%Y-%m-%d", stringResult: true, "name": "tgl_transaksi", "label": "Tgl Transaksi", "labelWidth": "170"
        },
        {
            "view": "text", "name": "no_sj", "label": "No SJ", "labelWidth": "170"
        },
        {
            "view": "text", "name": "no_sm", "label": "No SM", "labelWidth": "170"
        },
        {
            "view": "text", "name": "kode_tax", "label": "Kode Tax", "labelWidth": "170"
        },
        {
            "view": "datepicker", format: "%Y-%m-%d", stringResult: true, "name": "tgl_berangkat", "label": "Tanggal Berangkat", "labelWidth": "170"
        },
        {
            "view": "datepicker", format: "%Y-%m-%d", stringResult: true, "name": "tgl_kedatangan", "label": "Tanggal Kedatangan", "labelWidth": "170"
        },
        {
            "view": "combo", "name": "area", "label": "Area", "labelWidth": "170", "suggest": "scripts/combo_area.php"},
        {
            "view": "combo", "name": "type_unit", "label": "Unit", "suggest": "scripts/load_vehicle_brand.php", "labelWidth": "170"
        },
        {
            "view": "combo", "name": "vendor", "label": "Vendor", "suggest": "scripts/load_vendor.php", "labelWidth": "170"
        },
        {
            "view": "text", "name": "keterangan", "label": "Keterangan", "labelWidth": "170"
        }, {
            margin: 10,
            cols: [
                {},
                {id: "btn_save_shipment", view: "button", label: "Save", type: "form", align: "center", width: 120},
                {id: "btn_close_shipment", view: "button", label: "Cancel", align: "center", width: 120}
            ]
        }
    ]
};
var form_shipment = {
    id: "form_shipment",
    view: "form",
    "elements": [
        {
            "view": "combo", "name": "vh_id", "label": "Nopol", "labelWidth": "170", suggest: "scripts/combo_vehicle.php"
        }
        , {
            cols: [
                {"view": "combo", "name": "id_asal", "label": "Asal", "labelWidth": "170", options: "scripts/combo_poi.php"},
                {view: "button", value: "+", width: 40, click: function () {
                        admin.poi.window.show();
                    }}
            ]
        }
        , {
            cols: [
                {"view": "combo", "name": "id_tujuan", "label": "Tujuan", "labelWidth": "170", options: "scripts/combo_poi.php"},
                {view: "button", value: "+", width: 40, click: function () {
                        admin.poi.window.show();
                    }}
            ]
        }
        ,
        {
            cols: [
                {"view": "combo", "name": "id_driver1", "label": "Driver 1", "labelWidth": "170", "suggest": "scripts/combo_driver.php"},
                {view: "button", value: "+", width: 40, click: function () {
                        admin.driver.window.show();
                    }
                }
            ]
        },
        {
            cols: [
                {"view": "combo", "name": "id_driver2", "label": "Driver 2", "labelWidth": "170", "suggest": "scripts/combo_driver.php"},
                {view: "button", value: "+", width: 40, click: function () {
                        admin.driver.window.show();
                    }
                }
            ]
        },
        {
            "view": "combo", "name": "id_kernet", "label": "Kernet", "labelWidth": "170", "suggest": "scripts/combo_kernet.php"

        },
        {
            "view": "text", "name": "no_order", "label": "No Order", "labelWidth": "170"
        },
        {
            "view": "datepicker", format: "%Y-%m-%d", stringResult: true, "name": "tgl_transaksi", "label": "Tgl Transaksi", "labelWidth": "170"
        },
        {
            "view": "text", "name": "no_sj", "label": "No SJ", "labelWidth": "170"
        },
        {
            "view": "text", "name": "no_sm", "label": "No SM", "labelWidth": "170"
        },
        {
            "view": "text", "name": "kode_tax", "label": "Kode Tax", "labelWidth": "170"
        },
        {
            "view": "datepicker", format: "%Y-%m-%d", stringResult: true, "name": "tgl_berangkat", "label": "Tanggal Berangkat", "labelWidth": "170"
        },
        {
            "view": "datepicker", format: "%Y-%m-%d", stringResult: true, "name": "tgl_kedatangan", "label": "Tanggal Kedatangan", "labelWidth": "170"
        },
        {
            "view": "combo", "name": "area", "label": "Area", "labelWidth": "170", "suggest": "scripts/combo_area.php"},
        {
            "view": "combo", "name": "type_unit", "label": "Unit", "suggest": "scripts/load_vehicle_brand.php", "labelWidth": "170"
        },
        {
            "view": "combo", "name": "vendor", "label": "Vendor", "suggest": "scripts/load_vendor.php", "labelWidth": "170"
        },
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
                {id: "btn_save_vehicle", view: "button", "value": "Save"},
                {id: "btn_close_vehicle", "view": "button", type: "danger", "value": "Cancel"}
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
                {id: "btn_save_poi", "view": "button", "value": "Save"},
                {id: "btn_cancel_poi", "view": "button", type: "danger", "value": "Cancel"}
            ]

        }
    ]
};
var form_user = {
    id: "form_user",
    view: "form",
    elements: [
        {"view": "text", "name": "id", "labelWidth": "100", hidden: true},
        {"view": "text", "name": "mode", "labelWidth": "100", hidden: true},
        {"view": "text", "name": "real_name", "label": "Nama Lengkap", "labelWidth": 100},
        {"view": "text", "name": "login", "label": "Login", "labelWidth": "100"},
        {"view": "text", "name": "password", "label": "Password", "labelWidth": "100"},
        {"view": "combo", "name": "level_id", "label": "User Level", "labelWidth": "100", suggest: "scripts/combo_user_level.php",
            on: {
                onChange: function (newVal, oldVal) {
                    if (newVal == "1" || newVal == "4") {
                        $$("user_access").show();
                    } else {
                        $$("user_access").hide();
                    }
                }
            }

        },
        {"view": "multiselect", id: "user_access", "name": "user_access", label: "Hak Akses", "labelWidth": "100", suggest: "scripts/combo_user_access.php", hidden: true},
        {
            cols: [
                {id: "btn_save_user", view: "button", "value": "Save"},
                {id: "btn_close_user", view: "button", type: "danger", "value": "Cancel"}
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
                        admin.driver.window.show();
                    }
                },
                {"view": "button", type: "danger", "value": "Cancel", click: function () {
                        admin.driver.window.hide();
                    }
                }
            ]
        }
    ]
};
init_windows = function () {
    webix.ui({
        id: "window_vehicle", view: "window", width: 400, height: 400,
        position: "center", move: true, resize: true,
        head: {
            view: "toolbar", margin: -4, cols: [
                {view: "label", label: "Input Vehicle"},
                {view: "icon", icon: "times-circle", align: "left", click: "$$('window_vehicle').hide();"}
            ]
        }, body: {
            view: "scrollview",
            body: webix.copy(form_vehicle)
        }
    });
    webix.ui({
        id: "window_poi", view: "window", width: 400, height: 400,
        position: "center", move: true, resize: true,
        head: {
            view: "toolbar", margin: -4, cols: [
                {view: "label", label: "Input Poi"},
                {view: "icon", icon: "times-circle", align: "left", click: "$$('window_poi').hide();"}
            ]
        }, body: {
            view: "scrollview",
            body: webix.copy(form_poi)
        }
    });

    webix.ui({
        id: "window_user", view: "window", width: 400, height: 300,
        position: "center", move: true, resize: true,
        head: {
            view: "toolbar", margin: -4, cols: [
                {view: "label", label: "Input User"},
                {view: "icon", icon: "times-circle", align: "left", click: "$$('window_user').hide();"}
            ]
        }, body: {
            view: "scrollview",
            body: webix.copy(form_user)
        }
    });
    webix.ui({
        id: "window_driver", view: "window", width: 400, height: 400,
        position: "center", move: true, resize: true,
        head: {
            view: "toolbar", margin: -4, cols: [
                {view: "label", label: "Input Driver"},
                {view: "icon", icon: "times-circle", align: "left", click: "$$('window_driver').hide();"}
            ]
        }, body: {
            view: "scrollview",
            body: webix.copy(form_driver)
        }
    });
    webix.ui({
        id: "window_shipment", view: "window", width: 500, height: 400,
        position: "center", move: true, resize: true,
        head: {
            view: "toolbar", margin: -4, cols: [
                {view: "label", label: "Input Shipment"},
                {view: "icon", icon: "times-circle", align: "left", click: "$$('window_shipment').hide();"}
            ]
        }, body: {
            view: "scrollview",
            body: webix.copy(form_shipment)
        }
    });

    webix.ui({
        view: "popup",
        id: "popup_tree_user",
        head: "Submenu",
        width: 300,
        height: 400,
        resize: true,
        body: {
            rows: [{
                    view: "toolbar", elements: [
                        {view: "label", label: ".:Daftar User:."},
                        {view: "icon", icon: "times-circle", align: "left",
                            click: "$$('popup_tree_user').hide();"}
                    ]
                },
                {
                    id: "tree_user_list",
                    view: "tree",
                    select: true,
                    data: admin.user.get_tree_user(),
                    on: {
                        onItemClick: function (id) {
                            console.log(id);
                            $$("popup_tree_user").hide();
                            admin.vehicle.user_id = id;
                            admin.vehicle.load(id);
                        }
                    }
                }, {
                    view: "toolbar", elements: [
                        {view: "text", on: {
                                onTimedKeyPress: function () {
                                    console.log(this.getValue());
                                    $$("tree_user_list").filter("#value#", this.getValue());
                                }
                            }},
                        {view: "button", value: "Reset", width: 70, click: function () {
                                console.log(app.get_tree_user());
                                $$("tree_user_list").parse(admin.user.get_tree_user(), "json");
                            }}
                    ]
                }]
        }
    });
};
var init_selector = function () {
    admin.header = $$("header");
    admin.vehicle.table = $$("tbl_vehicle");
    admin.vehicle.form = $$("form_vehicle");
    admin.vehicle.window = $$("window_vehicle");

    admin.user.table = $$("tbl_user");
    admin.user.form = $$("form_user");
    admin.user.window = $$("window_user");

    admin.driver.table = $$("tbl_driver");
    admin.driver.form = $$("form_driver");
    admin.driver.window = $$("window_driver");

    admin.shipment.table = $$("tbl_shipment");
    admin.shipment.form = $$("form_shipment");
    admin.shipment.window = $$("window_shipment");
};
var menu = {
    width: 300,
    rows: [
        {view: "toolbar", height: 50, elements: [
                {width: 5},
                {view: "button", type: "icon", icon: "area-chart", width: 30},
                {view: "label", label: "GPS Tracker - Admin"}
            ]
        },
        {
            header: "Menu Admin",
            body: {
                id: "tree_menu",
                view: "tree", select: true,
                fillspace: true,
                data: [
                    {id: "data_master", open: true, value: "Data", data: [
                            {id: "2.1", value: "User", tab: "view_user", icon: "user"},
                            {id: "2.2", value: "Vehicle", tab: "view_vehicle", icon: "vehicle"},
                            {id: "2.3", value: "Poi", tab: "view_poi", icon: "vehicle"},
                            {id: "2.4", value: "Driver", tab: "view_driver", icon: "driver"},
                            {id: "2.5", value: "Sale", tab: "view_sale", icon: "sale"},
                            {id: "2.6", value: "Purchase", tab: "view_purchase", icon: "purchase"},
                            {id: "2.7", value: "Inventory", tab: "view_inventory", icon: "inventory"}
                        ]
                    },
                    {id: "data_shipment", value: "Entryshipment", data: [
                            {id: "3.1", value: "Orders", tab: "view_shipment", icon: "orders"},
                            {id: "3.2", value: "Progress", tab: "view_shipment", icon: "progress"}
                        ]},
                    {id: "data_rentcar", value: "Rentcar", data: [
                            {id: "4.1", value: "List Rent", icon: "rentcar"},
                            {id: "4.2", value: "Due Date", icon: "date"},
                            {id: "4.3", value: "Missing", icon: "missing"},
                            {id: "4.4", value: "Customer", icon: "customer"}
                        ]
                    }

                ]
                ,
                on: {
                    onItemClick: function (id, e, node) {
                        var item = this.getItem(id);
                        $$("header").setValue(item.value);
                        $$("views").showBatch(item.tab);
                    }
                }
            }
        }, {gravity: 0.0001}

    ]
};
create_view = function (config, headers, columns) {
    var default_headers = [
        {id: "btn_add_" + config.view_name, view: "button", value: "Add", width: 80, align: "left"},
        {id: "btn_edit_" + config.view_name, view: "button", value: "Edit", width: 80},
        {id: "btn_delete_" + config.view_name, view: "button", value: "Delete", width: 80},
        {id: "btn_refresh_" + config.view_name, view: "button", value: "refresh", width: 80}];
    var view = {
        id: "view_" + config.view_name,
        batch: "view_" + config.view_name,
        rows: [
            {view: "toolbar", elements: (headers === null) ? default_headers : headers
            }, {
                id: "tbl_" + config.view_name,
                view: "datatable", select: true,
                columns: columns,
                url: config.url_load,
                pager: "pager_" + config.view_name
            }, {
                cols: [
                    {paddingY: -5, id: "pager_" + config.view_name, view: "pager", size: 10, group: 5},
                    {view: "label", id: "lbl_total_" + config.view_name, value: "0 Data", width: 120},
                    {width: 10},
                    {view: "combo", width: 70, options: ["10", "30", "50", "100", "500", "1000"],
                        on: {onChange: function () {
                                console.log(this.getValue());
                                $$("tbl_" + config.view_name).getPager().config.size = this.getValue() * 1;
                                $$("tbl_" + config.view_name).refresh();
                            }}
                    }]

            }
        ]};
    return view;
};

/* 
 //[view_vehicle, view_user, view_driver, view_shipment]
 */
var my_views = [];
var views = {
    type: "clean",
    //view: "scrollview",
    body: {
        rows: [
            {
                view: "toolbar",
                elements: [
                    {view: "label", id: "header", label: "Vehicle"}
                ]
            },
            {
                id: "views",
                view: "toolbar", visibleBatch: "view_vehicle",
                cols: my_views
            }
        ]
    }
};
var ui = {
    rows: [
        {view: "toolbar", height: 55, elements: [
                {view: "button", value: "Administrator", width: 100}

            ]},
        {type: "space", cols: [menu, views]}
    ]
};
format_status = function (val, config) {
    if (val == 1) {
        return {"background-color": "#F00;", "color": "white"};
    }
    return;
};
function open_new_tab(id) {
    var item = $$('list1').getItem(id);
    //add tab
    if (!$$(item.id)) {
        $$("views").addView({view: "template", id: item.id, template: "Title:" + item.title + "<br>Year: " + item.year + "<br>Votes: " + item.votes});
        $$("tabs").addOption(item.id, item.title, true);
    }
    //or show if already added
    else
        $$("tabs").setValue(item.id);
}

function add_new() {
    $$("list1").add({
        title: "New title",
        year: 2000,
        rating: 5,
        votes: 1000
    }, 0)
}

function del_tab() {
    var id = $$("tabs").getValue();
    if (!id)
        return;
    $$("tabs").removeOption(id);
    //show default view if no tabs
    if ($$("tabs").config.options.length === 0)
        $$("tpl").show();
    $$("views").removeView(id);
    $$("list1").unselect(id);
}

init_events = function () {
    console.log('init_events');
    console.log($$("tbl_vehicle"));
    $$("btn_add_vehicle").attachEvent("onItemClick", function () {
        admin.vehicle.form.setValues({mode: "add"});
        admin.vehicle.window.show();
    });
    $$("btn_edit_vehicle").attachEvent("onItemClick", function () {
        var row = admin.vehicle.table.getSelectedItem();
        row['mode'] = 'edit';
        admin.vehicle.form.setValues(row);
        admin.vehicle.window.show();
    });
    $$("btn_delete_vehicle").attachEvent("onItemClick", function () {
        var row = admin.vehicle.table.getSelectedItem();
        webix.confirm("Delete Vehicle? " + row.nopol, function (result) {
            if (result) {
                webix.ajax().post(admin.vehicle.save_url, {mode: "delete", id: row.id}, function (text, xml, xhr) {
                    webix.message({type: "error", text: text});
                });
            }
        });
    });
    $$("btn_refresh_vehicle").attachEvent("onItemClick", function () {
        admin.vehicle.user_id = 0;
        admin.vehicle.load(admin.vehicle.user_id);
    });


    $$("btn_save_vehicle").attachEvent("onItemClick", function () {
        var values = admin.vehicle.form.getValues();
        console.log(values);
        webix.ajax().post(admin.vehicle.save_url, values,
                function (text, xml, xhr) {
                    webix.message(xml.json().code + "<br>" + xml.json().msg);
                });
    });
    $$("btn_close_shipment").attachEvent("onItemClick", function () {
        admin.vehicle.window.close();
    });

    /* User */
    $$("btn_add_user").attachEvent("onItemClick", function () {
        admin.user.form.setValues({mode: "add"});
        admin.user.window.show();
    });
    $$("btn_edit_user").attachEvent("onItemClick", function () {
        var row = admin.user.table.getSelectedItem();
        row['mode'] = 'edit';
        admin.user.form.setValues(row);
        admin.user.window.show();
    });
    $$("btn_delete_user").attachEvent("onItemClick", function () {
        var row = admin.user.table.getSelectedItem();
        webix.confirm("Delete User? " + row.real_name, function (result) {
            if (result) {
                webix.ajax().post(admin.user.save_url, {mode: "delete", id: row.id}, function (text, xml, xhr) {
                    webix.message({type: "error", text: text});
                });
            }
        });
    });
    $$("btn_refresh_user").attachEvent("onItemClick", function () {
        admin.user.table.load(admin.user.table.config.url);
    });
    $$("btn_save_user").attachEvent("onItemClick", function () {
        var values = admin.user.form.getValues();
        console.log(values);
        webix.ajax().post(admin.user.save_url, values,
                function (text, xml, xhr) {
                    webix.message(xml.json().code + "<br>" + xml.json().msg);
                });
    });
    $$("btn_close_user").attachEvent("onItemClick", function () {
        admin.user.window.close();
    });



    /* Entryshipment */
    $$("btn_add_shipment").attachEvent("onItemClick", function () {
        admin.shipment.form.setValues({mode: "add"});
        admin.shipment.window.show();
    });
    $$("btn_edit_shipment").attachEvent("onItemClick", function () {
        var row = admin.shipment.table.getSelectedItem();
        row['mode'] = 'edit';
        admin.shipment.form.setValues(row);
        admin.shipment.window.show();
    });
    $$("btn_delete_shipment").attachEvent("onItemClick", function () {
        var row = admin.shipment.table.getSelectedItem();
        webix.confirm("Delete Shipment? " + row.real_name, function (result) {
            if (result) {
                webix.ajax().post(admin.shipment.save_url, {mode: "delete", id: row.id}, function (text, xml, xhr) {
                    webix.message({type: "error", text: text});
                });
            }
        });
    });
    $$("btn_refresh_shipment").attachEvent("onItemClick", function () {
        //admin.shipment.load();
       app.shipment.reload();
    });

    $$("btn_save_shipment").attachEvent("onItemClick", function () {
       app.shipment.save();
    });
    $$("btn_close_shipment").attachEvent("onItemClick", function () {
        admin.shipment.window.close();
    });

    admin.vehicle.table.attachEvent("onBeforeLoad", function () {
        console.log("onBeforeLoad");
        $$("view_vehicle").showProgress();
    });

    admin.vehicle.table.attachEvent("onAfterLoad", function () {
        console.log("onAfterLoad");
        setTimeout(function () {
            $$("view_vehicle").hideProgress();
        }, 3000);
    });

    admin.user.table.attachEvent("onBeforeLoad", function () {
        console.log("onBeforeLoad");
        $$("view_user").showProgress();
    });

    admin.user.table.attachEvent("onAfterLoad", function () {
        console.log("onAfterLoad");
        setTimeout(function () {
            $$("view_user").hideProgress();
        }, 3000);
    });

    admin.driver.table.attachEvent("onBeforeLoad", function () {
        console.log("onBeforeLoad");
        $$("view_driver").showProgress();
    });

    admin.driver.table.attachEvent("onAfterLoad", function () {
        console.log("onAfterLoad");
        setTimeout(function () {
            $$("view_driver").hideProgress();
        }, 3000);
    });

    admin.shipment.table.attachEvent("onBeforeLoad", function () {
        console.log("onBeforeLoad");
        $$("view_shipment").showProgress();
    });

    admin.shipment.table.attachEvent("onAfterLoad", function () {
        console.log("onAfterLoad");
        setTimeout(function () {
            $$("view_shipment").hideProgress();
        }, 3000);
    });
};

var admin = {
    id: 0,
    header: null,
    active: null,
    name: "admin",
    debug: false, //comment for production
    vehicle: {
        view_name: "vehicle",
        user_id: 0,
        user_name: '',
        id: 0,
        form: null,
        window: null,
        table: null,
        load_url: 'scripts/load_vehicle.php',
        save_url: 'scripts/save_vehicle.php'
    },
    poi: {
        view_name: "poi",
        user_id: 0,
        user_name: '',
        id: 0,
        form: null,
        window: null,
        table: null,
        load_url: 'scripts/load_poi.php',
        save_url: 'scripts/save_poi.php'
    },
    user: {
        view_name: "user",
        id: 0,
        form: null,
        window: null,
        table: null,
        data: [],
        load_url: 'scripts/load_user.php',
        save_url: 'scripts/save_user.php'
    },
    driver: {
        view_name: "driver",
        user_id: 0,
        id: 0,
        form: null,
        window: null,
        table: null,
        load_url: 'scripts/load_driver.php',
        save_url: 'scripts/save_driver.php'
    },
    shipment: {
        view_name: "shipment",
        user_id: 0,
        id: 0,
        form: null,
        window: null,
        table: null,
        load_url: 'scripts/load_shipment.php',
        save_url: 'scripts/save_shipment.php'
    },
    inventory: {
        view_name: "inventory",
        user_id: 0,
        id: 0,
        form: null,
        window: null,
        table: null,
        load_url: 'scripts/load_inventory.php',
        save_url: 'scripts/save_inventory.php'
    },
    vehicles: [],
    init: function () {
        console.log('init admin')
        admin.init_views();
        webix.ui(ui);
        init_windows();
        init_selector();
        init_events();
        webix.extend($$("view_vehicle"), webix.ProgressBar);
        webix.extend($$("view_user"), webix.ProgressBar);
        webix.extend($$("view_driver"), webix.ProgressBar);
        webix.extend($$("view_shipment"), webix.ProgressBar);
        //Finally Init Data
        admin.trigger("initData");
    },
    trigger: function (name) {
        admin.callEvent(name, arguments);
    },
    on: function (name, code) {
        admin.attachEvent(name, code);
    },
    utils: {}
};
admin.init_views = function () {
    var column_user = [
        {id: "id", header: "#", width: 40},
        {id: "login", header: ["Login", {content: "textFilter", placeholder: "Search Nopol"}], width: 120},
        {id: "real_name", header: ["Real Name", {content: "textFilter", placeholder: "Search Imei"}], width: 120},
        {id: "level", header: "User Level", width: 120},
        {id: "expired_date", header: ["Expired Date", {content: "textFilter", placeholder: "Search Phone"}], width: 120}
    ];
    var header_user = [];
    var column_vehicle = [
        {id: "id", header: "#", width: 40},
        {id: "real_name", header: "User", width: 120},
        {id: "nopol", header: ["Nopol", {content: "textFilter", placeholder: "Search Nopol"}], width: 120},
        {id: "imei", header: ["Imei", {content: "textFilter", placeholder: "Search Imei"}], width: 120},
        {id: "phone", header: ["Phone", {content: "textFilter", placeholder: "Search Phone"}], width: 120},
        {id: "gps_brand", header: "Model", width: 120},
    ];
    var header_vehicle = [
        {id: "btn_list_user", view: "button", value: "Select User", width: 80, popup: 'popup_tree_user'},
        {id: "btn_add_vehicle", view: "button", value: "Add", width: 80, align: "left"},
        {id: "btn_edit_vehicle", view: "button", value: "Edit", width: 80},
        {id: "btn_delete_vehicle", view: "button", value: "Delete", width: 80},
        {id: "btn_refresh_vehicle", view: "button", value: "refresh", width: 80}
    ];
    var column_driver = [
        {id: "id", header: "#", width: 40},
        {id: "driver", header: ["Nama Driver", {content: "textFilter", placeholder: "Search Driver"}], width: 120},
        {id: "hp", header: ["Phone", {content: "textFilter", placeholder: "Search Phone"}], width: 120},
        {id: "alamat", header: "Alamat", width: 120},
        {id: "keterangan", header: "Keterangan", width: 120}
    ];
    var header_driver = [];
    var column_shipment = [
        {id: "id", header: "#", width: 60, sort: "int"},
        {id: "status", header: ["Status", {content: "multiSelectFilter"}], width: 130, align: "center", template: function (obj) {
                //console.log(obj);
                if (parseInt(obj.id_status) == 1) {
                    return "<div style='color:blue;'>" + obj.status + "</div>";
                }
                if (parseInt(obj.id_status) == 2) {
                    return "<div style='color:green;'>" + obj.status + "</div>";
                }
                if (parseInt(obj.id_status) == 3) {
                    return "<div style='color:red;'>" + obj.status + "</div>";
                }
                if (parseInt(obj.id_status) == 4) {
                    return "<div style='color:orange;'>" + obj.status + "</div>";
                }
                return obj.status;
            }
        },
        {id: "nopol", sort: "string", header: ["Nopol", {content: "selectFilter"}], width: 130},
        {id: "driver1", sort: "string", header: ["Driver", {content: "selectFilter"}], width: 130},
        {id: "poi_asal", sort: "string", header: ["Asal", {content: "selectFilter"}], width: 150},
        {id: "poi_tujuan", sort: "string", header: ["Tujuan", {content: "selectFilter"}], width: 150},
        {id: "start", sort: "string", header: ["Tgl Berangkat", {content: "selectFilter"}], width: 130},
        {id: "tgl_transaksi", header: ["Tgl Transaksi", {content: "selectFilter"}], width: 150},
        {id: "no_order", sort: "string", header: "No Order", width: 130},
        {id: "no_sm", header: "No SM", width: 130}

    ];
    var column_poi = [
        {id: "id", header: "#", width: 40},
        {id: "poi", header: "Poi", width: 120},
        {id: "lat", header: "Latitude", width: 120},
        {id: "lng", header: "Longitude", width: 120}
    ];
    var header_poi = [];
    var column_inventory = [
        {id: "id", header: "#", width: 40},
        {id: "inventory", header: ["Nama Item", {content: "textFilter", placeholder: "Search Item"}], width: 120},
        {id: "group_inventory", header: ["Group", {content: "textFilter", placeholder: "Search Group"}], width: 120},
        {id: "purchase_date", header: "Tgl Beli", width: 120},
        {id: "total", header: "Jumlah", width: 120},
        {id: "keterangan", header: "Keterangan", width: 120}
    ];
    var header_inventory = [];


    var view_user = create_view(admin.user, null, column_user);
    var view_vehicle = create_view(admin.vehicle, header_vehicle, column_vehicle);
    var view_driver = create_view(admin.driver, null, column_driver);
    var view_shipment = create_view(admin.shipment, null, column_shipment);
    var view_poi = create_view(admin.poi, null, column_poi);
    var view_inventory = create_view(admin.inventory, null, column_inventory);

    my_views.push(view_vehicle);
    my_views.push(view_user);
    my_views.push(view_driver);
    my_views.push(view_shipment);
    my_views.push(view_poi);
    my_views.push(view_inventory);
};
admin.user.get_tree_user = function () {
    //console.log(data);
    function getChildren(reseller_id, data) {
        var temp = [];
        for (var i in data) {
            if ((data[i].reseller_id == reseller_id) && (data[i].level_id != '1') && (data[i].level_id != '4')) {
                // console.log(data[i])
                temp.push({
                    id: data[i].id,
                    icon: (data[i].state == 'AKTIF') ? 'user_ok' : 'user_disable',
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
            data: getChildren(0, admin.user.data)
        }];
    for (var i in admin.user.data) {
        // console.log(data[i]);
        if (admin.user.data[i].level_id == '1' || admin.user.data[i].level_id == '4') {
            //console.log(data[i].level_id);
            temp.push({
                id: "group_" + admin.user.data[i].id,
                icon: (admin.user.data[i].level_id == '4') ? 'user_reseller' : 'user_admin',
                value: admin.user.data[i].real_name,
                data: getChildren(admin.user.data[i].id, admin.user.data)
            });
        }
    }
    //console.log(temp);
    return temp;
};
admin.user.load = function () {
    webix.ajax().post("scripts/load_user.php", {}, function (text, xml, xhr) {
        var options = [];
        admin.user.data = [];
        var data = xml.json();
        for (var i in data) {
            options.push({id: data[i].id, value: data[i].real_name});
            admin.user.data.push(data[i]);
        }
        $$("tree_user_list").parse(admin.user.get_tree_user(), "json");
        for (var i in admin.user.data) {
            admin.vehicle.user_id = admin.user.data[i].id;
            admin.vehicle.user_name = admin.user.data[i].real_name;
            admin.vehicle.load(admin.user.data[i].id);
            break;
        }
    });
};
admin.shipment.load = function (user_id) {
    $$("view_shipment").showProgress({delay: 60000, hide: true});
    webix.ajax().post(admin.shipment.load_url, {user_id: user_id}, function (text, xml, xhr) {
        console.log(text);
        try {
            var result = xml.json();
            console.log(result);
            var data = [];
            for (var i in result) {
                data.push(result[i]);
            }
            admin.shipment.table.clearAll();
            admin.shipment.table.parse(data);
            admin.shipment.table.refresh();
            $$("view_shipment").hideProgress();
        } catch (e) {
            $$("view_shipment").hideProgress();
        }
    });
};
webix.extend(admin, webix.EventSystem);
admin.on("initData", function () {
    admin.user.load();
});
admin.vehicle.load = function (user_id) {
    $$("view_vehicle").showProgress({delay: 60000, hide: true});
    webix.ajax().post(admin.vehicle.load_url, {user_id: user_id}, function (text, xml, xhr) {
        // console.log(text);
        try {
            var result = xml.json();
            // console.log(result.data);
            var vehicles = [];
            for (var i in result) {
                vehicles.push(result[i]);
            }
            console.log(vehicles);
            admin.vehicle.table.clearAll();
            admin.vehicle.table.parse(vehicles);
            admin.vehicle.table.refresh();
            //$$("lbl_current_user").setValue("Current User:"+ )
            $$("lbl_total_vehicle").setValue("Total " + vehicles.length + " Vehicle");
            $$("view_vehicle").hideProgress();
        } catch (e) {
            $$("view_vehicle").hideProgress();
        }
    });
};

