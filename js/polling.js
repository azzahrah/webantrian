var server="192.168.0.100";
var data_polling = [];
var dataset = [
    {id: 1, value: 1, category: "Sangat Puas", color: "#ee3639"},
    {id: 2, value: 20, category: "Cukup Puas", color: "#ee3633"},
    {id: 3, value: 30, category: "Tidak Puas", color: "#ff0000"}
];
var chart = {
    id: "Mychart",
    view: "chart",

    type: "bar",
    value: "#value#",
    color: '#color#',
    label: "#category# = #value#",
    radius: 0,
    border: true,
    barWidth: 200,
    //datathrottle:500,
    xAxis: {
        title: 'IKM (Index Kepuasan Masyarakat)',
        template: "'#category#"
    },
    yAxis: {
        title: 'IKM (Index Kepuasan Masyarakat)'
    },
//                yAxis: {
//                    start: 0,
//                    end: 100,
//                    step: 10,
//                    template: function (obj) {
//                        return obj;
//                    }
//                },
    tooltip: {
        template: "#category# = #value#" //tooltip
    }
    ,
    data: dataset
};

var ui = {
    type: "clear",
    cols: [
        {
            width: 200,
            rows: [
                {

                }, {
                    gravity: 0.00001
                }
            ]
        },

        {
            rows: [
                chart,
                {
                    id: "tbl_polling",
                    view: "datatable",
                    height: 300,
                    select: true,
                    columns: [
                        {id: "id", header: "No", css: "rank", width: 50},
                        {id: "tgl", header: "Tanggal", width: 150},
                        {id: "nama", header: "Nama", width: 150},
                        {id: "pilihan", header: "Polling", width: 150},
                        {id: "comment", header: "Komentar", width: 300}
                    ]
                }, {
                    gravity: 0.00001
                }
            ]
        }, {
            width: 200,
            rows: [
                {

                }, {
                    gravity: 0.00001
                }
            ]
        }
    ]
};
var toolbar = {
    view: "toolbar",
    height: 45,
    elements: [
        {height: 30, view: "label", template: "<span class='main_title'><center>IKM (Index Kepuasan Masyarakat)</center></span>"}
    ]
};
reset_dataset = function () {
    dataset = [
        {id: 1, value: 0, category: "Sangat Puas", color: "#ee3639"},
        {id: 2, value: 0, category: "Cukup Puas", color: "#ee3633"},
        {id: 3, value: 0, category: "Tidak Puas", color: "#ff0000"}
    ];
};
var timerLoop;
var getItemChart = function (category) {
    var cat;
    for (var i in dataset) {
        if (dataset[i].category === category) {
            cat = dataset[i];
            break;
        }
    }
    return cat;
};
var loop = function () {
    if (timerLoop) {
        clearTimeout(timerLoop);
    }
    console.log("Start Polling");
    webix.ajax().post("scripts/load_polling.php", {}, function (text, xml, xhr) {
        try {
            var result = xml.json();
            var sp = getItemChart('Sangat Puas');
            var cp = getItemChart('Cukup Puas');
            var tp = getItemChart('Tidak Puas');
            sp.value = 0;
            cp.value = 0;
            tp.value = 0;
            sp.color = 'green';
            cp.color = 'yellow';
            tp.color = 'red';
            var total = 0;
            // reset_dataset();
            data_polling = [];
            data_polling.length = 0;
            for (var i in result) {
                total++;
                data_polling.push(result[i]);
                if (result[i].pilihan === 'Sangat Puas') {
                    sp.value++;
                } else if (result[i].pilihan === 'Cukup Puas') {
                    cp.value++;
                } else if (result[i].pilihan === 'Tidak Puas') {
                    tp.value++;
                }
            }

            $$("Mychart").parse(dataset);

            $$("tbl_polling").parse(data_polling);
        } catch (e) {
            console.log(e);
        }
        timerLoop = setTimeout("loop()", 10000);
    });
};
var appui = {
    id: "main",
    width: 1024,
    rows: [
        toolbar,
        {cols: [webix.copy(ui)]
        }
    ]
};

init = function () {
    webix.ui(appui);
    setTimeout(function () {
        loop();
    }, 3000);
};
