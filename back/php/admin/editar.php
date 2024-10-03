<?php
    include("../conn.php");

    $jsonData = file_get_contents("php://input");
    $data = json_decode($jsonData, true);

    $id_pregunta = $data['id_pregunta'];

    $sql = "UPDATE total SET enunciat = ?, p1 = ?, p2 = ?, p3 = ?, pCorrecte = ? WHERE id_pregunta = ?;";
    $stmt = mysqli_prepare($conn_db, $sql);

    mysqli_stmt_bind_param($stmt, "ssssss", 
        $data['anunciat'], 
        $data['p1'], 
        $data['p2'], 
        $data['p3'], 
        $data['respostaCorrecta'],
        $id_pregunta
    );

    mysqli_stmt_execute($stmt);