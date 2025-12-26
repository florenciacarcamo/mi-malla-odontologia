function marcar(id) {
    const ramo = document.getElementById(id);
    ramo.classList.toggle('aprobado');
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
            } else {
                r.classList.add('bloqueado');
                r.classList.remove('aprobado');
            }
        }
        if (r.classList.contains('aprobado')) contador++;
    });

    document.getElementById('contador').innerText = contador;
    const porcentaje = ((contador / ramos.length) * 100).toFixed(1);
    document.getElementById('porcentaje').innerText = porcentaje;
    document.getElementById('progress-fill').style.width = porcentaje + "%";
}

window.onload = actualizarMalla;
