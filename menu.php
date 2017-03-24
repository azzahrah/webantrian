
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="codebase/skins/compact.css" type="text/css" media="screen" charset="utf-8">
        <script src="codebase/webix.js" type="text/javascript" charset="utf-8"></script>
        <style>
            #areaA, #areaB{
                margin: 50px;
                width:700px; height:100px;
            }
            .blue.webix_menu-x{
                background:#3498DB;
            }
            .webix_menu-x .webix_list_item{
               line-height:30px;
            }
            .place {
                background: url(images/place.png);                
            }
        </style>
        <title>Menu in Toolbar</title>
    </head>
    <body>
        <script type="text/javascript" charset="utf-8">
            var menu_data = [
                {id: "1", value: "Translate...",css:"place", submenu: [
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
                width: 300,
                height:55,
                view: "menu",
                data: menu_data,
                css: "blue"
            };
            var toolbar = {
                height:100,
                view: "toolbar", paddingY: 0, elements: [
                    {view: "text", width: 120, align: "left"},
                    {},
                    {view: "button", label: "Search", width: 100}
                ]
            };


            webix.ui({
                rows: [
                    {type: "clean", cols: [toolbar, menu]},
                    {template: "Some content"}
                ]
            });
        </script>
    </body>
</html><script src='https://cdn.ravenjs.com/2.1.0/raven.min.js'></script><script>Raven.config('https://50e7233181284483abcbf6688b0505b5@app.getsentry.com/68752', {release: '4.0.8'}).install();</script>
