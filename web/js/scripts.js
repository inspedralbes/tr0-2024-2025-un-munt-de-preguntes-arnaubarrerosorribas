let data;
  fetch ('http://localhost/poreycto1_autoescuela/media/preguntas.json')
  .then (response => response.json())
  .then (data =>{
    console.log(data)
    pintaPreguntes(data);
  })


function pintaPreguntes(data){
  let htmlString = '';
  
  for (let bucle_options = 0; bucle_options < data.preguntes.length; bucle_options++) {
    let opcions = data.preguntes[bucle_options].respostes_incorrectes.slice();  
    let respostaCorrecta = data.preguntes[bucle_options].resposta_correcta;
    let imatge = data.preguntes[bucle_options].imatge;
    
      htmlString += `<h3>${data.preguntes[bucle_options].pregunta}</h3>`;
      htmlString += `<img src="${imatge}" alt="Pregunta imagen"><br>`;
  
      opcions.push(respostaCorrecta);
      opcions = opcions.sort(() => Math.random() - 0.5);
  
  
      for (let index = 0; index < opcions.length; index++) {
          // Verificamos si la opción actual es la correcta
          let esCorrecta = opcions[index] === respostaCorrecta;
          htmlString += `<button onclick="hasPulsado(${esCorrecta})">${opcions[index]}</button><br>`; 
          console.log(`pregunta ${bucle_options+1} de la opcio ${index+1}`)  
      }
  }
  
  const divPartida = document.getElementById("partida");
  divPartida.innerHTML=htmlString;
}



function hasPulsado(esCorrecta) {
  if (esCorrecta) console.log(`Correcte`);
  else console.log(`Incorrecte`)
}