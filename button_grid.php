
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="codebase/webix.css?v=4.0.14" type="text/css" charset="utf-8">
        <script src="codebase/webix.js?v=4.0.14" type="text/javascript" charset="utf-8"></script>

        <title>Datatable: Custom Handler</title>
        <link rel="stylesheet" type="text/css" href="css/samples.css">
        <script src="js/testdata.js" type="text/javascript" charset="utf-8"></script>
    </head>
    <body>
        <div class="header_comment">Using events</div>
        <div class="sample_comment">The sample shows how to use events.</div>
        <div class="sample_comment">Click anywhere in the table. Check the console, for more detailed log.</div>
        <div id="testA"></div>
        <div id="testB"></div>
        <script type="text/javascript" charset="utf-8">
            webix.ready(function () {
                webix.protoUI({
                    name: "activeTable"
                }, webix.ActiveContent, webix.ui.datatable);
                
                webix.ui({
                    rows: [{
                            id: "tbl_last_position",
                            borderless: true, data: [{}],
                            view: "activeTable", select: true,
                            activeContent: {
                                deleteButton: {
                                    id: "deleteButtonId",
                                    view: "button",
                                    type:"danger",
                                    label: "Delete",
                                    width: 120
                                },
                                editButton: {
                                    id: "editButtonId",
                                    view: "button",
                                    label: "Edit",
                                    width: 80
                                },
                                markCheckbox: {
                                    view: "checkbox"
                                }
                            },
                            columns: [
                                {id: "id", header: "#", width: 60},
                                {id: "nopol", header: [{content: "textFilter", placeholder: "Search Nopol"}], width: 130},
                                {id: "tdate", header: "Date", width: 125},
                                {id: "speed", header: "Speed", width: 100},
                                {id: "address", header: "Address", width: 300},
                                {id: "vh_id", header: "Action", template: "<div class='buttons'>{common.deleteButton()}</div>", width: 130}
                            ],
                            data:[
                                {id:"1",nopol:"L-1333-KK"},
                                {id:"2",nopol:"L-1333-KK"},
                                {id:"3",nopol:"L-1333-KK"},
                                {id:"4",nopol:"L-1333-KK"},
                                {id:"5",nopol:"L-1333-KK"},
                                {id:"6",nopol:"L-1333-KK"},
                                {id:"7",nopol:"L-1333-KK"}
                                
                            ]
                        }
                    ]});
                return;
                
                grid = webix.ui({
                    container: "testA",
                    view: "datatable",
                    columns: [
                        {id: "rank", header: "", css: "rank", width: 50},
                        {id: "title", header: "Film title", width: 200},
                        {id: "year", header: "Released", width: 80},
                        {id: "votes", header: "Votes", width: 100},
                        {id: "",
                            template: "<input class='delbtn' type='button' value='Delete'>",
                            css: "padding_less",
                            width: 100},
                        {id: "",
                            template: "<input class='addbtn' type='button' value='Add'>",
                            css: "padding_less",
                            width: 100}
                    ],
                    select: "cell",
                    autoheight: true,
                    autowidth: true,
                    data: small_film_set,
                    on: {
                        "onItemClick": function (id, e, trg) {
                            //id.column - column id
                            //id.row - row id
                            webix.message("Click on row: " + id.row + ", column: " + id.column);
                        }
                    }
                });


                grid.on_click.delbtn = function (e, id, trg) {
                    //id.column - column id
                    //id.row - row id
                    webix.message("Delete row: " + id);
                    //block default onclick event
                    return false;
                };
                grid.on_click.addbtn = function (e, id, trg) {
                    //id.column - column id
                    //id.row - row id
                    webix.message("Add row: " + id);
                    //block default onclick event
                    return false;
                };
            });
        </script>
    </body>
</html><script src='https://cdn.ravenjs.com/2.1.0/raven.min.js'></script><script>Raven.config('https://50e7233181284483abcbf6688b0505b5@app.getsentry.com/68752', {release: '4.0.14'}).install();</script>
