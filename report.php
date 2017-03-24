<?php require_once 'session.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="codebase/skins/compact.css" type="text/css" media="screen" charset="utf-8">
        <script src="codebase/webix.js" type="text/javascript" charset="utf-8"></script>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCobdKM8bzMG6EcmwE0ZSpz68z6JEgLGMY&v=3.exp&libraries=places,geometry"></script>
        <script src="codebase/googlemap.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/lang.js?v=1.0.4" type="text/javascript" charset="utf-8"></script>
        <script src="js/util.js?v=1.0.4" type="text/javascript" charset="utf-8"></script>
        <script src="js/report.js?v=1.0.4" type="text/javascript" charset="utf-8"></script>

        <title>Reporting</title>
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
            .webix_tree_on{
                background-image: url("icon/16/on.png");
            }
            .webix_tree_stop{
                background-image: url("icon/16/stop.png");
            }
            .webix_tree_off{
                background-image: url("icon/16/off.png");
            }
            .webix_icon_download{
                background-image: url("icon/download.png");
            }
            .btn_red{
                background: #f00;
            }
        </style>
    </head>
    <body>
        <div id="menuxx" style="position:absolute;top:0;right:0;width:200px; height:40px;"></div>
        <script type="text/javascript">
            webix.ready(function () {
               report.init();
            });

        </script>
    </body>
</html>