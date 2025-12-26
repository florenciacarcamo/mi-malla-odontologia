function intentarAprobar(id) {
    const ramo = document.getElementById(id);
    const reqId = ramo.getAttribute('data-req');

    // REGLA DE PRERREQUISITO
    if (reqId) {
        const requisito = document.getElementById(reqId);
        if (!requisito.classList.contains('aprobado')) {
            alert("¡BLOQUEADO! Primero debes aprobar: " + requisito.innerText);
            return; // Detiene la función, no deja aprobar
        }
    }

    // Si pasa la regla o no tiene requisito, se aprueba
    ramo.classList.toggle('aprobado');
    ramo.classList.toggle('disponible');
    
    actualizarProgreso();
    desbloquearSiguientes();
}

function desbloquearSiguientes() {
    const todos = document.querySelectorAll('.ramo');
    todos.forEach(r => {
        const reqId = r.getAttribute('data-req');
        if (reqId) {
            const req = document.getElementById(reqId);
            if (req.classList.contains('aprobado')) {
                r.classList.remove('bloqueado');
                if (!r.classList.contains('aprobado')) r.classList.add('disponible');
            } else {
                r.classList.add('bloqueado');
                r.classList.remove('disponible', 'aprobado');
            }
        }
    });
}

function actualizarProgreso() {
    const total = document.querySelectorAll('.ramo').length;
    const aprobados = document.querySelectorAll('.aprobado').length;
    const porcentaje = Math.round((aprobados / total) * 100);
    document.getElementById('porcentaje').innerText = porcentaje;
}