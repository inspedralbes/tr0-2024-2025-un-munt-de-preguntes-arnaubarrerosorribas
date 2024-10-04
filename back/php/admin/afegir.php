<?php
    include("../conn.php");

    $enunciat = $_GET['enunciat'];
    $p1 = $_GET['p1'];
    $p2 = $_GET['p2'];
    $p3 = $_GET['p3'];
    $pCorrecta = $_GET['pCorrecta'];
    $imgLink = $_GET['imgLink'];

    $sql = "INSERT INTO total (enunciat, p1, p2, p3, pCorrecte, imatge) 
            VALUES ('$enunciat', '$p1', '$p2', '$p3', '$pCorrecta', '$imgLink')";

    if (mysqli_query($conn_db, $sql)) {
        echo "Pregunta afegida correctament";
    } else {
        echo "La pregunta no s'ha pogut afegir correctament";
    }

    mysqli_close($conn_db);