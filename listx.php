<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="codebase/webix.css" type="text/css" media="screen" charset="utf-8">
        <script src="codebase/webix.js" type="text/javascript" charset="utf-8"></script>
        <title>List</title>
    </head>
    <style type="text/css">
        .custom_item{
            height:auto;
            width: 600px;
            text-align: left;
            border-bottom:1px solid #009966;
            border-radius:4px;
            background-color:#ffffee;
            padding:10px;

        }
        .newtime{
            background-color:#DDFFDD;
        }
        .oldtime{
            background-color:#DDDDFF;
        }
        .oldtime, .newtime{
            border-radius:4px;
        }
        .menikah{
            border-radius:4px;
            background-color:blue;
            color:white;
            right:10px;
            float:right;
            width:100px;
            text-align: center;
        }
        .belum_menikah{
            border-radius:4px;
            background-color:red;
            color:white;
            float:right;
            width:100px;
            text-align: center;
        }
        .acc_on{
            border-radius:4px;
            background-color:blue;
            color:white;
            right:10px;
            float:right;
            width:60px;
            text-align: center;
            margin-left: 3px;
        }
        .acc_off{
            border-radius:4px;
            background-color:red;
            color:white;
            float:right;
            width:60px;
            text-align: center;
            margin-left: 3px;
        }
    </style>
    <body>
        <script type="text/javascript" charset="utf-8">
            var datax = [
                {id: 1, acc: 1, nopol: "Joko", address: "Kebonsari Baru Selatan III/23 Kebonsari Baru Selatan III/23 Kebonsari Baru Selatan III/23 Kebonsari Baru Selatan III/23 Kebonsari Baru Selatan III/23 Kebonsari Baru Selatan III/23 Kebonsari Baru Selatan III/23", status: 1},
                {id: 2, acc: 1, nopol: "Lilis Sugijanti", address: "Kebonsari Baru Selatan III/23", status: 1},
                {id: 3, acc: 0, nopol: "Salsabilla Putri Pitoyo", address: "Kebonsari Baru Selatan III/23", status: 0},
                {id: 4, acc: 1, nopol: "Tazkiyah Arrosyidah", address: "Kebonsari Baru Selatan III/23", status: 0},
                {id: 5, acc: 0, nopol: "Attiqah Sumayyah Azzahrah", address: "Kebonsari Baru Selatan III/23", status: 0},
                {id: 6, acc: 1, nopol: "Rinddi", address: "Kebonsari Baru Selatan III/23", status: 0},
                {id: 7, acc: 0, nopol: "Krisna", address: "Kebonsari Baru Selatan III/23", status: 0},
                {id: 8, acc: 1, nopol: "UUS", address: "Kebonsari Baru Selatan III/23", status: 0},
                {id: 9, acc: 0, nopol: "Fathur", address: "Kebonsari Baru Selatan III/23", status: 0},
                {id: 10, acc: 1, nopol: "Endang Irijanti", address: "Kebonsari Baru Selatan III/23", status: 0},
                {id: 11, acc: 0, nopol: "Sutrisno", address: "Kebonsari Baru Selatan III/23", status: 0}
            ];
