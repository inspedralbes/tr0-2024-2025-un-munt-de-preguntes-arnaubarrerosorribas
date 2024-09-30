fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/get_admin.php')
    .then(response => response.json())
    .then(data => {
        preguntes = data;
        pintaPreguntes();
    });

function pintaPreguntes() {
    let htmlString = '';

    htmlString += `<button id="addQuestionBtn">Afegir una nova pregunta</button>`;

    preguntes.forEach(entrada => {
        htmlString += `<div class="question-entry">`;
        htmlString += `<p>${entrada.id_pregunta}</p>`;
        htmlString += `<b>Pregunta: ${entrada.enunciat}</b><br>`;
        htmlString += `<b>Resposta Correcta: ${entrada.pCorrecte}</b>`;
        htmlString += `<p>${entrada.p1}</p>`;
        htmlString += `<p>${entrada.p2}</p>`;
        htmlString += `<p>${entrada.p3}</p>`;
        htmlString += `<p style="border-bottom: 2px solid black;">${entrada.imatge}</p>`;
        htmlString += `<button onclick="editEntry(${entrada.id_pregunta})">Editar</button>`;
        htmlString += `</div>`;
    });

    const divPartida = document.getElementById("total");
    divPartida.innerHTML = htmlString;
}