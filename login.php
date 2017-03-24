<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="codebase/skins/compact.css" type="text/css" media="screen" charset="utf-8">
        <script src="codebase/webix.js" type="text/javascript" charset="utf-8"></script>
        <title>Entryshipment</title>
        <style>
            .header_acc{font-family:'PT Sans'}
            .transparent{
                background-color: transparent;
            }
        </style>
    </head>
    <body>
        <script type="text/javascript">
            function isEmpty(str)
            {
                if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g, "") === "")
                {
                    return true;
                } else
                {
                    return false;
                }
            }
            function do_login() {
                var values = $$("form_login").getValues();
                console.log(values);
                if (values.usename === "") {
                    console.log("username empty");
                    $$("username").focus();
                    return;
                }
                if (values.password === "") {
                    console.log("password empty");
                    $$("password").focus();
                    return;
                }
                webix.ajax().post("scripts/do_login.php", values, function (text, xml, xhr) {
                    var response = xml.json();
                    console.log(text);
                    console.log(xml);
                    console.log(response);
                    if (response.login == true) {
                        window.location.href = 'index.php';
                    } else {
                        webix.message({type: "error", text: response.msg});
                    }
                });
            }
            var appui = {
                rows: [{
                        id: "form_login",
                        view: "form", elements: [
                            {view: "text", label: "Login Name", id: "username", name: "username", height: 30, on: {
                                    onKeyPress: function (code, event) {
                                        if (code === 13) {
                                            do_login();
                                        }
                                    }
                                }},
                            {view: "text", type: "password", label: "Password", id: "password", name: "password", height: 30, on: {
                                    onKeyPress: function (code, event) {
                                        if (code === 13) {
                                            do_login();
                                        }
                                    }
                                }},
                            {cols: [
                                    {view: "button", type: "form", value: "Login", click: function () {
                                            do_login();
                                        }},
                                    {view: "button", type: "danger", value: "Cancel"}
                                ]}
                        ]
                    }

                ]
            };
            webix.ready(function () {
                if (!webix.env.touch) {
                    webix.ui(appui);
                } else {
                    webix.ui.fullScreen();
                    webix.ui(appui);
                }
            });

        </script>
    </body>
</html>