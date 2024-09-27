<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "autoescola_arnau";

    $conn_db = new mysqli($servername, $username, $password, $database);

    if ($conn_db->connect_error) {
        die("La conexió a fallat");
    }
    echo "Conexió exitosa <br> El nom de la base de dades es: ".$database;