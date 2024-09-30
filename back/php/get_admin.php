<?php
    session_start();
    include("conn.php");

    $consulta = "SELECT * FROM total";
    $resultado = $conn_db->query($consulta);

    $datos = [];

    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = [
            "id_pregunta" => $fila["id_pregunta"],
            "enunciat" => $fila["enunciat"],
            "pCorrecte" => $fila["pCorrecte"],
            "p1" => $fila["p1"],
            "p2" => $fila["p2"],
            "p3" => $fila["p3"],
            "imatge" => $fila["imatge"]
        ];
    }

    echo json_encode($datos);