function MyTrip()
{
    var nopol;
    var R = this;
    R.node;
    R.map;
    R.marker;
    R.polyline;
    R.trips = [];
    R.markerStop = [];
    R.grid;
    R.jqXhr;
    R.index = 0;
    R.tripIndex = 0;
    R.rowIndex = 0;
    R.pageNumber = 1;
    R.pageSize = 10;
    R.paused = false;
    R.speed = 1000;
    R.mapLayout;
    R.distanceTrip = 0;
    R.panelSummary;
    R.timer = 0;
    R.mapProvider;

    R.change_map_layer = function (layer) {
        if (R.mapProvider != undefined) {
            R.map.removeLayer(R.mapProvider);
            R.mapProvider = undefined;
        }
        switch (layer) {
            case 'googleStreet':
                R.mapProvider = new L.Google('ROADMAP');
                break;
            case 'googleHybrid':
                R.mapProvider = new L.Google('HYBRID');
                break;
            case 'bingStreet':
                console.log(layer);
                // for all possible values and explanations see "Template Parameters" in https://msdn.microsoft.com/en-us/library/ff701716.aspx
                var bingMapType = "Road"; // Aerial|AerialWithLabels | Birdseye | BirdseyeWithLabels | Road
                R.mapProvider = new L.BingLayer("LfO3DMI9S6GnXD7d0WGs~bq2DRVkmIAzSOFdodzZLvw~Arx8dclDxmZA0Y38tHIJlJfnMbGq5GXeYmrGOUIbS2VLFzRKCK0Yv_bAl6oe-DOc", {type: bingMapType});
                break;
            case 'osm':
                R.mapProvider = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
                break;
            case 'local':
                R.mapProvider = new L.TileLayer('http://localhost:8844/2144088369/{z}/{x}/{y}', {maxZoom: 18, attribution: 'GreatMaps - Bing'});
                break;
        }
        if (R.mapProvider != undefined) {
            R.map.addLayer(R.mapProvider); //set default layer
        }
    };
    R.init_map = function () {
        R.map = new L.Map('map_trip', {editable: false, center: new L.LatLng(0.3464, 112.47484), zoom: 6});
        R.change_map_layer('googleStreet');
        R.panelSummary = $("#panelSummary");
        R.grid = $("#grid_trip");
        R.grid.datagrid({
            rownumbers: true,
            singleSelect: true,
            autoRowHeight: false,
            pagination: true,
            pageSize: 10, fit: true, pageList: [10, 20, 30, 50],
            loadFilter: util.pagerFilter,
            columns: [[
                    {field: 'nopol', title: lang.grid_license, width: 120},
                    {field: 'tdate', title: lang.grid_date, width: 130},
                    {field: 'speed', title: lang.grid_speed, width: 80, formatter: util.formatSpeed},
                    {field: 'angle', title: lang.grid_direction, width: 100, formatter: util.formatAngle},
                    {field: 'address', title: lang.grid_addr, width: 350},
                    {field: 'poi', title: lang.grid_poi, width: 140},
                    {field: 'park', title: lang.grid_park, width: 130}
                ]]
        });
//        var pager = R.grid.datagrid("getPager");
//        if (pager !== null && pager !== undefined) {
//            pager.pagination({
//                layout: ['list', 'prev', 'next'],
//                buttons: '#buttons',
//                displayMsg: '' //{from} to {to} of {total} Data
//            });
//        }
        console.log("Init Map");
    };
    R.getSelectedVehicle = function () {
        var node = $("#treeGpsReport").tree('getSelected');
        return node;
    };
    R.download = function () {
        R.clear_trip();
        R.init_trip();
        var node = treeGps.tree('getChecked');
        if (node == null) {
            alert('Select GPS');
            return;
        }
        var node = R.getSelectedVehicle();
        var vh_id = node.id;
        nopol = node.text;
        var from = $("#pb_from_date").datebox('getValue') + " " + $("#pb_from_time").timespinner('getValue');
        var to = $("#pb_to_date").datebox('getValue') + " " + $("#pb_to_time").timespinner('getValue');

        console.log('Download Data Trip, Nopol:' + nopol + ', vh_id:' + vh_id + ', from:' + from + ',to:' + to);

        if (R.jqXhr) {
            R.jqXhr.abort();
        }
        $.messager.progress({
            title: lang.download_title + ' ' + nopol,
            msg: lang.download_msg
        });
        R.jqXhr = $.ajax({
            url: 'php_script/report/report_trip_detil.php',
            type: 'POST',
            dataType: 'json',
            data: {vh_id: vh_id, from: from, to: to},
            success: function (result)
            {
                console.log(result);
                if (parseInt(result.total, 10) <= 0) {
                    alert(lang.data_empty);
                    return;
                }
                var no = 0;
                if (R.mapLayout != undefined) {
                    R.mapLayout.layout('expand', 'south');
                }
                var temp = [];
                $.each(result.data, function (i, item)
                {
                    item['nopol']=nopol;
                    item['status'] = parseInt(item.speed, 10) >= 1 ? 'on' : 'off';
                    item['park'] = '';
                    //push data to array
                    temp.push(item);
                }); //end each

                if (temp.length > 0) {
                    R.parse(temp);
                }
                //Create Track Line, Calculate Distance

            } //end success
        }).done(function () {
            console.log("second success");
        }).fail(function (jqxhr, textStatus, error) {
            console.log(jqxhr);
        }).always(function () {
            console.log("complete");
            $.messager.progress('close');
        });
    };
    R.init_trip = function () {
        R.polyline = L.polyline([]).addTo(R.map);
        R.tripIndex = 0;
        R.pageNumber = 1;
        R.speed = 500;
    };
    R.clear_trip = function () {
        // console.log(this);
        if (R.markerStop) {
            for (var i in R.markerStop) {
                var m = R.markerStop[i];
                if (m != undefined) {
                    R.map.removeLayer(m);
                }
            }
        }
        R.markerStop = [];
        R.markerStop.length = 0;
        if (R.polyline != undefined) {
            R.map.removeLayer(R.polyline);
            //polyline;
        }
        if (R.marker != undefined) {
            R.map.removeLayer(R.marker);
            //delete R.marker;
        }
        R.trips = [];
        R.trips.length = 0;
    };
    R.stop = function () {
        change_trip_state('stop');
    };
    R.pause = function () {
        change_trip_state('pause');
    };
    R.change_trip_state = function (state) {
        switch (state) {
            case 'play':
                if (R.paused === false)
                    R.tripIndex = 0;
                marker.openPopup();
                play();
                break;
            case 'pause':
                R.paused = true;
                clearTimeout(R.timer);
                break;
            case 'stop':
                clearTimeout(R.timer);
                R.paused = false;
                R.tripIndex = 0;
                R.pageNumber = 1;
                alert('Finish');
                break;
        }
    };

    R.download_excel = function () {
        var node = treeGps.tree('getChecked');
        if (node == null) {
            alert('Select GPS');
            return;
        }
        var node = R.getSelectedVehicle();
        var vh_id = node.id;
        var nopol = node.text;
        var from = $("#pb_from_date").datebox('getValue') + " " + $("#pb_from_time").timespinner('getValue');
        var to = $("#pb_to_date").datebox('getValue') + " " + $("#pb_to_time").timespinner('getValue');

        console.log('Download Data Trip, Nopol:' + nopol + ', vh_id:' + vh_id + ', from:' + from + ',to:' + to);

        window.location = "php_script/report/report_trip_excel.php?vh_id=" + vh_id + "&nopol=" + nopol + "&from=" + from + "&to=" + to;
        return;
    };
    R.parse = function (data) {
        var first = true;
        var index = 0;
        var indexStop = 0;
        var trackStop = [];
        var totalSpeed = 0;
        var totalTrackSpeed = 0;
        R.trips = [];
        R.trips.length = 0;
        for (var i in data) {
            var t = data[i];
            if (t.speed > 0) {
                totalSpeed += parseFloat(t.speed);
                totalTrackSpeed++;
            }
            t['park'] = '';
            if (first == false)
            {
                if (t.speed <= 1) {
                    trackStop[indexStop++] = t;
                } else {
                    if (trackStop.length > 1) {
                        //Calculate park
                        var first = trackStop[0].tdate;
                        var last = trackStop[trackStop.length - 1].tdate;
                        //console.log('first:'+first +',last:'+ last);
                        var ms = util.diffMS(first, last);
                        if (ms > (1000 * 60 * 60)) { //60 Menit
                            if (R.trips.length > 0) {
                                R.trips[index - 1].park = util.msToDateDescr(ms);
                            } else {
                                R.trips[index++] = trackStop[0];
                                R.trips[index - 1].park = util.msToDateDescr(ms);
                            }
                        }
                        indexStop = 0;
                        trackStop = [];
                        trackStop.length = 0;
                    } else if (trackStop.length > 0) {
                        for (var j in trackStop) {
                            R.trips[index++] = trackStop[j];
                        }
                        indexStop = 0;
                        trackStop = [];
                        trackStop.length = 0;
                    }
                    R.trips[index++] = t;
                }
            } else {
                if (t.speed <= 1) {
                    trackStop[indexStop++] = t;
                } else {
                    R.trips[index++] = t;
                }
                first = false;
            }
        }
        if (trackStop.length > 1) {
            //Calculate park
            var first = trackStop[0].tdate;
            var last = trackStop[trackStop.length - 1].tdate;
            //console.log('first:'+first +',last:'+ last);
            var ms = util.diffMS(first, last);
            if (ms > (1000 * 60 * 60)) { //60 Menit
                if (R.trips.length > 0) {
                    R.trips[index - 1].park = util.msToDateDescr(ms);
                } else {
                    R.trips[index++] = trackStop[0];
                    R.trips[index - 1].park = util.msToDateDescr(ms);
                }
            }
            indexStop = 0;
            trackStop = [];
            trackStop.length = 0;
        }
        var first = true;
        var prev;
        for (var i in R.trips) {
            var trip = R.trips[i];
            var latlng = new L.latLng(parseFloat(trip.lat), parseFloat(trip.lng));

            if (trip.park != '') {
                //console.log(report);
                var park = R.create_marker_park(trip);
                park.addTo(R.map);
                R.markerStop.push(park);
            }
            if (first == false) {
                //console.log(parent);
                R.polyline.addLatLng(latlng);
                //console.log(prev);
                R.distanceTrip += util.distance(trip.lat, trip.lng, prev.lat, prev.lng);
            } else {
                first = false;
                R.marker = R.create_marker(trip);
                R.marker.addTo(R.map);
                R.marker.openPopup();
                R.map.setView(latlng, R.map.getZoom());
            }
            prev = trip;
        }
        //Calculate Avg Speed
        var avgSpeed = parseFloat(totalSpeed / totalTrackSpeed, 10);
        var summary = "<table>";
        summary += "<tr><td>" + lang.license + "</td><td>:</td><td>" + nopol + "</td></tr>";
        summary += "<tr><td>" + lang.avg_speed + "</td><td>:</td><td>" + avgSpeed.toFixed(2) + "Km/Jam</td></tr>";
        summary += "<tr><td>" + lang.grid_distance + "</td><td>:</td><td>" + R.distanceTrip.toFixed(2) + "Km</td></tr>";
        summary += "</table>";
        //Show Statistic to Panel
        if (R.panelSummary != undefined) {
            R.panelSummary.panel({content: summary});
        }
        //console.log(R.trips);
        R.grid.datagrid('loadData', R.getTrips());// {data: R.getDataTrip()}).datagrid('clientPaging');
    };
    R.getTrips = function () {
        var rows = [];
        for (var i in R.trips) {
            var t = R.trips[i];
            rows.push({
                nopol: t.nopol,
                tdate: t.tdate,
                park: t.park,
                speed: t.speed,
                angle: t.angle,
                poi: t.poi,
                address: t.address
            });
        }
        return rows;
    };
    R.create_marker = function (v) {
        var icon = L.icon({
            iconUrl: 'icons/gps/off/nav_0.png',
            iconSize: [28, 32], // size of the icon
            iconAnchor: [22, 22], // point of the icon which will correspond to marker's location
            popupAnchor: [-10, -22] // point from which the popup should open relative to the iconAnchor
        });
        if (v.icon_map == 'panah') {
            icon = util.create_icon(v.angle, v.status);
        }
        var m = new L.Marker([v.lat, v.lng], {icon: icon, draggable: false, rotationAngle: v.angle});

        m.on('click', function (e) {
            var vv = R.trips[R.tripIndex];

            var content = "<b>" + vv.nopol + "</b><br/>";
            //content += "Date:" + vv.tdate + "<br/>";
            if (vv.park != '') {
                content += "Park:" + vv.park + " Km/j<br/>";
            }
            content += "Speed:" + vv.speed + " Km/j<br/>";
            content += "Address:" + vv.address;
            console.log(content);
            m.bindPopup(content).openPopup();
            // m.setPopupContent(content);
            // m.openPopup();
        });
        return m;
    };
    R.create_marker_park = function (v) {
        var icon = L.icon({
            iconUrl: 'icons/general/park.png',
            iconSize: [28, 32], // size of the icon
            iconAnchor: [22, 22], // point of the icon which will correspond to marker's location
            popupAnchor: [-10, -22] // point from which the popup should open relative to the iconAnchor
        });
        var m = new L.Marker([v.lat, v.lng], {icon: icon, draggable: false, rotationAngle: v.angle});
        var content = "<b>" + v.nopol + "</b><br/>";
        content += "Date:" + v.tdate + "<br/>";
        if (v.park != '') {
            content += "Parkir:" + v.park + "<br/>";
        }
        content += "Speed:" + v.speed + " Km/j<br/>";
        content += "Address:" + v.address;
        m.bindPopup(content).openPopup();
        return m;
    };
    R.change_state = function (state) {
        switch (state) {
            case 'play':
                if (R.paused === false)
                    R.tripIndex = 0;
                R.play();
                break;
            case 'pause':
                R.paused = true;
                clearTimeout(R.timer);
                break;
            case 'stop':
                clearTimeout(R.timer);
                R.paused = false;
                R.tripIndex = 0;
                break;
        }
    };
    R.play = function () {
        if (R.timer !== '')
            clearTimeout(R.timer);

        var track = R.trips[R.tripIndex];
        if (track == null || track == undefined) {
            alert('Selesai...');
            return;
        }
        var currLatLng = new L.latLng(track.lat, track.lng);
        var icon = util.create_icon(track.angle, track.status);
        var content = R.create_content(track);

        R.marker.setLatLng(currLatLng);
        R.marker.setIcon(icon);
        R.marker.setPopupContent(content);

        var avgSpeed = 0;
        var strStatistic = "<table>";
        strStatistic += "<tr><td>Kec Rata2</td><td>:</td><td>" + avgSpeed.toFixed(2) + "Km/Jam</td></tr>";
        strStatistic += "<tr><td>Jarak Tempuh</td><td>:</td><td>" + R.distanceTrip.toFixed(2) + "Km/Jam</td></tr>";
        strStatistic += "</table>";
        if (R.panelSummary != undefined && R.panelSummary != null) {
            R.panelSummary.html(strStatistic + "<br>" + content);
        }
        R.map.panTo(currLatLng);//, mapReport.getZoom());
        if (R.tripIndex++ <= R.trips.length) {
            if (R.rowIndex >= (R.pageSize - 1)) { //rowIndex 4 adalah baris ke 5 karena baris diawali dari 0
                //Tampilkan Bari 
                R.rowIndex++;
                R.grid.datagrid('selectRow', R.rowIndex).datagrid('highlightRow', R.rowIndex);
                // wait(500); 
                R.rowIndex = 0;
                var pager = R.grid.datagrid("getPager");
                pager.pagination('select', ++R.pageNumber);
                R.grid.datagrid('selectRow', R.rowIndex).datagrid('highlightRow', R.rowIndex);
            } else {
                R.grid.datagrid('selectRow', R.rowIndex).datagrid('highlightRow', R.rowIndex);
                R.rowIndex++;
            }
            if (track.park === '') {
                R.timer = setTimeout(function () {
                    R.play();
                }, R.speed);
            } else {
                R.timer = setTimeout(function () {
                    R.play();
                }, 5000);
            }
        } else {
            R.change_trip_state('stop');
        }
    };
    R.create_content = function (track) {
        var content = "<div>";
        content += "<table>";
        content += "<tr><td>" + lang.date + "</td><td>:</td><td>" + track.tdate + "</td></tr>";
        content += "<tr><td>" + lang.speed + "</td><td>:</td><td>" + track.speed + " Km/Jam</td></tr>";
        //content += "<tr><td>Arah</td><td>:</td><td>" + dName(track.angle) + " Km/Jam</td></tr>";
        if (track.park !== '') {
            content += "<tr><td>" + lang.park + "</td><td>:</td><td style='background-color:#F00;'>" + track.park + "</td></tr>";
        }
        content += "<tr><td>" + lang.poi + "</td><td>:</td><td>" + track.poi + "</td></tr>";
        content += "<tr><td>" + lang.addr + "</td><td>:</td><td>" + track.address + "</td></tr>";
        content += "</table>";
        content += "</div>";
        return content;
    };
}