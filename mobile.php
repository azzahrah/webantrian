
<!DOCTYPE html>
<html>
    <head>
        <title>Demo</title>
        <meta charset="utf-8">
        <meta  name = "viewport" content = "initial-scale = 1.0, maximum-scale = 1.0, user-scalable = no">
        <link rel="stylesheet" href="codebase/skins/touch.css" type="text/css" media="screen" charset="utf-8">
        <script src="codebase/webix.js" type="text/javascript" charset="utf-8"></script>
    </head>
    <body>
        <script>
            var vehicleData = [
                {id: 1, acc: 1, imei: '4534893894', nopol: 'L-123-KK', speed: '12Km/Jam', tdate: '2016-10-10', status: 'car_on.png', address: "kebonsari baru selatan III/23, Jambangan, Surabaya"},
                {id: 2, acc: 0, imei: '45654564', nopol: 'M-123-KK', speed: '12Km/Jam', tdate: '2016-10-10', status: 'car_off.png', address: "Surabaya Selatan iiidddddddddddd dfksdklfklsd dfkal;sdkl;fal; dl;fal;sdfl;s;d"},
                {id: 3, acc: 1, imei: '788675656', nopol: 'K-123-43', speed: '12Km/Jam', tdate: '2016-10-10', status: 'car_on.png', address: "Surabaya Selatan iiidddddddddddd dfksdklfklsd dfkal;sdkl;fal; dl;fal;sdfl;s;d"}
            ];
            var appui = {
                rows: [
                    {
                        view: "multiview",
                        cells: [
                            {
                                id: "vehicle",
                                rows: [
                                    {
                                        view: "toolbar",
                                        elements: [
                                            {view: "text", value: "Search"}
                                        ]
                                    },
                                    {
                                        view: "list",
                                        template: "#nopol# #tdate#",
                                        data: vehicleData
                                    }
                                ]
                            },
                            {
                                id: "map",
                                view: "google-map",
                                key: "AIzaSyCobdKM8bzMG6EcmwE0ZSpz68z6JEgLGMY",
                                zoom: 6,
                                center: [-7.373783, 112.4747848]

                            },
                            {
                                id: "alarm",
                                view: "list",
                                template: "#nopol# #tdate#",
                                data: vehicleData
                            }
                        ]
                    },
                    {
                        view: "tabbar",
                        type: "iconTop",
                        multiview: true,
                        tabMinWidth: 80,
                        options: [
                            {id: "vehicle", icon: "flag-o", value: "Personal"},
                            {id: "map", icon: "flag-o", value: "Google Map"},
                            {id: "alarm", icon: "bar-chart-o", value: "Chart"}
                        ]
                    }
                ]
            };
            webix.ready(function () {
                webix.ui.fullScreen();
                webix.ui(appui);
                webix.Touch.enable();
                webix.$$("$multiview1").attachEvent("onSwipeX", function (context0, context1) {
                    var delta = context1.x - context0.x;
                    if(this.getActiveId()=='map'){
                        return;
                    }
                    var index = this.index(webix.$$(this.getActiveId()));
                    var options = webix.$$("$tabbar1").config.options;
                    index += (delta < 0 ? 1 : -1);
                    
                    
                    if (options[index]) {
                        webix.$$("$tabbar1").setValue(options[index].id);
                    }
                });
            });
        </script>       
    </body>
</html>