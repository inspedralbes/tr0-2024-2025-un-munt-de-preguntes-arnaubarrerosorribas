<?php
    include("conn.php");

    
    $sql = "SELECT * FROM total";
    $result = $conn_db->query($sql);
    
    $preguntasArray = [];
    
    //FETCH_ASSOC = obtener una fila de resultados de la consulta
    while ($columna = $result->fetch_assoc()) {
        $opcions = [$columna['p1'], $columna['p2'], $columna['p3'], $columna['pCorrecte']];
        shuffle($opcions);
        
        $preguntasArray[] = [
            "id_pregunta" => $columna['id_pregunta'],
            "enunciat" => $columna['enunciat'],
            "opcions" => $opcions,
            "resposta_correcta" => $columna['pCorrecte'],
            "imatge" => $columna['imatge']
        ];
    }
    
    shuffle($preguntasArray);
    $_SESSION['preguntes'] = array_slice($preguntasArray, 0, 10);
    $enunciats = $_SESSION['preguntes'];

    echo json_encode($enunciats);