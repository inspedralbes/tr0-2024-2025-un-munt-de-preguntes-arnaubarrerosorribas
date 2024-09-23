let preguntes = [];
let jsonPreguntes = [];
let preguntaActual = 0;

fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/getPreguntes.php')
    .then(response => response.json())
    .then(data => {
        preguntes = data;
        pintaPreguntes(preguntaActual);
    });

function pintaPreguntes(index) {
    let htmlString = '';
    
    if (preguntes.length > 0) {
        const pregunta = preguntes[index];

        htmlString += `<div id="divBotonesFlechas">`;
            htmlString += `<button onclick="anterior()">  ← </button>`;
            htmlString += `<button onclick="siguiente()"> → </button>`;
        htmlString += `</div>`;

        htmlString += `<div id="total">`;
        htmlString += `<h2>${pregunta.pregunta}</h2>`;
        if (pregunta.imatge) {
            htmlString += `<img src="${pregunta.imatge}">`;
        }

        pregunta.respostes.forEach((resposta) => {
            htmlString += `<button onclick="hasClicat(${pregunta.id_pregunta},'${resposta}')">${resposta}</button>`;
        });
        htmlString += `</div>`;
    }

    const divPartida = document.getElementById("preguntes");
    divPartida.innerHTML = htmlString;
}

function siguiente() {
    if (preguntaActual < preguntes.length - 1) {
        preguntaActual++;
        pintaPreguntes(preguntaActual);
    }
}

function anterior() {
    if (preguntaActual > 0) {
        preguntaActual--;
        pintaPreguntes(preguntaActual);
    }
}

function hasClicat(pregunta, resposta) {
    jsonPreguntes.push({
        pregunta: pregunta,
        resposta: resposta
    });

    console.log(JSON.stringify(jsonPreguntes));
}