<?php
    session_start();

    // Inicializar el contador de respuestas correctas
    if (!isset($_SESSION['respostesCorrectes'])) {
        $_SESSION['respostesCorrectes'] = 0;
    }

    // Cargar las preguntas
    if (!isset($_SESSION['preguntes'])) {
        $informacio = file_get_contents("http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/listado.json");
        $preguntes_decode = json_decode($informacio, true);
        $preguntes = $preguntes_decode['preguntes'];
        shuffle($preguntes);
        $_SESSION['preguntes'] = array_slice($preguntes, 0, 10);
    }

    $preguntes = $_SESSION['preguntes'];

    // Pregunta actual
    $preguntaActualIn = $_SESSION['preguntaActualIn'] ?? 0;
    $preguntaActual = $preguntes[$preguntaActualIn] ?? null;

    // Verificar si se ha enviado la respuesta
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['resposta'], $_POST['index'])) {
        $respuestaUsuario = $_POST['resposta'];
        $indexPregunta = $_POST['index'];

        if ($preguntes[$indexPregunta]['resposta_correcta'] === $respuestaUsuario) {
            $_SESSION['respostesCorrectes']++;
        }

        $_SESSION['preguntaActualIn']++;
        
        if ($_SESSION['preguntaActualIn'] >= count($preguntes)) {
            echo "<p>Respuestas correctas: " . $_SESSION['respostesCorrectes'] . "/10</p>";
            echo "<a href='?reset=1' id='buttonReset'>Reiniciar juego</a>";
            exit();
        }

        $preguntaActualIn = $_SESSION['preguntaActualIn'];
        $preguntaActual = $preguntes[$preguntaActualIn] ?? null;
    }

    if (isset($_GET['reset'])) {
        include ('reset.php');
    }