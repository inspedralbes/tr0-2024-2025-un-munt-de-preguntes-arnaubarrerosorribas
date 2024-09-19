<?php
    session_start();

    if (!isset($_SESSION['preguntes'])) {
        $informacio = file_get_contents("http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/listado.json");
        $preguntes_decode = json_decode($informacio, true);
        $preguntes = $preguntes_decode['preguntes'];
        shuffle($preguntes);
        $_SESSION['preguntes'] = array_slice($preguntes, 0, 10);
    }

    // Obtener las preguntas de la sesión
    $preguntes = $_SESSION['preguntes'];
    $preguntes_respostes = [];

    foreach ($preguntes as $pregunta) {
        $respostes = array_merge([$pregunta['resposta_correcta']], $pregunta['respostes_incorrectes']);
        shuffle($respostes);
        $imatge = $pregunta['imatge'];

        $preguntes_respostes[] = [
            'pregunta' => $pregunta['pregunta'],
            'imatge' => $imatge,
            'respostes' => $respostes
        ];
    }

    echo json_encode($preguntes_respostes);