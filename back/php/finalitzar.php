<?php
    session_start();

    $rebreJsonJS = file_get_contents('php://input');
    $data = json_decode($rebreJsonJS, true);

    if ($data === null) {
        echo("decodificació incorrecte");
        exit;
    } 

    foreach ($data as $entrada) {
        $pregunta = $entrada['pregunta'];
        $resposta = $entrada['resposta'];
    }

    echo json_encode(['success' => true]);