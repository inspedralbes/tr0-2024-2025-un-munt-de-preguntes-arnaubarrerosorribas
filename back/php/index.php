<?php
    session_start();

    // Inicializar el contador de respuestas correctas
    if (!isset($_SESSION['respostesCorrectes'])) {
        $_SESSION['respostesCorrectes'] = 0;
    }

    // Cargar les preguntes si no están a la sesión
    if (!isset($_SESSION['preguntes'])) {
        $informacio = file_get_contents("http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/listado.json");
        $preguntes_decode = json_decode($informacio, true);

        $preguntes = $preguntes_decode['preguntes'];
        shuffle($preguntes);
        $_SESSION['preguntes'] = array_slice($preguntes, 0, 10); // Guardar las 10 preguntas aleatoriamente
    }

    $preguntes = $_SESSION['preguntes']; // Recuperar preguntas

    //  índex pregunta actual
    if (isset($_SESSION['currentQuestionIndex'])) {
        $currentQuestionIndex = $_SESSION['currentQuestionIndex'];
    } else {
        $currentQuestionIndex = 0;
    }

    // Inicializar la variable $preguntaActual
    if (isset($preguntes[$currentQuestionIndex])) {
        $preguntaActual = $preguntes[$currentQuestionIndex];
    } else {
        $preguntaActual = null;
    }

    // Verificar si se ha enviado una respuesta
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $respuestaUsuario = $_POST['resposta'];
        $indexPregunta = $_POST['index'];

        // Verificar si la respuesta es correcta
        if ($preguntes[$indexPregunta]['resposta_correcta'] === $respuestaUsuario) {
            $_SESSION['respostesCorrectes']++;
            echo "<p>Resposta correcta Mr. Champion</p>";
        } else {
            echo "<p>Resposta incorrecte</p>";
        }

        
        $_SESSION['currentQuestionIndex'] = $currentQuestionIndex + 1; // Avanzar

        // Verificar si hay más preguntas
        if ($_SESSION['currentQuestionIndex'] >= count($preguntes)) {
            echo "<p>Has completado todas las preguntas.</p>";
            echo "<p>Respuestas correctas: " . $_SESSION['respostesCorrectes'] . "</p>";
            echo "<a href='?reset=1'>Reiniciar juego</a>";
            exit();
        }

        $currentQuestionIndex = $_SESSION['currentQuestionIndex'];
        if (isset($preguntes[$currentQuestionIndex])) {
            $preguntaActual = $preguntes[$currentQuestionIndex];
        } else {
            $preguntaActual = null;
        }
    }

    if (isset($_GET['reset'])) {
        include ("reset.php");
    }
