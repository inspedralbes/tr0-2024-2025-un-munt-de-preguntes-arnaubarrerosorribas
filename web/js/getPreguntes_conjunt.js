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
            htmlString += `<button onclick="anterior()">  ⇦ </button>`;
            htmlString += `<p> ${preguntaActual +1} / 10</p>`;
            htmlString += `<button onclick="siguiente()"> ⇨ </button>`;
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
        htmlString += `<button id="botonFinalizar" onclick="jocFinalitzat()">Finalitza el test</button>`;
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
    const NumeroPregunta = jsonPreguntes.findIndex(novaEntrada => novaEntrada.pregunta === pregunta);

    if (NumeroPregunta !== -1) {
        jsonPreguntes.splice(NumeroPregunta, 1);  
    }

    jsonPreguntes.push({
        pregunta: pregunta,
        resposta: resposta
    });

    console.log(JSON.stringify(jsonPreguntes));
}

function jocFinalitzat() {
    console.log("Preguntas enviades al servidor");
    fetch("http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/finalitzar.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(jsonPreguntes) 
    }).then(function(response) {
        return response.json(); // Procesar la respuesta como JSON
    }).then(function(data) {
        console.log("Datos recibidos"); 
        pintarResultat(data.correctas);
        
    })

    // Ocultar las preguntas
    const PrimerDiv = document.getElementById('preguntes');
    PrimerDiv.style.display = 'none';
}

function pintarResultat(correctas) {
    let htmlString = `<h1> ${correctas} / 10</h1>`;
    const divPartida = document.getElementById("preguntes");

    divPartida.innerHTML = htmlString;
    divPartida.style.display = "block"; 
}
