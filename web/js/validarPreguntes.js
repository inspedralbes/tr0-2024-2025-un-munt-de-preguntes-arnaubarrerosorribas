fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/finalitzar.php')
    .then(response => response.json())
    .then(correctas => {
        pintarResultat(correctas);
    });

    console.log("El numero ha sigut revut correctament");
    
function pintarResultat(correctas) {
    let htmlString = `<h2> Respuestas correctas: ${correctas} </h2>`;

    document.write($correctas)
    //const divPartida = document.getElementById("resultat");
    //divPartida.innerHTML = htmlString;
}