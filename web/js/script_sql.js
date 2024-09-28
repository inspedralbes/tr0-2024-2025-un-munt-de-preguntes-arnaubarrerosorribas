let preguntaActual = 0;
let jsonPreguntes = [];

fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/getPreguntes_sql.php')
    .then(response => response.json())
    .then(data => {
        preguntes = data;
        pintaPreguntes();
    });

function pintaPreguntes() {
    let htmlString = '';

    if (preguntes.length > 0) {
        const pregunta = preguntes[preguntaActual];

        htmlString += `<div id="divBotonesFlechas">`;
        htmlString += `<button onclick="anterior()"> ⇦ </button>`;
        htmlString += `<p> ${preguntaActual + 1} / ${preguntes.length}</p>`;
        htmlString += `<button onclick="siguiente()"> ⇨ </button>`;
        htmlString += `</div>`;

        htmlString += `<div class="pregunta">`;
        htmlString += `<p>Pregunta ${pregunta.id_pregunta}: ${pregunta.enunciat}</p>`;
        htmlString += `<ul>`;

        pregunta.opcions.forEach(opcio => {
            htmlString += `<li><button id="botonPregunta" onclick="hasClicat('${opcio}', '${pregunta.id_pregunta}')">${opcio}</button></li>`;
        });

        htmlString += `</ul>`;
        htmlString += `</div>`;
    }

    htmlString += `<button onclick="finalitzarTest()">Finalitzar Test</button>`;

    const divPartida = document.getElementById("preguntes");
    divPartida.innerHTML = htmlString;
}

function hasClicat(resposta, id_pregunta) {
    //Comprovar si existeix una pregunta igual al JSON
    const NumeroPregunta = jsonPreguntes.findIndex(novaEntrada => novaEntrada.pregunta === id_pregunta);
    if (NumeroPregunta !== -1)  jsonPreguntes.splice(NumeroPregunta, 1);

    jsonPreguntes.push({
        pregunta: id_pregunta,
        resposta: resposta
    });

    console.log(JSON.stringify(jsonPreguntes));
}

function siguiente() {
    if (preguntaActual < preguntes.length - 1) {
        preguntaActual++;
        pintaPreguntes();
    }
}

function anterior() {
    if (preguntaActual > 0) {
        preguntaActual--;
        pintaPreguntes();
    }
}


function finalitzarTest() {
    jocFinalitzatExecutat = true;

    console.log("Preguntas enviades al servidor");
    fetch("http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/finalitzar.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(jsonPreguntes) 
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log("Datos recibidos");         
    });

    const PrimerDiv = document.getElementById('preguntes');
    PrimerDiv.style.display = 'none';
}
