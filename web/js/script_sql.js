let preguntaActual = 0;

fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/getPreguntes_sql.php')
    .then(response => response.json())
    .then(data => {
        preguntes = data;
        pintaPreguntes();
    })


    function pintaPreguntes() {
    let htmlString = '';

    if (preguntes.length>0){
        //preguntes.forEach((pregunta) => {
        const pregunta = preguntes[preguntaActual];

        htmlString += `<div id="divBotonesFlechas">`;
            htmlString += `<button onclick="anterior()">  ⇦ </button>`;
            htmlString += `<p> ${preguntaActual + 1} / 10</p>`;
            htmlString += `<button onclick="siguiente()"> ⇨ </button>`;
        htmlString += `</div>`;

        htmlString += `<div class="pregunta">`;
        htmlString += `<p>Pregunta ${pregunta.id_pregunta}: ${pregunta.enunciat}</p>`;
        htmlString += `<ul>`;
        
        pregunta.opcions.forEach(opcio => {
            htmlString += `<li><button onclick="hasClicat('${opcio}')">${opcio}</button></li>`;
        });
        
        htmlString += `</ul>`;
        htmlString += `</div>`;
    };

    const divPartida = document.getElementById("preguntes");
    divPartida.innerHTML = htmlString;
}

function hasClicat(pregunta){
    console.log(`${pregunta}`);
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