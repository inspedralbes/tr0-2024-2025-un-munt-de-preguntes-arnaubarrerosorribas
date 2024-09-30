 /*let preguntaActual = 0;
let jsonPreguntes = [];

fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/getPreguntes.php')
    .then(response => response.json())
    .then(data => {
        preguntes = data;
        pintaPreguntes();
    });

function pintaPreguntes() {
    let htmlString = '';

    if (preguntes.length > 0) {
        const pregunta = preguntes[preguntaActual];

        htmlString +=`<div id="total">`;
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

    htmlString += `<button onclick="finalitzarTest()" id="botonFinalitzar">Finalitzar Test</button>`;

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
    fetch("http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/finalitzar.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(jsonPreguntes) 
    }) .then(function(response) {
        return response.text();
    }) .then(function(data) {
        const jsonData = JSON.parse(data);
        mostrarResultat(jsonData.correctas,jsonData.incorrectes,jsonData.preguntaIncorrecte);
    })    

    const PrimerDiv = document.getElementById('preguntes');
    PrimerDiv.style.display = 'none';
}

function mostrarResultat(correctas, incorrectes, preguntaIncorrecte) {
    let htmlString = `<h1>Preguntes correctes: ${correctas}</h1>`;

    for (let i = 0; i < incorrectes.length; i++) {
        htmlString += `<p>Pregunta fallada: ${preguntaIncorrecte[i]}</p>`;
        htmlString += `<p>La resposta correcte: ${incorrectes[i]}</p>`;
    }
    htmlString += `<button onclick="reiniciarTest()">Reiniciar Test</button>`;

    const divPartida = document.getElementById("preguntes");
    divPartida.innerHTML = htmlString;
    divPartida.style.display = "block"; 
}

function reiniciarTest(){
    preguntaActual = 0; 
    jsonPreguntes = []; 
    pintaPreguntes();
}*/

let preguntaActual = 0;
let jsonPreguntes = [];

fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/getPreguntes.php')
    .then(response => response.json())
    .then(data => {
        preguntes = data;
        pintaPreguntes();
    });

function pintaPreguntes() {
    let htmlString = '';

    if (preguntes.length > 0) {
        const pregunta = preguntes[preguntaActual];

        htmlString += `<div id="total">`;
                htmlString += `<div id="divBotonesFlechas">`;
                    htmlString += `<button id="botonAnterior"> ⇦ </button>`;
                    htmlString += `<p> ${preguntaActual + 1} / ${preguntes.length}</p>`;
                    htmlString += `<button id="botonSiguiente"> ⇨ </button>`;
                htmlString += `</div>`;

            htmlString += `<img src="${pregunta.imatge}">`;

            htmlString += `<div class="pregunta">`;
                htmlString += `<p>${pregunta.enunciat}</p>`;

                pregunta.opcions.forEach(opcio => {
                    htmlString += `<button class="botonPregunta" data-opcio="${opcio}" data-id="${pregunta.id_pregunta}">${opcio}</button>`;
                });

            htmlString += `</div>`;
        htmlString += `</div>`;
    }

    htmlString += `<button id="botonFinalitzar">Finalitzar Test</button>`;

    const divPartida = document.getElementById("preguntes");
    divPartida.innerHTML = htmlString;

    // event listeners
    document.getElementById("botonAnterior").addEventListener("click", anterior);
    document.getElementById("botonSiguiente").addEventListener("click", siguiente);
    document.getElementById("botonFinalitzar").addEventListener("click", finalitzarTest);

    // Afegir event listeners a les opcions de resposta
    const botonesOpcions = document.querySelectorAll('.botonPregunta');
    botonesOpcions.forEach(boton => {
        boton.addEventListener("click", () => {
            const resposta = boton.getAttribute("data-opcio");
            const idPregunta = boton.getAttribute("data-id");
            hasClicat(resposta, idPregunta);
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
    fetch("http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/finalitzar.php", {
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
        htmlString += `<p>La resposta correcte: ${incorrectes[i]}</p>`;
    }
    htmlString += `<button id="reiniciarTest">Reiniciar Test</button>`;

    const divPartida = document.getElementById("preguntes");
    divPartida.innerHTML = htmlString;
    divPartida.style.display = "block";

    // Afegir event listener per reiniciar el test
    document.getElementById("reiniciarTest").addEventListener("click", reiniciarTest);
}

function reiniciarTest() {
    preguntaActual = 0;
    jsonPreguntes = [];
    pintaPreguntes();
}
