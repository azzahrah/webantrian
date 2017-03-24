<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="codebase/skins/compact.css" type="text/css" media="screen" charset="utf-8">
        <link rel="stylesheet" href="css/style.css?v=1.0.4" type="text/css" media="screen" charset="utf-8">
        <script src="codebase/webix.js" type="text/javascript" charset="utf-8"></script>
        <script src="codebase/googlemap.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/lang.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/util.js?v=1.0.4" type="text/javascript" charset="utf-8"></script>
        <script src="js/buffer-loader.js?v=1.0.14" type="text/javascript" charset="utf-8"></script>
        <script src="js/hasil_ujian.js?v=1.0.14" type="text/javascript" charset="utf-8"></script>

        <title>Hasil Ujian</title>
        <style>
            .header_acc{font-family:'PT Sans'}
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
            .blue.webix_menu-x{
                background:#3498DB;
            }
            .webix_menu-x{
                margin-top:100px;
            }
            .webix_input_icon.route:before{
                content:""; /*removes FontAwesome icon */
                background-image: url("icon/route.png");
                width:32px;
                height:32px;
                display:block;
            }
            .custom{
                width:32px;
            }
            .webix_icon_download{
                background-image: url("icon/download.png");
            }
            .small_text{
                font-style: italic;
                font-size: x-small;
                font-weight:normal;
            }
            .big_text{
                font-style: normal;
                font-size: 16px;
                font-weight:normal;
            }
            .judul{
                font-size: 36px;
                font-weight: bold;
                line-height: 60;
            }
            .my_style .webix_hcell{
                background:#009966;
                color:white;
                font-weight:bold;
                font-size: 22px;
            }
            .my_style .webix_column{
                /*                font-style:italic;*/
                font-weight:bold;
                background:#ddFFdd;
                font-size: 18px;
            }
            .my_style .webix_column > div{
                border-color:#ddd;
            }

        </style>
    </head>
    <body>
        <div id="menuxx" style="position:absolute;top:0;right:0;width:200px; height:40px;"></div>
        <script type="text/javascript">
            webix.ready(function () {
                app.init();
            });

        </script>
    </body>
</html>