//            webix.ui({
//                view: "list",
//                width: 320,
//                height: 600,
//                select: true,
//                autoheight: true,
//                multiline: true,
//                template: "{common.itemIcon()} #nama#. {common.itemDescr()}",
//                type: {
//                    itemHeight: 60,
//                    itemIcon: function (obj) {
//                        if (obj.status == 1) {
//                            return "<span class='webix_icon fa-film'></span>";
//                        }
//                        return "<span class='webix_icon fa-save'></span>";
//                    },
//                    itemDescr: function (obj) {
//                        return "<span>" + obj.alamat + "</span>";
//                    }
//                },
//                data: data
//            });
            var ui = {
                rows: [{
                        cells: [
                            {
                                //List GPS
                                id: "list",
                                rows: [
                                    {view: "toolbar", items: [
                                            {view: "text", value: "searcj"}
                                        ]
                                    },
                                    {
                                        view: "list",
                                        height: 600,
                                        template: "{common.customRender()}",
                                        type: {
                                            itemIcon: function (obj) {
                                                if (obj.status == 1) {
                                                    return "<img src='images/car_on.gif'>";
                                                }
                                                return "<img src='images/car_off.gif'>";
                                            },
                                            templateStart: "<div style='border-bottom:1px solid #000000;margin:3px;'>",
                                            template: "<div>{common.itemIcon()}.<b> #nama# </b></div></br> <div style='text-align:left;'>#alamat#</div>",
                                            templateEnd: "</div>"

                                        },
                                        data: data
                                    }
                                ]
                            },
                            {
                                //Map GPS
                                id: "map",
                                rows: [{
                                        view: "toolbar",
                                        items: [
                                            {view: "text", value: "searcj"}
                                        ]
                                    },
                                    {
                                        id: "gMap",
                                        template: ""
                                    }
                                ]
                            },
                            {
                                //Alarm GPS
                                id: "alarm",
                                rows: [{
                                        view: "toolbar",
                                        items: [
                                            {view: "text", value: "searcj"}
                                        ]
                                    },
                                    {
                                        template: ""
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        view: "tabbar", multiview: true,
                        options: [
                            {id: "list", value: "List"},
                            {id: "map", value: "Map"},
                            {id: "alarm", value: "Alarm"}
                        ]
                    }
                ]
            };
            var tabs = {
                rows: [
                    {
                        cells: [
                            {
                                id: "list",
                                rows: [
                                    {
                                        view: "toolbar",
                                        elements: [
                                            {view: "text", value: "search"}
                                        ]
                                    }
                                ]
                            }, {
                                id: "map",
                                rows: [
                                    {
                                        view: "toolbar",
                                        elements: [
                                            {view: "text", value: "search"}
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        view: "tabbar", multiview: true,
                        options: [
                            {id: "list", value: "List"},
                            {id: "map", value: "Map"},
                            {id: "alarm", value: "Alarm"}
                        ]
                    }
                ]
            };
            webix.ui.fullScreen();
            var tabbar = {
                view: "tabbar", type: "bottom", multiview: true, options: [
                    {value: "<span class='webix_icon fa-film'></span><span style='padding-left: 4px'>List</span>", id: 'listView'},
                    {value: "<span class='webix_icon fa-comments'></span><span style='padding-left: 4px'>Form</span>", id: 'formView'},
                    {value: "<span class='webix_icon fa-info'></span><span style='padding-left: 1px'>About</span>", id: 'aboutView'}
                ], height: 50
            };
            var data = {
                cells: [
                    {
                        id: "listView",
                        rows: [
                            {
                                view: "toolbar",
                                elements: [
                                    {id:"txtSearchVehicle", view: "text", value: "Search", onChange: function (newv, oldv) {
                                            console.log(newv);
                                            console.log(oldv);
                                        }
                                    },
                                    {view: "button", value: "Cut", width: 100},
                                    {view: "button", value: "Resume", width: 100}
                                ]
                            },
                            {
                                view: "list",
                                template: "#id#. #nama# {common.itemAcc()} {common.itemIcon()} <div style='padding-left:18px'> Year:#alamat#, votes:#votes# </div>",
                                type: {
                                    height: 60,
                                    itemIcon: function (obj) {
                                        return obj.status == 1 ? "<span class='menikah'>Nikah</span>" : "<span class='belum_menikah'>Belum Nikah</span>";
                                    },
                                    itemAcc: function (obj) {
                                        return obj.acc == 1 ? "<span class='acc_on'>ON</span>" : "<span class='acc_off'>OFF</span>";
                                    }
                                },
                                select: true,
                                data: datax
                            }
                        ]
                    },
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

            webix.ui({
                rows: [
                    data,
                    tabbar
                ]
            });
            $$("txtSearchVehicle").attachEvent("onChange", function (newv, oldv) {
                $$("listVehicle").filter("#nopol#",newv);
            });

//            var cells = [
//                {header: "<span class='webix_icon fa-film'></span>List", body: {
//                        view: "list",
//                        template: "#rank#. #title# <div style='padding-left:18px'> Year:#year#, votes:#votes# </div>",
//                        type: {
//                            height: 60
//                        },
//                        select: true,
//                        data: datax
//                    }},
//                {header: "<span class='webix_icon fa-comments'></span>Form", body: {
//                        template: "Place for the form control"
//                    }},
//                {header: "<span class='webix_icon fa-info'></span>About", body: {
//                        template: "About the app"
//                    }}
//            ];

//            webix.ui({
//                view: "tabview",
//                cells: cells
//            });


        </script>
    </body>
</html>