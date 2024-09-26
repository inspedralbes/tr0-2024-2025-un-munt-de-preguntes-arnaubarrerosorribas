<?php
    $correctas = 0;
    $incorrectes = [];

    $import = file_get_contents("php://input");
    $data = json_decode($import, true);

    $informacio = file_get_contents("http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/listado.json");
    $preguntes_originals_decode = json_decode($informacio, true);
    $preguntes_originals = $preguntes_originals_decode['preguntes'];

    sort($data);
    foreach ($data as $pregunta) {
        foreach ($preguntes_originals as $originals) {
            if ($pregunta['pregunta'] === $originals['id_pregunta']) {
                if ($pregunta['resposta'] === $originals['resposta_correcta']) {
                    $correctas++;
                } else{
                    $incorrectes[] = $originals['pregunta'];
                }
                break;  
            }
        }
    }

    echo json_encode([
        "correctas" => $correctas,
        "incorrectes" => $incorrectes,
    ]);