<?php
    include("../conn.php");

    if (isset($_POST['id_pregunta'])) {
        $id_pregunta = intval($_POST['id_pregunta']); 

        if ($id_pregunta > 0) {
            $sql = "DELETE FROM total WHERE id_pregunta = $id_pregunta";

            if (mysqli_query($conn_db, $sql)) {
                echo "Entrada eliminada correctament";
            } else {
                echo "L'entrada no s'ha eliminat correctament";
            }
        } else {
            echo "ID de pregunta no válido.";
        }
    }

    mysqli_close($conn_db);