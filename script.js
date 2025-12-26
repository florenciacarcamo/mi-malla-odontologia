function marcar(id) {
    const ramo = document.getElementById(id);
    
    // Si ya está aprobado, solo lo quitamos
    if (ramo.classList.contains('aprobado')) {
        ramo.classList.replace('aprobado', 'disponible');
    } else {
        ramo.classList.replace('disponible', 'aprobado');
    }
    
    actualizarMalla();
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
                if (!r.classList.contains('aprobado')) r.classList.add('disponible');
            } else {
                r.classList.add('bloqueado');
                r.classList.remove('disponible', 'aprobado');
            }
        }
        if (r.classList.contains('aprobado')) contador++;
    });

    // Actualizar interfaz
    document.getElementById('contador').innerText = contador;
    const porcentaje = ((contador / ramos.length) * 100).toFixed(1);
    document.getElementById('porcentaje').innerText = porcentaje;
    document.getElementById('progress-fill').style.width = porcentaje + "%";
}

function reiniciarMalla() {
    if(confirm("¿Reiniciar progreso?")) location.reload();
}

// Ejecutar al cargar para bloquear semestres avanzados
window.onload = actualizarMalla;
