<?php
include('conn.php');

$correctas = 0;
$incorrectes = [];
$resposta_correcta = [];

$import = file_get_contents("php://input");
$data = json_decode($import, true);

sort($data);

for ($i = 0; $i < count($data); $i++) {
    echo print_r($data[$i], true);
}

$consulta = "SELECT * FROM total";
$resultado = $conn_db->query($consulta);

$resultadosArray = [];
while ($fila = $resultado->fetch_assoc()) {
    $resultadosArray[] = $fila;
}

echo ("--------------------------------------------------------");

$correctas=0;
for ($i = 0; $i < count($data); $i++) {
    foreach ($resultadosArray as $resultat) {
        if ($data[$i]['pregunta'] === $resultat["id_pregunta"]) {
            $correctas++;
            break;
        }
    }
}

echo ("Hi han ".$correctas."correctes a la base de dades");
