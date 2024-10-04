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

    const divFormulari = document.getElementById("editar");
    divFormulari.innerHTML = htmlString;
}

function formulariEdiarPregunta(id_pregunta) {
    let htmlString = '';

    htmlString += `<p>Estás modificando la pregunta con el ID ${id_pregunta}</p>`;

    htmlString += `<input required type="text" name="anunciat" placeholder="Edita l'anunciat">`;
    htmlString += `<input required type="text" name="respostaCorrecta" placeholder="Resposta Correcta">`;
    htmlString += `<input required type="text" name="p1" placeholder="resposta1">`;
    htmlString += `<input required type="text" name="p2" placeholder="resposta2">`;
    htmlString += `<input required type="text" name="p3" placeholder="resposta3">`;
    htmlString += `<button onclick="generarJsonEditar(${id_pregunta})" type="button">Modificar Pregunta</button>`;

    const divModificar = document.getElementById("editar");
    divModificar.innerHTML = htmlString;
}

function generarJsonEditar(id_pregunta) {
    const anunciat = document.querySelector('input[name="anunciat"]').value;
    const respostaCorrecta = document.querySelector('input[name="respostaCorrecta"]').value;
    const p1 = document.querySelector('input[name="p1"]').value;
    const p2 = document.querySelector('input[name="p2"]').value;
    const p3 = document.querySelector('input[name="p3"]').value;

    // Crear l objete JSON
    const data = {
        id_pregunta: id_pregunta,
        anunciat: anunciat,
        respostaCorrecta: respostaCorrecta,
        p1: p1,
        p2: p2,
        p3: p3
    };

    fetch('../back/php/admin/editar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data) 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        pintaPreguntes();
    })
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
            htmlString += `<td>
                                <button class="btnAccion" onclick="eliminarEntrada(${entrada.id_pregunta})">Eliminar</button><br><br>
                                <button class="btnAccion" onclick="formulariEdiarPregunta(${entrada.id_pregunta})">Editar</button>
                            </td>`;
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
