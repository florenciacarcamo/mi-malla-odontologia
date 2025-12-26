// Al cargar la página, recupera el progreso guardado
window.onload = function() {
    const guardado = JSON.parse(localStorage.getItem('mallaOdontoProgreso')) || [];
    
    guardado.forEach(id => {
        const ramo = document.getElementById(id);
        if (ramo) ramo.classList.add('aprobado');
    });

    actualizarMalla();
};

function marcar(id) {
    const ramo = document.getElementById(id);
    ramo.classList.toggle('aprobado');
    
    // Guardar el estado actual
    guardarProgreso();
    actualizarMalla();
}

function guardarProgreso() {
    const aprobados = document.querySelectorAll('.ramo.aprobado');
    const listaIds = Array.from(aprobados).map(r => r.id);
    localStorage.setItem('mallaOdontoProgreso', JSON.stringify(listaIds));
}

function actualizarMalla() {
    const ramos = document.querySelectorAll('.ramo');
    let contador = 0;

    ramos.forEach(r => {
        const reqId = r.getAttribute('data-req');
        if (reqId) {
            const req = document.getElementById(reqId);
            if (req && req.classList.contains('aprobado')) {
                r.classList.remove('bloqueado');
            } else {
                r.classList.add('bloqueado');
                r.classList.remove('aprobado');
            }
        }
        if (r.classList.contains('aprobado')) contador++;
    });

    // Actualizar números y barra
    document.getElementById('contador').innerText = contador;
    const porcentaje = ((contador / ramos.length) * 100).toFixed(1);
    document.getElementById('porcentaje').innerText = porcentaje;
    document.getElementById('progress-fill').style.width = porcentaje + "%";
}

function reiniciarMalla() {
    if(confirm("¿Seguro que quieres borrar todo tu progreso?")) {
        localStorage.removeItem('mallaOdontoProgreso');
        location.reload();
    }
}
