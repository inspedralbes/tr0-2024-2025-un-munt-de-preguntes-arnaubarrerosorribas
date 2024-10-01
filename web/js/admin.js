fetch('../back/php/get_admin.php')
    .then(response => response.json())
    .then(data => {
        preguntes = data;
        pintaPreguntes();
    });

function formulari(){
    let htmlString = '';

    htmlString += '<form action="../back/php/admin/afegir.php">'; 
        htmlString += '<input type="text" name="enunciat" placeholder="Enunciat">';
        htmlString += '<input type="text" name="pCorrecta" placeholder="Resposta correcta">';
        htmlString += '<input type="text" name="p1" placeholder="resposta1">';
        htmlString += '<input type="text" name="p2" placeholder="resposta3">';
        htmlString += '<input type="text" name="p3" placeholder="resposta2">';
        htmlString += '<input type="text" name="imgLink" placeholder="Enllaç imatge">';
        htmlString += '<input type="submit" value="Publicar Pregunta">';
    htmlString += '</form>';

    const divFormulari = document.getElementById("formulari");
    divFormulari.innerHTML = htmlString;
}
    

function pintaPreguntes() {
    let htmlString = '';

    htmlString += `<button id="addQuestionBtn" onclick="formulari()">Afegir una nova pregunta</button>`;

    htmlString += `<table>`;
    preguntes.forEach(entrada => {
        htmlString += `<tr>`;
            htmlString += `<td>${entrada.id_pregunta}</td>`;
            htmlString += `<td style="width:200px;"><b>${entrada.enunciat}</b></td>`;
            htmlString += `<td><b>${entrada.pCorrecte}</b></td>`;
            htmlString += `<td>${entrada.p1}</td>`;
            htmlString += `<td>${entrada.p2}</td>`;
            htmlString += `<td>${entrada.p3}</td>`;
            htmlString += `<td><img src="${entrada.imatge}" style="max-width:100px;"></td>`;
            htmlString += `<td><button onclick="eliminarEntrada(${entrada.id_pregunta})">Eliminar</button></td>`;
            htmlString += `<td><button>Editar</button></td>`;
        htmlString += `</tr>`;
    });
    htmlString += `</table>`;
    

    const divPartida = document.getElementById("total");
    divPartida.innerHTML = htmlString;
}

function eliminarEntrada(id_pregunta) {
    fetch('../back/php/admin/eliminar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id_pregunta=${id_pregunta}`
    })
    .then(response => response.text()) 
    .then(data => {
        console.log(data); 
            pintaPreguntes();
    })
}
