<?php
    header('Content-Type: application/json');

    $correctas = 0;

    $import = file_get_contents("php://input");
    $data = json_decode($import, true);

    $informacio = file_get_contents("http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/listado.json");
    $preguntes_originals_decode = json_decode($informacio, true);
    $preguntes_originals = $preguntes_originals_decode['preguntes'];

    sort($data);
    foreach ($data as $index => $pregunta) {
        foreach ($preguntes_originals as $indexO => $originals){
            if ($pregunta['pregunta'] === $originals['id_pregunta']){
                if ($pregunta['resposta'] === $originals['resposta_correcta']){
                    $correctas++;
                }
            }
        }
    }

    // Devolver el valor como JSON
    echo json_encode(["correctas" => $correctas]);