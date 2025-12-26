function marcar(id) {
    const ramo = document.getElementById(id);
    ramo.classList.toggle('aprobado');
    ramo.classList.toggle('disponible');
    
    actualizarMalla();
}

function actualizarMalla() {
    const todos = document.querySelectorAll('.ramo');
    let aprobadosCount = 0;

    todos.forEach(ramo => {
        const reqId = ramo.getAttribute('data-req');
        if (reqId) {
            const req = document.getElementById(reqId);
            if (req.classList.contains('aprobado')) {
                ramo.classList.remove('bloqueado');
                if (!ramo.classList.contains('aprobado')) ramo.classList.add('disponible');
            } else {
                ramo.classList.add('bloqueado');
                ramo.classList.remove('disponible', 'aprobado');
            }
        }
        if (ramo.classList.contains('aprobado')) aprobadosCount++;
    });

    // Barra de progreso
    const total = todos.length;
    const porcentaje = ((aprobadosCount / total) * 100).toFixed(1);
    document.getElementById('porcentaje').innerText = porcentaje;
    document.getElementById('progress-fill').style.width = porcentaje + "%";
}

function reiniciarMalla() {
    if(confirm("¿Seguro que quieres reiniciar tu progreso?")) {
        location.reload();
    }
}
