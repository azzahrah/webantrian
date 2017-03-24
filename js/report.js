var icons = [];
icons['PARK'] = 'park.png';
icons['ALARM'] = 'alarm.png';

var report = {
    id: 0,
    active: null,
    json: null,
    tracks: [],
    name: "report",
    debug: false, //comment for production

    init: function () {
        webix.ui(ui);
        report.trigger("initData");
    },
    trigger: function (name) {
        report.callEvent(name, arguments);
    },
    on: function (name, code) {
        report.attachEvent(name, code);
    },
    buttons: {
        download: null,
        download_excel: null
    },
    utils: {}
};
webix.extend(report, webix.EventSystem);
var playback = {
    index: 0,
    timer: null,
    paused: false,
    speed: 1000,
    marker: null,
    markers: [],
    vh_id: 0,
    iw: null,
    button: null,
    tracks: []
};
playback.clear = function () {
    console.log('playback.clear');
    playback.clear_markers();
    try {
        if (playback.marker) {
            playback.marker.setMap(null);
        }
    } catch (e) {
    }
    try {
        if (playback.polyline) {
            playback.polyline.setMap(null);
        }
    } catch (e) {
    }
    try {
        playback.tracks = [];
        playback.tracks.length = 0;
    } catch (e) {
    }
    report.json = null;
};
playback.clear_markers = function () {
    console.log('playback.clear_markers');
    for (var i in playback.markers) {
        if (playback.markers[i]) {
            console.log("Clear");
            playback.markers[i].setMap(null);
        }
    }
    playback.markers = [];
    playback.markers.length = 0;


};
playback.loop = function () {
    console.log('playback.loop');
    if (playback.timer)
        clearTimeout(playback.timer);
    if (playback.index > playback.tracks.length) {
        webix.message({type: "error", text: "Finish"});
        return;
    }
    var v = playback.tracks[playback.index++];
    console.log(v.tdate + '-' + v.lat + ',' + v.lng);
    var latLng = new google.maps.LatLng(parseFloat(v.lat), parseFloat(v.lng));
    playback.marker.setPosition(latLng);
    playback.marker.setIcon(util.create_icon(v.angle, v.status));
    playback.timer = setTimeout('playback.loop()', playback.speed);
};
playback.create_marker = function (v) {
    // var icon = (v.icon_map == 'panah') ? util.create_icon(v.angle, v.status) : util.create_icon_object(v.icon);
    var latLng = new google.maps.LatLng(parseFloat(v.lat), parseFloat(v.lng));
    var m = new google.maps.Marker({
        position: latLng,
        map: playback.map
                //,icon: icon
    });
    google.maps.event.addListener(m, 'click', function () {
        playback.marker = m;
        playback.vh_id = v.vh_id;
        if (playback.iw != undefined)
            playback.iw.setMap(null);
        playback.iw = new google.maps.InfoWindow({content: util.create_infowindow(v)});
        playback.iw.setPosition(latLng);
        playback.iw.open(playback.map, m);
    });
    return m;
};
report.on("parse_trip", function () {
    var total = 0;
    var total_speed = 0;
    var speed_count = 0;
    var avg_speed = 0;
    try {
        total = parseInt(report.json.total, 10);
        if (total <= 0) {
            webix.message({type: "error", text: "Data Kosong\r\n" + report.json.msg});
            return;
        }
    } catch (e) {
        console.log(e);
        webix.message({type: "error", text: e});
        return;
    }
    try {
        total_dist = report.json.dist;
    } catch (e) {
        console.log(e);

    }


    var path = [];
    for (var i in report.json.data) {
        var item = report.json.data[i];
        path.push(new google.maps.LatLng(parseFloat(item.lat), parseFloat(item.lng)));
        item['status'] = parseInt(item.acc, 10) === 1 ? 'on' : 'off';
        var speed = parseInt(item.speed);
        if (isNaN(speed) === false) {
            if (speed >= 2) {
                total_speed += speed;
                speed_count++;
            }
        }
        if (item.park != '') {
            console.log('create_marker_park');
            var mp = playback.create_custom_marker(item, 'park.png');
            playback.markers.push(mp);
        }
        playback.tracks.push(item);
    }


    //Create Polyline
    playback.polyline = new google.maps.Polyline({
        path: path,
        map: playback.map,
        strokeColor: "#9797ff",
        strokeOpacity: 0.7,
        strokeWeight: 5
    });
    //Create Marker
    playback.marker = playback.create_marker(playback.tracks[0]);
    playback.map.setCenter(playback.marker.getPosition());
    playback.map.setZoom(16);

    webix.message({type: "error", text: "Total:" + playback.tracks.length});
    //Show Datagrid
    $$(report.active.tbl).parse(playback.tracks);

    avg_speed = total_speed / speed_count;
    //playback.polyline.getPath().getArray()
    var total_distance = google.maps.geometry.spherical.computeLength(path) / 1000;
    $$("form_summary").setValues({
        total_distance: total_distance.toLocaleString() + "Km",
        avg_speed: avg_speed.toLocaleString() + "Km/Jam",
        total_cost: 0,
        total_bbm: 0
    });
    //$$("page_summary").show();
});
report.on("parse_alarm", function () {
    var total = 0;
    try {
        // console.log(report.json);
        total = parseInt(report.json.total, 10);
        if (total <= 0) {
            webix.message({type: "error", text: "Data Kosong"});
            return;
        }
    } catch (e) {
        console.log(e);
        webix.message({type: "error", text: e});
        return;
    }

    for (var i in report.json.data) {
        var item = report.json.data[i];
        item['status'] = parseInt(item.acc, 10) === 1 ? 'on' : 'off';
        var mp = playback.create_custom_marker(item, 'place_red.png');
        playback.markers.push(mp);
        playback.tracks.push(item);
    }

    //Create Marker
    webix.message({type: "error", text: "Total Alarm:" + playback.tracks.length});
    //Show Datagrid
    $$(report.active.tbl).parse(playback.tracks);

});
report.on("parse_park", function () {
    var total = 0;
    try {
        // console.log(report.json);
        total = parseInt(report.json.total, 10);
        if (total <= 0) {
            webix.message({type: "error", text: "Data Kosong"});
            return;
        }
    } catch (e) {
        console.log(e);
        webix.message({type: "error", text: e});
        return;
    }

    for (var i in report.json.data) {
        var item = report.json.data[i];
        item['status'] = parseInt(item.acc, 10) === 1 ? 'on' : 'off';
        var mp = playback.create_custom_marker(item, 'place_red.png');
        playback.markers.push(mp);
        playback.tracks.push(item);
    }

    //Create Marker
    webix.message({type: "error", text: "Total Alarm:" + playback.tracks.length});
    //Show Datagrid
    $$(report.active.tbl).parse(playback.tracks);

});
report.on("parse_hour", function () {
    var total = 0;
    try {
        // console.log(report.json);
        total = parseInt(report.json.total, 10);
        if (total <= 0) {
            webix.message({type: "error", text: "Data Kosong"});
            return;
        }
    } catch (e) {
        console.log(e);
        webix.message({type: "error", text: e});
        return;
    }

    for (var i in report.json.data) {
        var item = report.json.data[i];
       // item['status'] = parseInt(item.acc, 10) === 1 ? 'on' : 'off';
        var mp = playback.create_custom_marker(item, 'place_red.png');
        playback.markers.push(mp);
        playback.tracks.push(item);
    }

    //Create Marker
    webix.message({type: "error", text: "Total Work:" + report.json.totalOn});
    //Show Datagrid
    $$(report.active.tbl).parse(playback.tracks);

});
report.on("parse_poi", function () {
    var total = 0;
    try {
        // console.log(report.json);
        total = parseInt(report.json.total, 10);
        if (total <= 0) {
            webix.message({type: "error", text: "Data Kosong"});
            return;
        }
    } catch (e) {
        console.log(e);
        webix.message({type: "error", text: e});
        return;
    }

    for (var i in report.json.data) {
        var item = report.json.data[i];
       // item['status'] = parseInt(item.acc, 10) === 1 ? 'on' : 'off';
        var mp = playback.create_custom_marker(item, 'place_red.png');
        playback.markers.push(mp);
        playback.tracks.push(item);
    }

    //Create Marker
    webix.message({type: "error", text: "Total Data:" + playback.tracks.length});
    //Show Datagrid
    $$(report.active.tbl).parse(playback.tracks);

});
report.on("parse_geofence", function () {
    var total = 0;
    try {
        // console.log(report.json);
        total = parseInt(report.json.total, 10);
        if (total <= 0) {
            webix.message({type: "error", text: "Data Kosong"});
            return;
        }
    } catch (e) {
        console.log(e);
        webix.message({type: "error", text: e});
        return;
    }

    for (var i in report.json.data) {
        var item = report.json.data[i];
       // item['status'] = parseInt(item.acc, 10) === 1 ? 'on' : 'off';
        var mp = playback.create_custom_marker(item, 'place_red.png');
        playback.markers.push(mp);
        playback.tracks.push(item);
    }

    //Create Marker
    webix.message({type: "error", text: "Total Data:" + playback.tracks.length});
    //Show Datagrid
    $$(report.active.tbl).parse(playback.tracks);

});
playback.create_custom_marker = function (item, icon) {
    var latlng = new google.maps.LatLng(parseFloat(item.lat), parseFloat(item.lng));
    var marker = new google.maps.Marker({
        title: item.toString(),
        position: latlng,
        map: playback.map,
        icon: 'images/' + icon
    });
    google.maps.event.addListener(marker, 'click', function () {
        if (playback.iw !== null)
            playback.iw.close();
        var html = "<div'>";
        html += "<table>";
        html += "<tr><td>Date</td><td>:</td><td>" + item.tdate + "</td></tr>";
        if (item.park !== '') {
            html += "<tr><td>Park</td><td>:</td><td>" + item.park + "</td></tr>";
        }
        if (item.alarm > 0) {
            html += "<tr><td>Alarm</td><td>:</td><td>" + util.formatAlarm(item.alarm) + "</td></tr>";
        }
        html += "<tr><td>POI</td><td>:</td><td>" + item.poi + "</td></tr>";
        html += "<tr><td>Address</td><td>:</td><td>" + item.address + "</td></tr>";
        html += "</table>";
        html += "</div>";
        playback.iw = new google.maps.InfoWindow({content: html});
        playback.iw.setPosition(latlng);
        playback.iw.open(playback.map, marker);
    });
    return marker;
};
report.on("initData", function () {
    webix.extend($$("form_report"), webix.ProgressBar);
    playback.tracks = [];
    playback.tracks.length = 0;
    $$("sidemenu").select(1);

    $$("btn_download").attachEvent("onItemClick", function () {
        report.trigger("onDownloadStart");
    });
    $$("trip_to_excel").attachEvent("onItemClick", function () {
        webix.toExcel($$("tbl_trip"), {
            filename: "trip_report",
            name: "Trip"
//            ,columns: {
//                "tdate": {header: "Date", width: 50},
//                "nopol": {header: "Nopol", width: 120},
//                "speed": {header: "Speed", width: 120},
//                "address": {header: "Address", width: 200}
//
//            }
        });
    });
    $$("alarm_to_excel").attachEvent("onItemClick", function () {
        webix.toExcel($$("tbl_alarm"), {
            filename: "alarm_report",
            name: "Alarm"
        });
    });
    $$("park_to_excel").attachEvent("onItemClick", function () {
        webix.toExcel($$("tbl_park"), {
            filename: "park_report",
            name: "Park"
        });
    });
    $$("hour_to_excel").attachEvent("onItemClick", function () {
        webix.toExcel($$("tbl_hour"), {
            filename: "hour_report",
            name: "Hour"
        });
    });
    $$("poi_to_excel").attachEvent("onItemClick", function () {
        webix.toExcel($$("tbl_poi"), {
            filename: "poi_report",
            name: "POI"
        });
    });
    $$("geofence_to_excel").attachEvent("onItemClick", function () {
        webix.toExcel($$("tbl_geofence"), {
            filename: "geofence_report",
            name: "Geofence"
        });
    });
    $$("combo_speed").attachEvent("onChange", function (newv, oldv) {
        playback.speed = parseInt(newv, 10);
        console.log('speed:' + playback.speed);
    });
    $$("combo_speed").attachEvent("afterItemClick", function (id) {
        playback.speed = id;
        console.log('speed:' + id);
    });
    playback.button = $$("segmented_play");
    playback.button.attachEvent("onAfterTabClick", function (id) {
        console.log("onAfterTabClick:" + id);
        switch (parseInt(id, 10)) {
            case 1:
                report.trigger("onPlay");
                break;
            case 2:
                report.trigger("onPause");
                break;
            case 3:
                report.trigger("onStop");
                break;
        }
    });
    report.getMapObject();

    //$$("window_report").show();
});
var handler;
report.getMapObject = function () {
    console.log("getMapObject");
    if (handler)
        clearTimeout(handler);
    playback.map = $$("map_object").map;
    if (playback.map == null || playback.map == undefined) {
        handler = setTimeout('report.getMapObject()', 1000);
    }
    //return;
};
report.on("onDownloadStart", function () {
    playback.clear();
    $$(report.active.tbl).clearAll();
    $$("page_result").hide();
    $$("page_summary").hide();

    //Reset Data
    playback.tracks = [];
    playback.tracks.length = 0;

    var values = $$("form_report").getValues();
    console.log(values);
    values['random'] = Math.floor((Math.random() * 1000) + 1);
    if (report.validate(values) == false) {
        report.trigger("onDownloadFinish");
        return;
    }
    $$("form_report").showProgress({delay: 60000, hide: true});
    try {
        webix.ajax().post("scripts/report/" + report.active.url, values, function (text, xml, xhr) {
            console.log(text);
            console.log("xhr.status:" + xhr.status);
            console.log("xhr.statusText:" + xhr.statusText);
            if (xhr.readyState == 4) {
                report.json = xml.json();
                console.log('try parse data');
                report.trigger(report.active.data_processor);
                console.log('end parse data');
                report.trigger("onDownloadFinish");
            } else {
                webix.message({type: "error", text: text});
            }
        });
    } catch (e) {
        console.log(e);
        report.trigger("onDownloadFinish");
    }
});
report.on("onDownloadFinish", function () {
    console.log('onDownloadFinish');
    $$("form_report").hideProgress();
    $$("page_result").show();
    $$("page_summary").show();
    // $$("form_report").collapse();
    //$$("page_result").expand();
});
report.on("onPlay", function () {
    if (playback.tracks.length <= 0)
        return;
    webix.message({type: "error", text: "Playback Start..."});
    playback.loop();
    // playback.button.setValue(1);
});
report.on("onPause", function () {
    webix.message({type: "error", text: "Playback Pause..."});
    if (playback.timer) {
        clearTimeout(playback.timer);
    }
    playback.button.setValue(2);
});
report.on("onStop", function () {
    webix.message({type: "error", text: "Playback Stopped..."});
    if (playback.timer) {
        clearTimeout(playback.timer);
    }
    playback.index = 0;
    playback.button.setValue(3);
});
report.on("onFinish", function () {
    webix.message({type: "error", text: "Playback Finish..."});
    playback.index = 0;
    playback.button.setValue(3);
});
var report_data = [
    {id: 1, batch: "trip", tbl: "tbl_trip", data_processor: "parse_trip", value: "1.TRIP REPORT", url: "report_trip.php"},
    {id: 2, batch: "alarm", tbl: "tbl_alarm", data_processor: "parse_alarm", value: "2.ALARM REPORT", url: "report_alarm.php"},
    {id: 3, batch: "park", tbl: "tbl_park", data_processor: "parse_park", value: "3.PARK REPORT", url: "report_park.php"},
    {id: 4, batch: "hour", tbl: "tbl_hour", data_processor: "parse_hour", value: "4.HOUR REPORT", url: "report_hour.php"},
    {id: 5, batch: "poi", tbl: "tbl_poi", data_processor: "parse_poi", value: "5.POI REPORT", url: "report_poi.php"},
    {id: 6, batch: "geofence", tbl: "tbl_geofence", data_processor: "parse_geofence", value: "6.GEOFENCE REPORT", url: "report_geofence.php"}
];
report.validate = function (values) {
    if (values.from === '' || values.to === '') {
        webix.message({type: "error", text: "Tentukan Tangga"});
        return false;
    }
    if (values.vh_id === '' || isNaN(values.vh_id)) {
        webix.message({type: "error", text: "Pilih Kendaraan"});
        return false;
    }
    return true;
};
report.show_progress = function (status) {
    if (status === true) {
        console.log("show_progress");
        $$("form_report").showProgress({
            delay: 20000,
            hide: true
        });
        return;
    }
    console.log("hide_progress");
    $$("form_report").hideProgress();
};
var menu = {
    width: 300,
    rows: [
        //{header: "header", template: "Report Filter"},
        {view: "toolbar", height: 50, elements: [
                {width: 5},
                {view: "button", type: "icon", icon: "area-chart", width: 30},
                {view: "label", label: "GPS Tracker - Reporting System"}
//                {align: "right", rows: [
//                        {},
//                        {
//                            cols: [
//                                {view: "segmented", id: "segmented_map", value: 1, width: 150, options: [{id: 1, value: "Show Map"}, {id: 2, value: "Hide Map"}]},
//                                
//                        }
//                    ]}
            ]
        },
        {
            //  header: "Report Filter",
            body: {
                view: "list", id: "sidemenu", scroll: false, layout: "y", template: "#value#", select: true, width: 230,
                data: report_data,
                on: {
                    onAfterSelect: function (id) {
                        report.active = this.getItem(id)
                        console.log(report.active);
                        $$("batch_result").showBatch(report.active.batch);
                        // $$("header_report").setValue(report.selected.value);
                    }
                }
            }
        }, {
            header: "Summary",
            id: "page_summary",
            collapsed: false,
            hidden: true,
            body: {
                id: "form_summary",
                view: "form",
                elements: [
                    {view: "text", name: "total_distance", label: "Distance:", value: "0"},
                    {view: "text", name: "avg_speed", label: "Avg Speed:", value: "0"},
                    {view: "text", name: "total_cost", label: "Cost Total:", value: "0"},
                    {view: "text", name: "total_bbm", label: "BBM Total:", value: "0"}
                ]
            }
        }, {}

    ]
};
var batch_trip = {
    batch: "trip",
    rows: [{
            view: "datatable",
            id: "tbl_trip", select: true,
            columns: [
                {id: "id", header: "#", width: 50},
                {id: "nopol", header: "Nopol", width: 120},
                {id: "tdate", header: "Date", width: 150},
                {id: "speed", header: "Speed", width: 100},
                {id: "address", header: "Address", width: 250}
            ],
            pager: 'pager_trip'

        }, {
            cols: [
                {paddingY: -5, id: "pager_trip", view: "pager", size: 10, group: 5},
                {view: "button", id: "trip_to_excel", type: "form", value: "Save To Excel", width: 120},
                {width: 10},
                {view: "combo", width: 70, options: ["10", "30", "50", "100", "500", "1000"],
                    on: {onChange: function () {
                            console.log(this.getValue());
                            $$("tbl_trip").getPager().config.size = this.getValue() * 1;
                            $$("tbl_trip").refresh();
                        }}
                }]

        }
    ]
};
var batch_alarm = {
    batch: "alarm",
    rows: [{
            view: "datatable",
            id: "tbl_alarm",
            columns: [
                {id: "id", header: "#", width: 50},
                {id: "nopol", header: "Nopol", width: 150},
                {id: "tdate", header: "Date", width: 150},
                {id: "alarm", header: "Alarm", format: util.parse_alarm, width: 150},
                {id: "speed", header: "Speed", width: 150},
                {id: "address", header: "Address", width: 250}
            ],
            pager: "pager_alarm"
        }, {
            cols: [
                {paddingY: -5, id: "pager_trip", view: "pager", size: 10, group: 5},
                {view: "button", id: "alarm_to_excel", type: "form", value: "Save To Excel", width: 120},
                {width: 10},
                {view: "combo", width: 70, options: ["10", "30", "50", "100", "500", "1000"],
                    on: {onChange: function () {
                            console.log(this.getValue());
                            $$("tbl_alarm").getPager().config.size = this.getValue() * 1;
                            $$("tbl_alarm").refresh();
                        }}
                }]

        }
    ]
};
var batch_park = {
    batch: "park",
    rows: [{
            view: "datatable",
            id: "tbl_park",
            columns: [
                {id: "id", header: "#", width: 50},
                {id: "nopol", header: "Nopol", width: 150},
                {id: "tdate", header: "Start", width: 150},
                {id: "tdate2", header: "Finish", width: 150},
                {id: "duration", header: "Duration", width: 150},
                {id: "address", header: "Address", width: 250}
            ],
            pager: "pager_park"
        }, {
            cols: [
                {paddingY: -5, id: "pager_park", view: "pager", size: 10, group: 5},
                {view: "button", id: "park_to_excel", type: "form", value: "Save To Excel", width: 120},
                {width: 10},
                {view: "combo", width: 70, options: ["10", "30", "50", "100", "500", "1000"],
                    on: {onChange: function () {
                            console.log(this.getValue());
                            $$("tbl_park").getPager().config.size = this.getValue() * 1;
                            $$("tbl_park").refresh();
                        }}
                }]

        }
    ]
};
var batch_hour = {
    batch: "hour",
    rows: [{
            view: "datatable",
            id: "tbl_hour",
            columns: [
                {id: "id", header: "#", width: 50},
                {id: "nopol", header: "Nopol", width: 150},
                {id: "start", header: "Start", width: 150},
                {id: "finish", header: "Finish", width: 150},
                {id: "duration", header: "Duration", width: 150},
                {id: "address", header: "Address", width: 250}
            ],
            pager: "pager_hour"
        }, {
            cols: [
                {paddingY: -5, id: "pager_hour", view: "pager", size: 10, group: 5},
                {view: "button", id: "hour_to_excel", type: "form", value: "Save To Excel", width: 120},
                {width: 10},
                {view: "combo", width: 70, options: ["10", "30", "50", "100", "500", "1000"],
                    on: {onChange: function () {
                            console.log(this.getValue());
                            $$("tbl_hour").getPager().config.size = this.getValue() * 1;
                            $$("tbl_hour").refresh();
                        }}
                }]

        }
    ]
};
var batch_poi = {
    batch: "poi",
    rows: [{
            view: "datatable",
            id: "tbl_poi",
            columns: [
                {id: "id", header: "#", width: 50},
                {id: "nopol", header: "Nopol", width: 150},
                {id: "poi", header: "POI", width: 150},
                {id: "enter_date", header: "Enter Data", width: 150},
                {id: "exit_date", header: "Exit Date", width: 150}
            ], pager: "pager_poi"
        }, {
            cols: [
                {paddingY: -5, id: "pager_poi", view: "pager", size: 10, group: 5},
                {view: "button", id: "poi_to_excel", type: "form", value: "Save To Excel", width: 120},
                {width: 10},
                {view: "combo", width: 70, options: ["10", "30", "50", "100", "500", "1000"],
                    on: {onChange: function () {
                            console.log(this.getValue());
                            $$("tbl_poi").getPager().config.size = this.getValue() * 1;
                            $$("tbl_poi").refresh();
                        }}
                }]

        }
    ]
};
var batch_geofence = {
    batch: "geofence",
    rows: [{
            view: "datatable",
            id: "tbl_geofence",
            columns: [
                {id: "id", header: "#", width: 50},
                {id: "nopol", header: "Nopol", width: 150},
                {id: "start", header: "Start", width: 150},
                {id: "finish", header: "Finish", width: 150},
                {id: "duration", header: "Duration", width: 150},
                {id: "address", header: "Address", width: 250}
            ], pager: "pager_geofence"
        }, {
            cols: [
                {paddingY: -5, id: "pager_geofence", view: "pager", size: 10, group: 5},
                {view: "button", id: "geofence_to_excel", type: "form", value: "Save To Excel", width: 120},
                {width: 10},
                {view: "combo", width: 70, options: ["10", "30", "50", "100", "500", "1000"],
                    on: {onChange: function () {
                            console.log(this.getValue());
                            $$("tbl_geofence").getPager().config.size = this.getValue() * 1;
                            $$("tbl_geofence").refresh();
                        }}
                }]

        }
    ]
};
var form_report = {
    id: "form_report",
    view: "form",
    elements: [
        {id: "id_random", name: "id_random", hidden: true},
        {
            cols: [{view: "combo", name: "user_id", label: lang.user, suggest: "scripts/combo_user.php"}, {width: 20},
                {view: "combo", name: "vh_id", label: lang.license, suggest: "scripts/combo_vehicle.php"}
            ]
        },
        {cols: [
                {view: "datepicker", label: lang.from_date, name: "from_date", timepicker: true, stringResult: true, format: "%Y-%m-%d %H:%i:%s"}, {width: 20},
                {view: "datepicker", label: lang.to_date, name: "to_date", timepicker: true, stringResult: true, format: "%Y-%m-%d %H:%i:%s"}
            ]
        },
        {cols: [
                {view: "text", label: lang.price_bbm, name: "price_bbm", placeholder: "0", value: "0"}, {width: 20},
                {view: "text", label: lang.dist_perliter, name: "dist_perliter", placeholder: "0", value: "0"}
            ]
        },
        {
            cols: [
                {view: "button", id: "btn_download", type: "form", value: "Search"}//, {width: 20}
                //{view: "button", id: "btn_download_excel", type: "form", value: "Excel"}
            ]
        }
    ]
};
var views = {
    type: "clean",
    view: "scrollview",
    scroll: "y",
    multi: true,
    body: {
        rows: [
            {
                header: "Form",
                body: form_report
            },
            {
                id: "page_map",
                body: {
                    rows: [{
                            view: "toolbar", elements: [
                                {view: "label", id: "header_result", label: "Result Report"},
                                {view: "combo", id: "combo_speed", value: 1000, width: 150, options: [{id: 1000, value: "Normal"}, {id: 500, value: "Cepat"}, {id: 100, value: "Sangat Cepat"}]},
                                {view: "segmented", id: "segmented_play", value: 1, width: 150, options: [{id: 1, value: "Play"}, {id: 2, value: "Pause"}, {id: 3, value: "Stop", type: "danger"}]}
                            ]
                        }, {
                            id: "map_object",
                            view: "google-map",
                            key: "AIzaSyCobdKM8bzMG6EcmwE0ZSpz68z6JEgLGMY",
                            zoom: 6,
                            center: [-7.373783, 112.4747848],
                            ready: function () {
                                console.log("Google Map Ready");
                            }
                        }
                    ]
                }
            },
            {view: "resizer"},
            {
                header: "Data Report",
                id: "page_result",
                //hidden: true,
                collapsed: false,
                body: {
                    id: "batch_result",
                    visibleBatch: "trip",
                    rows: [
                        batch_trip,
                        batch_alarm,
                        batch_park,
                        batch_hour,
                        batch_poi,
                        batch_geofence
                    ]
                }
            }
        ]
    }
};
var ui = {
    rows: [
//        {view: "toolbar", height: 50, elements: [
//                {width: 5},
//                {view: "button", type: "icon", icon: "area-chart", width: 30},
//                {view: "label", label: "GPS Tracker - Reporting System"}
////                {align: "right", rows: [
////                        {},
////                        {
////                            cols: [
////                                {view: "segmented", id: "segmented_map", value: 1, width: 150, options: [{id: 1, value: "Show Map"}, {id: 2, value: "Hide Map"}]},
////                                
////                        }
////                    ]}
//            ]
//        },
        {type: "space", cols: [menu, views]}
    ]
};