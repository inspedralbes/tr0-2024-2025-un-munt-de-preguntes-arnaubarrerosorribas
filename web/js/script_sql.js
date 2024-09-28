fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/getPreguntes_sql.php')
    .then(response => response.json())
    .then(data => {
        preguntes = data;
        pintaPreguntes();
    })


    function pintaPreguntes() {
    let htmlString = '';

    preguntes.forEach((pregunta) => {
        htmlString += `<div class="pregunta">`;
        htmlString += `<p>Pregunta ${pregunta.id_pregunta}: ${pregunta.enunciat}</p>`;
        htmlString += `<ul>`;
        
        pregunta.opcions.forEach(opcio => {
            htmlString += `<li><button onclick="hasClicat('${opcio}')">${opcio}</button></li>`;
        });
        
        htmlString += `</ul>`;
        htmlString += `</div>`;
    });

    const divPartida = document.getElementById("preguntes");
    divPartida.innerHTML = htmlString;
}

function hasClicat(pregunta){
    console.log(`${pregunta}`);
}