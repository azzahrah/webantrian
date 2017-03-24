<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="codebase/skins/compact.css" type="text/css" media="screen" charset="utf-8">
        <script src="codebase/webix.js" type="text/javascript" charset="utf-8"></script>

        <title>Compact skin</title>
        <script type="text/javascript" src="samples/common/testdata.js"></script>
        <script type="text/javascript" src="samples/common/treedata.js"></script>
        <style>
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
        </style>
    </head>
    <body>

        <script type="text/javascript">

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
                view: "scrollview",
                width: 400,
                multi: true,
                body: {
                    rows: [
                        {
                            head: {
                                view: "toolbar", margin: -4, cols: [
                                    {view: "label", label: "This window can be closed"},
                                    {view: "icon", icon: "question-circle",
                                        click: "webix.message('About pressed')"},
                                    {view: "icon", icon: "times-circle",
                                        click: "$$('mywindow').hide();"}
                                ]
                            },
                            body: {
                                view: "form", elements: [
                                    {view: "combo", labelWidth: 120, label: "Select User", suggest: "cities", placeholder: "Select departure point"},
                                    {view: "text", labelWidth: 120, label: "Total Vehicle", suggest: "cities", value: "20", placeholder: "Select destination"}
                                ]
                            }
                        },
                        {
                            height: 300,
                            header: "Vehicles",
                            body: {
                                rows: [
                                    {
                                        view: "toolbar",
                                        elements: [
                                            {view: "text", value: "Search", width: 120},
                                            {view: "button", value: "All=160"},
                                            {view: "button", value: "On=100", type: "form"},
                                            {view: "button", value: "Off=60", type: "danger"}
                                        ]
                                    },
                                    {
                                        view: "tree",
                                        borderless: true,
                                        id: "treeVehicle",
                                        select: true,
                                        data: webix.copy(carsdata)
                                    }
                                ]

                            }
                        },
                        {
                            header: "Book a Flight", body: {
                                rows: [
                                    {
                                        view: "form", elements: [
                                            {view: "radio", labelWidth: 120, id: "radio1", value: 1, options: [{id: 1, value: "One-Way"}, {id: 2, value: "Return"}], label: "Trip"},
                                            {view: "combo", labelWidth: 120, label: "From", suggest: "cities", placeholder: "Select departure point"},
                                            {view: "combo", labelWidth: 120, label: "To", suggest: "cities", placeholder: "Select destination"},
                                            {view: "datepicker", labelWidth: 120, label: "Departure Date", value: new Date(), format: "%d  %M %Y"},
                                            {view: "datepicker", labelWidth: 120, id: "datepicker2", label: "Return Date", value: new Date(), format: "%d  %M %Y", hidden: true},
                                            {view: "checkbox", labelWidth: 120, id: "flexible", value: 0, label: "Flexible dates"},
                                            {
                                                cols: [
                                                    {view: "label", value: "Passengers", labelWidth: 130},
                                                    {view: "counter", labelPosition: "top", label: "Adults", value: 1, min: 1},
                                                    {view: "counter", labelPosition: "top", label: "Children"}
                                                ]
                                            }


                                        ]
                                    },
                                    {
                                        padding: 20,
                                        css: "blue_row",
                                        rows: [
                                            {view: "button", type: "form", value: "Book Now", align: "center", css: "blue_row", height: 50}
                                        ]
                                    }

                                ]
                                ,
                                elementsConfig: {
                                    labelWidth: 100, labelAlign: "left"
                                }
                            }},
                        {header: "Hotels", collapsed: true, body: {
                                rows: [
                                    {view: "form", elements: [
                                            {view: "text", label: "Where", labelPosition: "top", placeholder: "Destination e.g. city, hotel name"},
                                            {
                                                cols: [
                                                    {view: "datepicker", label: "Check In", labelPosition: "top", value: new Date(), format: "%d  %M %Y"},
                                                    {view: "datepicker", label: "Check Out", labelPosition: "top", value: webix.Date.add(new Date(), 1, "day"), format: "%d  %M %Y"}
                                                ]
                                            }
                                        ],
                                        elementsConfig: {labelAlign: "left"}
                                    },
                                    {
                                        padding: 20,
                                        css: "blue_row",
                                        rows: [
                                            {view: "button", type: "form", value: "Search", align: "center", css: "blue_row", height: 50}
                                        ]
                                    }
                                ]

                            }},
                        {header: "Cars", collapsed: true, body: {
                                rows: [
                                    {view: "form",
                                        elements: [
                                            {view: "text", label: "Where", labelPosition: "top", placeholder: "Location e.g. country, city"},
                                            {
                                                cols: [
                                                    {view: "datepicker", label: "I'm picking up the car on", labelPosition: "top", value: new Date(), format: "%d  %M %Y"},
                                                    {width: 20},
                                                    {view: "richselect", label: "&nbsp;", labelPosition: "top", value: "09", options: hours, width: 75},
                                                    {view: "richselect", label: "&nbsp;", labelPosition: "top", value: "00", options: minutes, width: 75}
                                                ]
                                            },
                                            {
                                                cols: [
                                                    {view: "datepicker", label: "I'm returning the car on", labelPosition: "top", value: new Date(), format: "%d  %M %Y"},
                                                    {width: 20},
                                                    {view: "richselect", label: "&nbsp;", labelPosition: "top", value: "09", options: hours, width: 75},
                                                    {view: "richselect", label: "&nbsp;", labelPosition: "top", value: "00", options: minutes, width: 75}
                                                ]
                                            }
                                        ],
                                        elementsConfig: {labelAlign: "left"}
                                    },
                                    {
                                        padding: 20,
                                        css: "blue_row",
                                        rows: [
                                            {view: "button", type: "form", value: "Search", align: "center", css: "blue_row", height: 50},
                                            {css: "blue_row"}
                                        ]
                                    }
                                ]

                            }},
                        {header: "Register", css: "registration", collapsed: true, body: {
                                rows: [
                                    {
                                        view: "form", elements: [
                                            {view: "text", label: "First Name", placeholder: "Matthew"},
                                            {view: "text", label: "Last Name", placeholder: "Clark"},
                                            {view: "text", label: "Email", placeholder: "mattclark@some.com"},
                                            {view: "text", label: "Login", placeholder: "Matt"},
                                            {view: "text", label: "Password", type: "password", placeholder: "********"},
                                            {view: "text", label: "Confirm Password", type: "password", placeholder: "********"}
                                        ],
                                        elementsConfig: {labelAlign: "left", labelWidth: 140}
                                    },
                                    {
                                        padding: 20,
                                        css: "blue_row",
                                        rows: [
                                            {view: "button", type: "form", value: "Register", align: "center", css: "blue_row", height: 50},
                                            {css: "blue_row"}
                                        ]
                                    }
                                ]

                            }}, {}
                    ]
                }

            };


            var right_container = {
                gravity: 3,
                type: "clean",
                rows: [
                    {
                        view: "tabbar", multiview: true, selected: "gMap", options: [
                            {id: "gMap", value: "Google Map", width: 150},
                            {id: "sOffers", value: "Special offers", width: 150},
                            {id: "regular", value: "Regular", width: 150},
                            {id: "flightInfo", value: "Flight Info", width: 150}
                        ]
                    },
                    {
                        view: "multiview",
                        cells: [
                            {
                                id: "gMap",
                                type: "wide",
                                rows: [
                                    {
                                        id: "map",
                                        view: "google-map",
                                        key: "AIzaSyCobdKM8bzMG6EcmwE0ZSpz68z6JEgLGMY",
                                        zoom: 6,
                                        center: [-7.373783, 112.4747848]
                                    },
                                    {
                                        //Tabs
                                        rows: [{
                                                header: "Vehicle Info",
                                                view: "tabbar", multiview: true, selected: "tbl_vehicle",
                                                options: [
                                                    {id: "tbl_vehicle", value: "Summary", width: 150},
                                                    {id: "tbl_alarm", value: "Events", width: 150}
                                                ]
                                            }, {
                                                view: "multiview",
                                                cells: [{
                                                        id: "tbl_vehicle",
                                                        view: "datatable",
                                                        columns: [
                                                            {id: "id", header: "#", width: 40},
                                                            {id: "tdate", header: "Date", width: 150, sort: "date", format: webix.i18n.longDateFormatStr},
                                                            {id: "nopol", header: [{content: "textFilter", value: "Search Vehicle"}], width: 120, fillspace: false},
                                                            {id: "speed", header: "Speed", width: 95, sort: "int", format: webix.i18n.priceFormat},
                                                            {id: "alarm", header: "Alarm", width: 95, sort: "int", format: webix.i18n.priceFormat},
                                                            {id: "address", header: "Address", width: 65, sort: "int"},
                                                            {id: "acc", header: "Status", css: "webix_el_button", width: 100, template: "<a href='javascript:void(0)' class='check_flight'>Book now</a>"}
                                                        ]
                                                    }, {
                                                        id: "tbl_alarm",
                                                        view: "datatable",
                                                        columns: [
                                                            {id: "id", header: "#", width: 40},
                                                            {id: "tdate", header: "Date", width: 150, sort: "date", format: webix.i18n.longDateFormatStr},
                                                            {id: "nopol", header: [{content: "textFilter", value: "Search Vehicle"}], width: 120, fillspace: false},
                                                            {id: "speed", header: "Speed", width: 95, sort: "int", format: webix.i18n.priceFormat},
                                                            {id: "alarm", header: "Alarm", width: 95, sort: "int", format: webix.i18n.priceFormat},
                                                            {id: "address", header: "Address", width: 65, sort: "int"},
                                                            {id: "acc", header: "Status", css: "webix_el_button", width: 100, template: "<a href='javascript:void(0)' class='check_flight'>Book now</a>"}
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]

                                    }

                                ]

                            },
                            {
                                id: "sOffers",
                                view: "datatable", select: true,
                                columns: [
                                    {id: "id", header: "#", width: 40},
                                    {id: "direction", header: "Direction", fillspace: true},
                                    {id: "date", header: "Date", width: 150, sort: "date", format: webix.i18n.longDateFormatStr},
                                    {id: "price", header: "Price", width: 95, sort: "int", format: webix.i18n.priceFormat},
                                    {id: "save", header: "You save", width: 95, sort: "int", format: webix.i18n.priceFormat},
                                    {id: "places", header: "Tickets", width: 65, sort: "int"},
                                    {id: "book", header: "Booking", css: "webix_el_button", width: 100, template: "<a href='javascript:void(0)' class='check_flight'>Book now</a>"}
                                ],
                                data: offers,
                                onClick: {
                                    "check_flight": function () {
                                        return false;
                                    }
                                }
                            },
                            {
                                id: "regular",
                                view: "list",
                                select: true,
                                template: "#id#. #direction#",
                                data: offers,
                                onClick: {
                                    "check_flight": function () {
                                        return false;
                                    }
                                }
                            },
                            {
                                id: "flightInfo",
                                rows: [
                                    {
                                        view: "form",
                                        cols: [
                                            {
                                                type: "form",
                                                borderless: true,
                                                width: 550,
                                                rows: [
                                                    {
                                                        cols: [
                                                            {view: "text", labelPosition: "top", label: "Flight number", placeholder: "Enter flight No."},
                                                            {width: 40},
                                                            {}
                                                        ]
                                                    },
                                                    {
                                                        view: "label",
                                                        label: "-- or --",
                                                        align: "left"
                                                    },
                                                    {
                                                        cols: [
                                                            {view: "combo", labelPosition: "top", label: "From", suggest: "cities", placeholder: "Select departure point"},
                                                            {width: 40},
                                                            {view: "combo", labelPosition: "top", label: "To", suggest: "cities", placeholder: "Select destination"}
                                                        ]
                                                    },
                                                    {inputWidth: 100, view: "button", type: "form", value: "Search", align: "left"}
                                                ]
                                            },
                                            {}

                                        ]
                                    },
                                    {
                                        view: "datatable", select: true,
                                        columns: [
                                            {id: "from", header: "From", width: 150, sort: "string"},
                                            {id: "to", header: "To", width: 150, sort: "string"},
                                            {id: "depart", header: "Depart", width: 110, sort: "int"},
                                            {id: "arrive", header: "Arrive", width: 110, sort: "int"},
                                            {id: "status", header: "Status", fillspace: true, sort: "string"}
                                        ],
                                        data: info
                                    }
                                ]

                            }
                        ]
                    }
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
            var toolbar = {view: "toolbar",
                height: 55,
                elements: [
                    {view: "label", template: "<span class='main_title'>GPS Tracking System</span>"}, {},
                    {view: "icon", width: 40, icon: "info-circle"},
                    {id:"demo_menu", view: "icon", width: 40, icon: "comments"},
                    {view: "icon", width: 40, icon: "cog", click: function () {
                            showForm("windowcontrol");
                        }
                    }
                    //popup: "mywindow"}

                ]
            };
            var ui = {
                view: "scrollview",
                body: {
                    type: "space",
                    rows: [
                        //Toolbar
                        webix.copy(toolbar)
                                ,
                        //Body
                        {
                            autoheight: true, type: "wide", cols: [left_container, right_container]
                        }
                    ]
                }

            };


            webix.ready(function () {
                webix.ui(ui);
                var menu = webix.ui({
                    view: "context",
                    body:
                            {view: "toolbar", cols: [
                                    {view: "button", value: "Button1", width: 100},
                                    {view: "button", value: "Button2", width: 100}
                                ]
                            },
                    width: 300,
                    master: "demo_menu"
                });
                $$("radio1").attachEvent("onChange", function (newv, oldv) {
                    if (newv == 2)
                        $$("datepicker2").show();
                    else
                        $$("datepicker2").hide();
                });
            });

        </script>
    </body>
</html>