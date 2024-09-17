<?php
    unset($_SESSION['preguntes']);                  // Borrar les preguntes
    unset($_SESSION['currentQuestionIndex']);       // Elimina la pregunta actual
    $_SESSION['respostesCorrectes'] = 0;            // Actualitzar contador a 0
    header("Location: index.php");  
    exit();