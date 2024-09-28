<?php
    $database = "autoescola_arnau";
    $servername = "localhost";
    $username = "root";
    $password = "";

    $conn_db = new mysqli($servername, $username, $password, $database);

    if ($conn_db->connect_error) {
        die("La conexión ha fallado: " . $conn_db->connect_error);
    }