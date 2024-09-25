fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-arnaubarrerosorribas/back/php/finalitzar.php')
    .then(response => response.json())
    .then(data => {
        preguntes = data;
        pintaPreguntes(preguntaActual);
    });