fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/getPreguntes_sql.php')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        preguntes = data;
        pintaPreguntes(preguntaActual);
    })

function pintaPreguntes(index) {
    let htmlString = '';

    const pregunta = preguntes[index];
    htmlString = `<p> ${pregunta.texto} </p>`;

    const divPartida = document.getElementById("preguntes");
    divPartida.innerHTML = htmlString;
}
