<?php
    $correctas = 0;
    
    //RESPUESTAS USUARIO
    $import = file_get_contents("php://input");
    $data = json_decode($import, true);

    //JSON ORIGINAL
    $informacio = file_get_contents("http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/listado.json");
    $preguntes_originals_decode = json_decode($informacio, true);
    $preguntes_originals = $preguntes_originals_decode['preguntes'];

    
    sort($data);
    foreach ($data as $index){
        echo $index;
    }
    echo "Respostes ordenades correctament";