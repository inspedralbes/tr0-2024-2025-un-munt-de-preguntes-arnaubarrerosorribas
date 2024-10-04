let intervalTemps;
let preguntaActual = 0;
let jsonPreguntes = [];
let tempsRestant = 30;
let numPreguntesSeleccionades = localStorage.getItem('numPreguntes') || 10; 

fetch('../back/php/getPreguntes.php')
    .then(response => response.json())
    .then(data => {
        preguntes = data.slice(0, numPreguntesSeleccionades); 
        pintaPreguntes();
        iniciarTemporizador(); 
    });


function pintaPreguntes() {
    let htmlString = '';

    if (preguntes.length > 0) {
        const pregunta = preguntes[preguntaActual];

        htmlString += `<div id="total">`;
            htmlString += `<div id="divBotonesFlechas">`;
                htmlString += `<button id="anteriorButton"> ⇦ </button>`;
                htmlString += `<p> ${preguntaActual + 1} / ${preguntes.length}</p>`;
                htmlString += `<button id="siguienteButton"> ⇨ </button>`;
            htmlString += `</div>`;

            htmlString += `<img src="${pregunta.imatge}">`;

            htmlString += `<div class="pregunta">`;
                htmlString += `<p>${pregunta.enunciat}</p>`;

                pregunta.opcions.forEach(opcio => {
                    htmlString += `<button class="botonPregunta" data-opcio="${opcio}" data-id-pregunta="${pregunta.id_pregunta}">${opcio}</button>`;
                });
            htmlString += `</div>`;
        htmlString += `</div>`;
    }

    htmlString += `<p id="contadorTiempo">${tempsRestant}s</p>`;
    htmlString += `<button id="finalizarButton">Finalitzar Test</button>`;

    const divPartida = document.getElementById("preguntes");
    divPartida.innerHTML = htmlString;

    document.getElementById("anteriorButton").addEventListener("click", anterior);
    document.getElementById("siguienteButton").addEventListener("click", siguiente);
    document.getElementById("finalizarButton").addEventListener("click", finalitzarTest);

    const botonesPregunta = document.querySelectorAll(".botonPregunta");
    botonesPregunta.forEach(boton => {
        boton.addEventListener("click", function() {
            const opcio = this.getAttribute("data-opcio");
            const idPregunta = this.getAttribute("data-id-pregunta");
            hasClicat(opcio, idPregunta);
        });
    });
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
    clearInterval(intervalTemps); 
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
    htmlString += `<button id="reiniciarButton">Reiniciar Test</button>`;

    const divPartida = document.getElementById("preguntes");
    divPartida.innerHTML = htmlString;
    divPartida.style.display = "block";

    document.getElementById("reiniciarButton").addEventListener("click", reiniciarTest);
}

function reiniciarTest() {
    pintaPreguntes();
    location.reload();
    tempsRestant = 30;
    preguntaActual = 0;
    jsonPreguntes = [];
    iniciarTemporizador(); 
    clearInterval(intervalTemps);
}

function iniciarTemporizador() {
    clearInterval(intervalTemps);
    

    intervalTemps = setInterval(() => {
        tempsRestant--;
        document.getElementById("contadorTiempo").innerText = `${tempsRestant}s`;

        if (tempsRestant <= 0) {
            clearInterval(intervalTemps); 
            finalitzarTest(); 
        }
    }, 1000);
}
