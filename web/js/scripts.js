let data;
fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/listado.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    pintaPreguntes(data);
  })


function pintaPreguntes(data) {
  let htmlString = '';

  for (let bucle_options = 0; bucle_options < data.preguntes.length; bucle_options++) {
    let opcions = data.preguntes[bucle_options].respostes_incorrectes.slice();
    let respostaCorrecta = data.preguntes[bucle_options].resposta_correcta;
    let imatge = data.preguntes[bucle_options].imatge;

    htmlString += `<h3>${data.preguntes[bucle_options].pregunta}</h3>`;
    htmlString += `<img src="${imatge}"><br>`;

    opcions.push(respostaCorrecta);
    opcions = opcions.sort(() => Math.random() - 0.5);

    for (let index = 0; index < opcions.length; index++) {
      let esCorrecta = opcions[index] === respostaCorrecta;
      htmlString += `<button onclick="hasPulsado(${esCorrecta}, ${index}, ${bucle_options + 1})">${opcions[index]}</button><br>`;
    }
  }

  const divPartida = document.getElementById("partida");
  divPartida.innerHTML = htmlString;
}

function hasPulsado(esCorrecta, index, numPregunta) {
  if (esCorrecta) {
    console.log(`Correcte. Has clicat el boto ${index + 1} de la pregunta ${numPregunta}.`);
  } else {
    console.log(`Incorrecto. Has clicat el boto ${index + 1} de la pregunta ${numPregunta}.`);
  }
}