<?php
    /*
    $database = "a23arnbarsor_autoescola_arnau";
    $servername = "localhost:3306";
    $username = "a23arnbarsor_arnaubarrero";
    $password = "K3&x:2K5Wy-m4x69";
    */
    
    $database = "autoescola_arnau";
    $servername = "localhost";
    $username = "root";
    $password = "";
    

    $conn_db = new mysqli($servername, $username, $password, $database);

    if ($conn_db->connect_error) {
        die("La conexión ha fallado: " . $conn_db->connect_error);
    }