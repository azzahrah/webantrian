
<!doctype html>
<html>
<head>
	<title>Export to Excel</title>
        <link rel="stylesheet" href="codebase//webix.css?v=4.0.14" type="text/css" media="screen" charset="utf-8">
        <script src="codebase/webix.js?v=4.0.14" type="text/javascript" charset="utf-8"></script>

	<link rel="stylesheet" type="text/css" href="css/samples.css">
	<script type="text/javascript" src="js/testdata.js"></script>
	<style type="text/css">
		html,body{ height:100%; margin:0}
		.webix_view.toolbar{
			background: #fafafa;
		}
	</style>
</head>
<body>
	<div id="dataDiv"></div>

	<script>

		webix.ui({
			container:"dataDiv",
			padding: 20,
			rows: [
				{
					id: "table",
					view:"datatable",
					columns:[
						{ id:"rank",	header:"", css:"rank",  		width:50},
						{ id:"title",	header:"Film title",width:250},
						{ id:"year",	header:"Released" , width:80},
						{ id:"votes",	header:"Votes", 	width:100}
					],
					autowidth:true,
					height: 450,
					data:big_film_set
				},
				{
					view: "form",
					css: "toolbar",
					paddingY: 5,
					paddingX: 10,
					cols:[
						{
							view: "label", label: "Export"
						},
						{
							view: "button", label: "All Fields", width: 95, click:function(){
								webix.toExcel($$("table"));
							}
						},
						{
							view: "button", label: "'Rank' and 'Title'", width: 140, click:function(){
								webix.toExcel($$("table"), {
									filename: "table",
									name: "Films",
									columns:{
										"rank":{header: "Rank", width: 50},
										"title":{header: "Title", width: 200}
									}
								});
							}
						}
					]

				}
			]
		});
	</script>
</body>
</html>
<script src='https://cdn.ravenjs.com/2.1.0/raven.min.js'></script><script>Raven.config('https://50e7233181284483abcbf6688b0505b5@app.getsentry.com/68752',{ release:'4.0.14'}).install();</script>
