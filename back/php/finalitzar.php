<?php
    $import = file_get_contents("php://input");
    $data = json_decode($import, true);
    
    echo "Dades importades correctament<br>";

    foreach ($data as $index) {
        echo "Pregunta ID: " . $index['pregunta'] . "<br>";
        echo "Resposta: " . $index['resposta'] . "<br>";
    }