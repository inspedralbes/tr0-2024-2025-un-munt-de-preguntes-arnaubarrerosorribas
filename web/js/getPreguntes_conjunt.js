fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/getPreguntes.php')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        pintaPreguntes(data);
    })


function pintaPreguntes(data) {
    let htmlString = ''; 
    let preguntes = data;

    preguntes.forEach(pregunta => {
        //console.log(pregunta.pregunta);
        htmlString += `<div id="total"><h2>${pregunta.pregunta}</h2>`; 
        htmlString += `<img src="${pregunta.imatge}">`;

        pregunta.respostes.forEach(resposta => {
            htmlString += `<button>${resposta}</button>`;
        });
        htmlString += `</div>`;
    });

    const divPartida = document.getElementById("preguntes");
    divPartida.innerHTML = htmlString;
}
