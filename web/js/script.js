let intervalTemps;
let preguntaActual = 0;
let jsonPreguntes = [];
let tempsRestant = 30;

fetch('../back/php/getPreguntes.php')
    .then(response => response.json())
    .then(data => {
        preguntes = data;
        pintaPreguntes();
        iniciarTemporizador(); // Iniciar temporizador
    });

function pintaPreguntes() {
    let htmlString = '';

    if (preguntes.length > 0) {
        const pregunta = preguntes[preguntaActual];

        htmlString += `<div id="total">`;
            htmlString += `<div id="divBotonesFlechas">`;
                htmlString += `<button onclick="anterior()"> ⇦ </button>`;
                htmlString += `<p> ${preguntaActual + 1} / ${preguntes.length}</p>`;
                htmlString += `<button onclick="siguiente()"> ⇨ </button>`;
            htmlString += `</div>`;

            htmlString += `<img src="${pregunta.imatge}">`;

            htmlString += `<div class="pregunta">`;
                htmlString += `<p>${pregunta.enunciat}</p>`;

                pregunta.opcions.forEach(opcio => {
                    htmlString += `<button id="botonPregunta" onclick="hasClicat('${opcio}', '${pregunta.id_pregunta}')">${opcio}</button>`;
                });
            htmlString += `</div>`;
        htmlString += `</div>`;
    }

    htmlString += `<p id="contadorTiempo">${tempsRestant}s</p>`;
    htmlString += `<button onclick="finalitzarTest()" id="botonFinalitzar">Finalitzar Test</button>`;

    const divPartida = document.getElementById("preguntes");
    divPartida.innerHTML = htmlString;
}

function hasClicat(resposta, id_pregunta) {
    const NumeroPregunta = jsonPreguntes.findIndex(novaEntrada => novaEntrada.pregunta === id_pregunta);
    if (NumeroPregunta !== -1) jsonPreguntes.splice(NumeroPregunta, 1);

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
    clearInterval(intervalTemps); // Parar temporizador
    enviarResultados();
}

function enviarResultados() {
    fetch("../back/php/finalitzar.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(jsonPreguntes)
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        const jsonData = JSON.parse(data);
        mostrarResultat(jsonData.correctas, jsonData.incorrectes, jsonData.preguntaIncorrecte);
    });

    const PrimerDiv = document.getElementById('preguntes');
    PrimerDiv.style.display = 'none';
}

function mostrarResultat(correctas, incorrectes, preguntaIncorrecte) {
    let htmlString = `<h1>Preguntes correctes: ${correctas}</h1>`;

    for (let i = 0; i < incorrectes.length; i++) {
        htmlString += `<p>Pregunta fallada: ${preguntaIncorrecte[i]}</p>`;
        htmlString += `<p style="border-bottom:1px solid black;">La resposta correcte: ${incorrectes[i]}</p>`;
    }
    htmlString += `<button onclick="reiniciarTest()">Reiniciar Test</button>`;

    const divPartida = document.getElementById("preguntes");
    divPartida.innerHTML = htmlString;
    divPartida.style.display = "block";
}

function reiniciarTest() {
    pintaPreguntes();
    location.reload();
    tempsRestant = 30;
    preguntaActual = 0;
    jsonPreguntes = [];
    iniciarTemporizador(); //Reiniciar temporitzador 
    clearInterval(intervalTemps); // Borrar tot temporitzador penjat
}

function iniciarTemporizador() {
    clearInterval(intervalTemps); // Borrar tot temporitzador penjat

    intervalTemps = setInterval(() => {
        tempsRestant--;
        document.getElementById("contadorTiempo").innerText = `${tempsRestant}s`;

        if (tempsRestant <= 0) {
            clearInterval(intervalTemps); // Parar temporizador
            finalitzarTest(); // Finalizar test automáticamente
        }
    }, 1000);
}
