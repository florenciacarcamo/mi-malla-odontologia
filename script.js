window.onload = function() {
    const data = JSON.parse(localStorage.getItem('mallaOdontoUC')) || [];
    data.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.classList.add('aprobado');
    });
    actualizarMalla();
};

function marcar(id) {
    const el = document.getElementById(id);
    el.classList.toggle('aprobado');
    const aprobados = Array.from(document.querySelectorAll('.ramo.aprobado')).map(r => r.id);
    localStorage.setItem('mallaOdontoUC', JSON.stringify(aprobados));
    actualizarMalla();
}

function actualizarMalla() {
    const ramos = document.querySelectorAll('.ramo');
    let count = 0;
    let totalCr = 0;
    
    ramos.forEach(r => {
        const req = r.getAttribute('data-req');
        if(req) {
            const pre = document.getElementById(req);
            if(pre && pre.classList.contains('aprobado')) {
                r.classList.remove('bloqueado');
            } else {
                r.classList.add('bloqueado');
                r.classList.remove('aprobado');
            }
        }
        if(r.classList.contains('aprobado')) {
            count++;
            totalCr += parseInt(r.getAttribute('data-cr') || 0);
        }
    });
    
    const porc = ((count / ramos.length) * 100).toFixed(1);
    document.getElementById('porcentaje').innerText = porc;
    document.getElementById('creditos').innerText = totalCr;
    document.getElementById('progress-fill').style.width = porc + "%";
}

function reiniciarMalla() {
    if(confirm("¿Seguro quieres reiniciar tu progreso?")) {
        localStorage.removeItem('mallaOdontoUC');
        location.reload();
    }
}
