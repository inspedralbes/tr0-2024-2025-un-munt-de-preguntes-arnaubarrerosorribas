function inicialitzaPagina() {
    const nomGuardat = localStorage.getItem('nomUsuari');

    if (nomGuardat) {
        document.getElementById('nomUsuari').innerText = nomGuardat;
        document.getElementById('benvinguda').classList.remove('hidden');
        document.getElementById('esborraNomBtn').classList.remove('hidden');
        document.getElementById('opcions').classList.remove('hidden');
        document.getElementById('numPreguntes').classList.remove('hidden');
    } else {
        document.getElementById('nom').classList.remove('hidden');
    }
}

document.getElementById('comencaBtn').addEventListener('click', function () {
    const nom = document.getElementById('nom').value;

    if (!localStorage.getItem('nomUsuari') && nom) {
        localStorage.setItem('nomUsuari', nom);
        document.getElementById('nomUsuari').innerText = nom;
        document.getElementById('benvinguda').classList.remove('hidden');
        document.getElementById('nom').classList.add('hidden');
        document.getElementById('opcions').classList.remove('hidden');
        document.getElementById('numPreguntes').classList.remove('hidden');
    } else if (!nom) {
        alert('Introdueix un nom');
    }
});

document.getElementById('jugarBtn').addEventListener('click', function () {
    const numPreguntes = document.getElementById('numPreguntes').value;

    if (numPreguntes && numPreguntes > 0) {
        localStorage.setItem('numPreguntes', numPreguntes); 
        window.location.href = 'index.html'; 
    } else {
        alert('Por favor, selecciona un número de preguntas válido.');
    }
});




document.getElementById('adminBtn').addEventListener('click', function () {
    window.location.href = 'admin.html';
});

document.getElementById('esborraNomBtn').addEventListener('click', function () {
    localStorage.removeItem('nomUsuari');
    location.reload();
});

window.onload = inicialitzaPagina;