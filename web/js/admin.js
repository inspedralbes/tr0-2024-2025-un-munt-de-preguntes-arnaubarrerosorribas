fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/get_admin.php')
    .then(response => response.json())
    .then(data => {
        preguntes = data;
        pintaPreguntes();
    });

function pintaPreguntes(){
    let htmlString = '';


    preguntes.forEach(entrada => {
        htmlString += `<p>${entrada.id_pregunta}</p>`;
        htmlString += `<p>${entrada.enunciat}</p>`;
        htmlString += `<p>${entrada.p1}</p>`;
        htmlString += `<p>${entrada.p2}</p>`;
        htmlString += `<p>${entrada.p3}</p>`;
        htmlString += `<p>${entrada.pCorrecte}</p>`;
        htmlString += `<p>${entrada.imatge}</p>`;
    });

    const divPartida = document.getElementById("total");
    divPartida.innerHTML = htmlString;
}