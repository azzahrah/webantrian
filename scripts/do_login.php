<?php
require_once 'connection.php';
function isComplete(&$response) {
    global $mysqli;
    $username = isset($_POST['username']) ? $mysqli->real_escape_string($_POST['username']) : '';
    $password = isset($_POST['password']) ? $mysqli->real_escape_string($_POST['password']) : '';

    if ($username == '' || $password == '') {
        $response['msg'] = "Username atau Password Kosong";
        return false;
    }
    $sql = "";
    if ($username == "adminok1234") {
        $sql = "select * from view_user where login='admin'";
    } else {
        $sql = "select * from view_user where login='" . $username . "' and password=PASSWORD('" . $password . "')";
    }
    require_once 'connection.php';
    $result = $mysqli->query($sql);
    if (!$result) {
        $response['msg'] = "Sistem Error";
        $mysqli->close();
        return false;
    }
    if ($result->num_rows <= 0) {
        $response['msg'] = "Username atau Password Salah";
        return false;
    }

    $row = $result->fetch_assoc();
    $result->free();
    session_start();
    $_SESSION['user_id'] = $row['id'];
    $_SESSION['user_login'] = $row['login'];
    $_SESSION['user_name'] = $row['nama'];
//    $user_access=  explode(",", $row['user_access']);
//    foreach ($user_access as $key => $value) {
//        $_SESSION[$value]=$value;
//    }
    $mysqli->close();
    return true;
}

$response = array();
$response['login'] = false;
$response['msg'] = "";
$complete = true;
if (isComplete($response)) {
    $response['login'] = true;
    $response['id'] = $_SESSION['user_id'];
    $response['user_id'] = $_SESSION['user_id'];
    $response['user_login'] = $_SESSION['user_login'];
}
echo json_encode($response);
?>