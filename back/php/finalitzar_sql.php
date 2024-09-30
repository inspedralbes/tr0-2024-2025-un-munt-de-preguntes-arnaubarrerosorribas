<?php
    include('conn.php');

    $correctas = 0;
    $incorrectes = [];
    $preguntaIncorrecte = [];
    
    $import = file_get_contents("php://input");
    $data = json_decode($import, true);

    sort($data);

    $consulta = "SELECT * FROM total";
    $resultado = $conn_db->query($consulta);

    $resultadosArray = [];
    while ($fila = $resultado->fetch_assoc()) {
        $resultadosArray[] = $fila;
    }

    $correctas=0;
    for ($i = 0; $i < count($data); $i++) {
        foreach ($resultadosArray as $resultat) {
            if ($data[$i]['pregunta'] === $resultat["id_pregunta"]) {
                if ($data[$i]['resposta'] === $resultat["pCorrecte"]){
                    $correctas++;
                } else {
                    $preguntaIncorrecte[] = $resultat["enunciat"];
                    $incorrectes[] = $resultat["pCorrecte"];
                }
            }
        }
    }

    for ($i = 0; $i < count($incorrectes); $i++) {
        echo $preguntaIncorrecte[$i];
        echo $incorrectes[$i];
    }


    echo json_encode([
        "correctas" => $correctas,
        "incorrectes" => $incorrectes,
        "preguntaIncorrecte" => $preguntaIncorrecte
    ])