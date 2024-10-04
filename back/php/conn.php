<?php
    $database1 = "a23arnbarsor_autoescola_arnau";
    $servername1 = "localhost:3306";
    $username1 = "a23arnbarsor_arnaubarrero";
    $password1 = "K3&x:2K5Wy-m4x69";

    $database2 = "autoescola_arnau";
    $servername2 = "localhost";
    $username2 = "root";
    $password2 = "";

    $conn_db = new mysqli($servername1, $username1, $password1, $database1);

    if ($conn_db->connect_error) {
        $conn_db = new mysqli($servername2, $username2, $password2, $database2);
    }