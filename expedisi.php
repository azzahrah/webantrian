<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="codebase/skins/compact.css" type="text/css" media="screen" charset="utf-8">
        <script src="codebase/webix.js" type="text/javascript" charset="utf-8"></script>

        <title>Compact skin</title>
        <script type="text/javascript" src="//cdn.webix.com/components/sidebar/sidebar.js"></script>
        <link rel="stylesheet" type="text/css" href="//cdn.webix.com/components/sidebar/sidebar.css">
        <style>
            .header_acc{font-family:'PT Sans'}
            .transparent{
                background-color: transparent;
            }
            .main_title{
                font-size: 19px;
                line-height: 48px;
            }

            a.check_flight{
                color:  #367ddc;
            }
            .webix_row_select a.check_flight{
                color:  #fff;
            }
            .blue_row{
                background-color: #cbdeeb !important;
            }
            .blue_row .webixtype_form{
                font-size: 18px;
            }
            .blue.webix_menu-x{
                background:#3498DB;
            }
            .webix_menu-x{
                margin-top:100px;
            }
        </style>
    </head>
    <body>
        <div id="menuxx" style="position:absolute;top:0;right:0;width:200px; height:40px;"></div>
        <script type="text/javascript">
            var vehicles = [];
            var users = [];

            /*
             * @type ArrayAdd Tree
             * tree=new webix.ui({view:'tree',..});             
             var parentId= tree.getSelectedId();
             tree.add( {value:"New item"}, 0, parentId);
             */

            var cities = [
                {id: 1, value: "Berlin"}, {id: 2, value: "Kiev"}, {id: 3, value: "Minsk"},
                {id: 4, value: "Moscow"}, {id: 5, value: "Prague"}, {id: 6, value: "Riga"},
                {id: 7, value: "St.Petersburg"}, {id: 8, value: "Tallin"}, {id: 9, value: "Vilnius"}, {id: 10, value: "Warsaw"}
            ];
            var hours = [];
            for (var i = 0; i < 24; i++) {
                hours.push(i < 10 ? ("0" + i) : "" + i);
            }
            var minutes = [];
            for (var i = 0; i < 60; i += 15) {
                minutes.push(i < 10 ? ("0" + i) : "" + i);
            }


            var offers = [
                {id: 1, direction: "<b>Tallin</b> EE - <b>Berlin</b> Tegel DE", date: new Date(2014, 7, 25), price: "450", save: "45", places: 21},
                {id: 2, direction: "<b>Moscow</b> Vnukovo RU - <b>Kiev</b> Borispol UA", date: new Date(2014, 7, 28), price: "160", save: "65", places: 5},
                {id: 3, direction: "<b>Riga</b> International LV - <b>Warsaw</b> Modlin", date: new Date(2014, 7, 16), price: "220", save: "110", places: 2},
                {id: 4, direction: "<b>Vilnius</b> LT - <b>Kiev</b> Zhulhany UA", date: new Date(2014, 8, 1), price: "140", save: "40", places: 35},
                {id: 5, direction: "<b>Minsk</b> International 2 BY- <b>Berlin</b> Schoenefeld DE", date: new Date(2014, 8, 6), price: "378", save: "35", places: 25},
                {id: 6, direction: "<b>St. Petersburg</b> Pulkovo - <b>Tallin</b> Estonia", date: new Date(2014, 7, 31), price: "90", save: "82", places: 11},
                {id: 7, direction: "<b>Kiev</b> Zhulhany UA - <b>Moscow</b> Vnukovo RU", date: new Date(2014, 8, 15), price: "220", save: "30", places: 41},
                {id: 8, direction: "<b>Moscow</b> Sheremetyevo RU - <b>Vilnius</b> LT", date: new Date(2014, 8, 11), price: "321", save: "44", places: 32},
                {id: 9, direction: "<b>Warsaw</b> PL - <b>Minsk</b> International 2 BY", date: new Date(2014, 8, 5), price: "256", save: "32", places: 55},
                {id: 10, direction: "<b>Prague</b> CZ - <b>St. Petersburg</b> Pulkovo", date: new Date(2014, 7, 30), price: "311", save: "63", places: 15},
                {id: 11, direction: "<b>Tallin</b> EE - <b>Berlin</b> Tegel DE", date: new Date(2014, 8, 25), price: "450", save: "45", places: 35},
                {id: 12, direction: "<b>Moscow</b> Vnukovo RU - <b>Kiev</b> Borispol UA", date: new Date(2014, 8, 28), price: "160", save: "65", places: 20},
                {id: 13, direction: "<b>Riga</b> International LV - <b>Warsaw</b> Modlin", date: new Date(2014, 8, 16), price: "220", save: "110", places: 22},
                {id: 14, direction: "<b>Vilnius</b> LT - <b>Kiev</b> Zhulhany UA", date: new Date(2014, 9, 1), price: "140", save: "40", places: 20},
                {id: 15, direction: "<b>Minsk</b> International 2 BY- <b>Berlin</b> Schoenefeld DE", date: new Date(2014, 9, 6), price: "378", save: "35", places: 11},
                {id: 16, direction: "<b>St. Petersburg</b> Pulkovo - <b>Tallin</b> Estonia", date: new Date(2014, 9, 31), price: "90", save: "82", places: 21},
                {id: 17, direction: "<b>Kiev</b> Zhulhany UA - <b>Moscow</b> Vnukovo RU", date: new Date(2014, 10, 15), price: "220", save: "30", places: 53},
                {id: 18, direction: "<b>Moscow</b> Sheremetyevo RU - <b>Vilnius</b> LT", date: new Date(2014, 11, 11), price: "321", save: "44", places: 42},
                {id: 19, direction: "<b>Warsaw</b> PL - <b>Minsk</b> International 2 BY", date: new Date(2014, 12, 5), price: "256", save: "32", places: 30},
                {id: 20, direction: "<b>Prague</b> CZ - <b>St. Petersburg</b> Pulkovo", date: new Date(2014, 12, 14), price: "311", save: "63", places: 2},
                {id: 21, direction: "<b>Minsk</b> International 2 BY - <b>Berlin</b> Tegel DE", date: new Date(2014, 12, 20), price: "256", save: "32", places: 10},
                {id: 22, direction: "<b>Vilnius</b> LT - <b>Berlin</b> Tegel DE", date: new Date(2014, 12, 21), price: "311", save: "63", places: 11}
            ];
            var info = [
                {id: 1, from: "Tallin", to: "Berlin", depart: "06:20", arrive: "08:35", status: "Landed"},
                {id: 2, from: "Moscow", to: "Kiev", depart: "06:35", arrive: "07:40", status: "Landed"},
                {id: 3, from: "Riga", to: "Warsaw", depart: "06:45", arrive: "08:05", status: "Landed"},
                {id: 4, from: "Vilnius", to: "Zhulhany", depart: "06:50", arrive: "07:40", status: "Landed"},
                {id: 5, from: "Prague", to: "St. Petersburg", depart: "07:20", arrive: "09:50", status: "On Time"},
                {id: 6, from: "Moscow", to: "Prague", depart: "07:45", arrive: "10:05", status: "On Time"},
                {id: 7, from: "Berlin", to: "Oslo", depart: "07:15", arrive: "09:45", status: "On Time"},
                {id: 8, from: "Roma", to: "Stockholm", depart: "07:05", arrive: "10:25", status: "On Time"},
                {id: 9, from: "Barcelona", to: "Kiev", depart: "07:10", arrive: "10:45", status: "On Time"},
                {id: 10, from: "Milan", to: "Frankfurt", depart: "07:30", arrive: "09:15", status: "On Time"},
                {id: 11, from: "Moscow", to: "Oslo", depart: "07:50", arrive: "10:50", status: "On Time"},
                {id: 12, from: "Berlin", to: "Riga", depart: "08:05", arrive: "09:45", status: "On Time"},
                {id: 13, from: "Roma", to: "Moscow", depart: "08:15", arrive: "11:25", status: "On Time"},
                {id: 14, from: "Barcelona", to: "Vilnius", depart: "08:20", arrive: "11:45", status: "On Time"},
                {id: 15, from: "Milan", to: "Warsaw", depart: "08:25", arrive: "10:15", status: "On Time"}
            ];
            var carsdata = [
                {
                    id: "root", value: "Cars", open: true,
                    data: [
                        {id: "1", open: true, value: "Toyota",
                            data: [
                                {id: "1.1", value: "Avalon"},
                                {id: "1.2", value: "Corolla"},
                                {id: "1.3", value: "Camry"}
                            ]
                        },
                        {id: "2", value: "Skoda", data: [
                                {id: "2.1", value: "Octavia"},
                                {id: "2.2", value: "Superb"}
                            ]
                        },
                        {id: "3", value: "Opel", data: [
                                {id: "3.1", value: "Astra"},
                                {id: "3.2", value: "Vectra"},
                                {id: "3.3", value: "Corsa"}
                            ]
                        }
                    ]
                }
            ];
            var left_container = {
                rows: [
                    {
                        view: "sidebar",
                        data: [
                            {id: "entryshipment", icon: "dashboard", expand: true, value: "Entryshpment", data: [
                                    {id: "data_entryshipment", value: "Data Entryshipment"},
                                    {id: "map_entryshipment", value: "Map Entryshipment"}
                                ]},
                            {id: "tables", icon: "table", value: "Laporan", data: [
                                    {id: "tables1", value: "Datatable"},
                                    {id: "tables2", value: "TreeTable"},
                                    {id: "tables3", value: "Pivot"}
                                ]},
                            {id: "uis", icon: "puzzle-piece", value: "UI Components", data: [
                                    {id: "dataview", value: "DataView"},
                                    {id: "list", value: "List"},
                                    {id: "menu", value: "Menu"},
                                    {id: "tree", value: "Tree"}
                                ]},
                            {id: "tools", icon: "calendar-o", value: "Tools", data: [
                                    {id: "kanban", value: "Kanban Board"},
                                    {id: "pivot", value: "Pivot Chart"},
                                    {id: "scheduler", value: "Calendar"}
                                ]},
                            {id: "forms", icon: "pencil-square-o", value: "Forms", data: [
                                    {id: "buttons", value: "Buttons"},
                                    {id: "selects", value: "Select boxes"},
                                    {id: "inputs", value: "Inputs"}
                                ]},
                            {id: "demo", icon: "book", value: "Documentation"}
                        ],
                        on: {
                            onAfterSelect: function (id) {
                                console.log(id);
                                $$("multiview").setValue(id);
                                //$$(id).show();
                                //webix.message("Selected: " + this.getItem(id).value)
                            }
                        }
                    }, {gravity: 0.000000000001}]
            };
            var carsdata = [
                {
                    id: "root", value: "Cars", open: true,
                    data: [
                        {id: "1", open: true, value: "Toyota",
                            data: [
                                {id: "1.1", value: "Avalon"},
                                {id: "1.2", value: "Corolla"},
                                {id: "1.3", value: "Camry"}
                            ]
                        },
                        {id: "2", value: "Skoda", data: [
                                {id: "2.1", value: "Octavia"},
                                {id: "2.2", value: "Superb"}
                            ]
                        },
                        {id: "3", value: "Opel", data: [
                                {id: "3.1", value: "Astra"},
                                {id: "3.2", value: "Vectra"},
                                {id: "3.3", value: "Corsa"}
                            ]
                        }
                    ]
                }
            ];
            var menu_user = [
                {
                    id: "root", value: "Menu", open: true,
                    data: [
                        {id: "1", open: true, value: "Orders"},
                        {id: "2", open: true, value: "Map"},
                        {id: "3", open: true, value: "Route"},
                        {id: "4", open: true, value: "Vehicle"},
                        {id: "5", open: true, value: "POI"},
                        {id: "6", open: true, value: "Report"}
                    ]
                }
            ];
            var left_container2 = {
                view: "scrollview",
                body: {
                    width: 320,
                    multi: true,
                    rows: [
                        {
                            view: "form",
                            elements: [
                                {id: "cboUser", view: "richselect", options: [
                                        {id: "1", value: "Test"},
                                        {id: "2", value: "OK"}

                                    ]}
                            ]

                        },                        
                        {
                            header: "Vehicle",
                            body: {
                                rows: [{view: "toolbar", elements: [
                                            {view: "text", value: "Search", width: 100},
                                            {view: "button", value: "All=10"},
                                            {view: "button", type: "danger", value: "On=10"},
                                            {view: "button", type: "form", value: "Off=0"}
                                        ]
                                    },
                                    {
                                        view: "datatable",
                                        select: true,
                                        columns: [
                                            {id: "id", header: "", width: 10, hidden: true},
                                            {id: "acc", header: "ACC", width: 100, adjust: true, format: function (obj) {
                                                    //console.log(obj);
                                                    if (obj == 1) {
                                                        return "<span class='acc_on'>ON</span>";
                                                    }
                                                    return "<span class='acc_on'>OFF</span>";
                                                }
                                            },
                                            {id: "nopol", header: "Nopol", adjust: true, width: 80},
                                            {id: "tdate", header: "Date", adjust: true, width: 150}
                                        ],
                                        url: "scripts/load_gps.php"
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
            var cells_loading_unloading = [
                {
                    id: "Loading",
                    view: "datatable",
                    columns: [
                        {id: "rank", header: "", css: "rank", width: 50},
                        {id: "nopol", header: "Nopol", width: 200},
                        {id: "tgl_berangkat", header: "Tgl Berangkat", width: 150},
                        {id: "tgl_tiba", header: "Tgl Tiba", width: 150}
                    ]
                },
                {
                    id: "Unloading",
                    template: "Place for the form control"
                },
                {
                    id: "Events",
                    template: "About the app"
                }
            ];
            var form_entryshipment = {
                view: "tabview",
                cells: [
                    {
                        header: "Form",
                        body: {
                            "view": "form",
                            "elements": [
                                {
                                    "view": "text",
                                    "name": "noorder",
                                    "label": "No Order",
                                    "labelWidth": "170"
                                },
                                {
                                    "view": "datepicker",
                                    "name": "tgltransaksi",
                                    "label": "Tgl Transaksi",
                                    "labelWidth": "170"
                                },
                                {
                                    "view": "text",
                                    "name": "nosj",
                                    "label": "No SJ",
                                    "labelWidth": "170"
                                },
                                {
                                    "view": "text",
                                    "name": "nosm",
                                    "label": "No SM",
                                    "labelWidth": "170"
                                },
                                {
                                    "view": "text",
                                    "name": "kodetax",
                                    "label": "Kode Tax",
                                    "labelWidth": "170"
                                },
                                {
                                    "view": "text",
                                    "name": "kodearea",
                                    "label": "Kode Area",
                                    "labelWidth": "170"
                                },
                                {
                                    "view": "text",
                                    "name": "nopol",
                                    "label": "Nopol",
                                    "labelWidth": "170"
                                },
                                {
                                    "view": "datepicker",
                                    "name": "tglberangkat",
                                    "label": "Tanggal Berangkat",
                                    "labelWidth": "170"
                                },
                                {
                                    "view": "datepicker",
                                    "name": "tglkedatangan",
                                    "label": "Tanggal Kedatangan",
                                    "labelWidth": "170"
                                },
                                {
                                    "view": "text",
                                    "name": "area",
                                    "label": "Area",
                                    "labelWidth": "170"
                                },
                                {
                                    "view": "richselect",
                                    "name": "typeunit",
                                    "label": "Unit",
                                    "options": [
                                        "GIGA",
                                        "HINO"
                                    ],
                                    "labelWidth": "170"
                                },
                                {
                                    "view": "richselect",
                                    "name": "vendor",
                                    "label": "Vendor",
                                    "options": [
                                        "VENDOR A",
                                        "VENDOR B",
                                        "VENDOR C"
                                    ],
                                    "labelWidth": "170"
                                },
                                {
                                    "view": "richselect",
                                    "name": "driver1",
                                    "label": "Driver 1",
                                    "labelWidth": "170",
                                    "options": [
                                        "One",
                                        "Two"
                                    ]
                                },
                                {
                                    "view": "richselect",
                                    "name": "driver2",
                                    "label": "Driver 2",
                                    "labelWidth": "170",
                                    "options": [
                                        "One",
                                        "Two"
                                    ]
                                },
                                {
                                    "view": "text",
                                    "name": "kernet",
                                    "label": "Kernet",
                                    "labelWidth": "170",
                                    "options": [
                                        "One",
                                        "Two"
                                    ]
                                },
                                {
                                    "view": "text",
                                    "name": "keterangan",
                                    "label": "Keterangan",
                                    "labelWidth": "170"
                                }, {
                                    margin: 10,
                                    cols: [
                                        {},
                                        {view: "button", label: "Add", type: "form", align: "center", width: 120, click: function () {
                                                webix.$$("order-win").close();
                                            }},
                                        {view: "button", label: "Cancel", align: "center", width: 120, click: function () {
                                                webix.$$("order-win").close();
                                            }}
                                    ]
                                }
                            ]
                        }
                    }, {
                        header: "Loading/Unloading",
                        body: {
                            view: "datatable",
                            columns: [
                                {id: "rank", header: "", css: "rank", width: 50},
                                {id: "nopol", header: "Nama Pengirim", width: 200},
                                {id: "poi_sender", header: "Lokasi Loading", width: 150},
                                {id: "poi_destination", header: "Lokasi Unloading", width: 150}
                            ]
                        }
                    }
                ]
            };
            var orders = {
                id: "mv_orders",
                rows: [
                    {
                        view: "toolbar",
                        elements: [
                            {view: "button", value: "Add", width: 100, click: function () {
                                    $$("window_entryshipment").show();
                                }
                            },
                            {view: "button", value: "Edit", width: 100},
                            {view: "button", value: "Delete", width: 100},
                            {view: "button", value: "Refresh", width: 100}
                        ]
                    }, {
                        view: "datatable",
                        columns: [
                            {id: "rank", header: "", css: "rank", width: 50},
                            {id: "nopol", header: "Nopol", width: 200},
                            {id: "tgl_berangkat", header: "Tgl Berangkat", width: 150},
                            {id: "tgl_tiba", header: "Tgl Tiba", width: 150}
                        ]
                    },
                    {view: "resizer"},
                    {
                        header: "Data Loading/Unloading",
                        body: {
                            view: "tabview",
                            animate: false,
                            cells: cells_loading_unloading
                        }
                    }]
            };
            var map = {
                id: "mv_map",
                type: "clean",
                rows: [
                    {
                        view: "toolbar",
                        elements: [
                            {view: "icon", width: 40, icon: "comments", badge: 10}
                        ]
                    },
                    {
                        id: "map",
                        view: "google-map",
                        key: "AIzaSyCobdKM8bzMG6EcmwE0ZSpz68z6JEgLGMY",
                        zoom: 6,
                        center: [-7.373783, 112.4747848]
                    },
                    // {view: "resizer"}, 
                    {
                        header: "Las Position",
                        body: {
                            view: "datatable",
                            pagination: true,
                            columns: [
                                {id: "rank", header: "", css: "rank", width: 50},
                                {id: "title", header: "Film title", width: 200},
                                {id: "year", header: "Released", width: 80},
                                {id: "votes", header: "Votes", width: 100}
                            ]
                        }
                    }
                ]

            };
            var right_container = {
                rows: [{
                        id: "multiview",
                        view: "multiview",
                        animate: false,
                        cells: [orders, map]
                    }, {gravity: 0.000000000001}
                ]
            };
            webix.ui({
                view: "popup", id: "lang",
                head: false, width: 100,
                body: {
                    view: "list", scroll: false,
                    yCount: 4, select: true, borderless: true,
                    template: "#lang#",
                    data: [
                        {id: 1, lang: "English"},
                        {id: 2, lang: "French"},
                        {id: 3, lang: "German"},
                        {id: 4, lang: "Russian"}
                    ],
                    on: {"onAfterSelect": function () {
                            $$("lang").hide();
                        }}
                }
            });
            var form_vehicle = {
                width: 400,
                view: "form",
                borderless: true,
                elements: [
                    {view: "text", label: "Nopol", id: "nopol", labelWidth: 120},
                    {view: "text", label: "Imei", id: "imei", labelWidth: 120},
                    {view: "text", label: "Kendaraan", id: "vh_brand", labelWidth: 120},
                    {view: "combo", label: "Nama Pemilik", id: "cbo_owner", options: "scripts/combo_user.php", labelWidth: 120},
                    {view: "combo", label: "Timezone", id: "timezone", options: "scripts/combo_timezone.php", labelWidth: 120}
                ],
                rules: {
                    "email": webix.rules.isEmail,
                    "login": webix.rules.isNotEmpty
                }
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
            webix.ui({
                id: "mywindow",
                view: "window",
                width: 450,
                height: 250,
                position: "center",
                move: true,
                resize: true,
                head: {
                    view: "toolbar", margin: -4, cols: [
                        {view: "label", label: "Form Input/Edit Vehicle"},
                        {view: "icon", icon: "save", align: "right", click: "webix.message('About pressed')"},
                        {view: "icon", icon: "question-circle", align: "left", click: "webix.message('About pressed')"},
                        {view: "icon", icon: "times-circle", align: "left",
                            click: "$$('mywindow').hide();"}

                    ]
                }
                , body: {
                    view: "scrollview",
                    body: webix.copy(form_vehicle)
                }
            });
            webix.ui({
                id: "windowcontrol",
                view: "window",
                width: 450,
                height: 250,
                position: "center",
                move: true,
                resize: true,
                head: {
                    view: "toolbar", margin: -4, cols: [
                        {view: "label", label: "Control Vehicle"},
                        {view: "icon", icon: "times-circle", align: "left",
                            click: "$$('windowcontrol').hide();"}

                    ]
                }
                , body: {
                    view: "scrollview",
                    body: webix.copy(form_command)
                }
            });
            function showForm(winId, node) {
                // $$(winId).getBody().clear();
                $$(winId).show(node);
                // $$(winId).getBody().focus();
            }
            var menu_data = [
                {id: "1", value: "Translate...", submenu: [
                        "English",
                        {value: "Slavic...", submenu: [
                                "Belarusian", "Russian", "Ukrainian"
                            ]},
                        "German"
                    ]},
                {id: "2", value: "Post...", submenu: ["Facebook", "Google+", "Twitter"]},
                {id: "3", value: "Info"}
            ];
            var menu = {
                height: 55,
                width: 300,
                view: "menu",
                data: menu_data,
                css: "blue"
            };
            var toolbar = {view: "toolbar",
                height: 55,
                elements: [
                    {view: "button", type: "icon", icon: "bars",
                        width: 37, align: "left", css: "app_button", click: function () {
                            $$("$sidebar1").toggle()
                        }
                    },
                    {view: "label", template: "<img src='images/logo.png'></img>", width: 150},
                    {view: "label", template: "<span class='main_title'>Entryshipment</span>"}, {},                    
                    {view: "button",type: "image", image:"images/place_red.png", label:"Menu", width:80,popup: "my_menu" },
                    {view: "button",type: "image", image:"images/place_blue.png", label:"Account", popup: "my_menu",width:100 },
                    {view: "button",type: "image", image:"images/place_green.png", label:"Setting",width:100}
                ]
            };
            var ui = {
                type: "space",
                rows: [
                    //Toolbar
                    webix.copy(toolbar),
                    //Body
                    {
                        autoheight: false,
                        //  type: "wide",
                        cols: [webix.copy(left_container2), webix.copy(right_container)]
                    }
                ]
            };
            webix.ui({
                id: "window_entryshipment",
                view: "window",
                width: 750,
                height: 400,
                position: "center",
                move: true,
                resize: true,
                head: {
                    view: "toolbar", margin: -4, cols: [
                        {view: "label", label: "Input Entryshipment"},
                        {view: "icon", icon: "times-circle", align: "left",
                            click: "$$('windowcontrol').hide();"}

                    ]
                }
                , body: {
                    view: "scrollview",
                    body: webix.copy(form_entryshipment)
                }
            });
            load_vehicle = function () {
                vehicles = new webix.DataCollection({url: "scripts/load_gps.php"});
                vehicles.attachEvent("onAfterLoad", function () {
                    var options = [];
                    vehicles.data.each(function (obj) {
                        options.push({id: obj.id, value: obj.real_name});
                    });
                    var combo = $$("cboUser");
                    combo.define("options", options);
                    combo.refresh();
                });
            };
            load_user = function () {
                users = new webix.DataCollection({url: "scripts/combo_user.php"});
                users.attachEvent("onAfterLoad", function () {
                    var options = [];
                    users.data.each(function (obj) {
                        options.push({id: obj.id, value: obj.real_name});
                    });
                    var combo = $$("cboUser");
                    combo.define("options", options);
                    combo.refresh();
                });
            };
            webix.ready(function () {
                webix.ui({
                    view: "popup",
                    id: "my_menu",
                    head: "Submenu",
                    width: 300,
                    body: {
                        id: "list_menu",
                        view: "list",
                        data: [{id: "Map", name: "Map", location: "Map"},
                            {id: "Vehicle", name: "Vehicle", location: "Vehicle"},
                            {id: "Orders", name: "Orders", location: "Orders"},
                            {id: "Users", name: "Users", location: "Users"}
                        ],
                        datatype: "json",
                        template: "#name# - #location#",
                        autoheight: true,
                        select: true
                    }
                });
                
                $$("list_menu").attachEvent("onAfterSelect", function (id) {
                    console.log(id);
                    switch (id) {
                        case "Map":
                             $$("multiview").setValue("mv_map");
                            break;
                        case "Vehicle":
                            break;
                        case "Orders":
                             $$("multiview").setValue("mv_orders");
                            break;
                        case "Users":
                            break;
                    }
                    $$("list_menu").hide();
                });
                
                webix.ui(ui);
                webix.ui({
                    view: "contextmenu",
                    data: ["Add", "Rename", "Delete", {$template: "Separator"}, "Info"],
                    master: "demo_context",
                    on: {
                        onItemClick: function (id) {
                            webix.message(this.getItem(id).value);
                        }
                    }
                });

                load_user();
                
                $$("cboUser").attachEvent("onChange", function (node) {
                    console.log(node);
                    console.log($$("cboUser").getValue() + "-" + $$("cboUser").getText());
                    console.log($$("cboUser").getPopup().collection);
                    //console.log( $$("cboUser").getNode());
                });
                
            });

        </script>
    </body>
</html>