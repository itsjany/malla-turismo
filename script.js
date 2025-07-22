document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.materia');

    botones.forEach(boton => {
        if (!boton.classList.contains('bloqueada')) {
            boton.addEventListener('click', aprobar);
        }
    });

    function aprobar(event) {
        const boton = event.target;
        if (boton.classList.contains('bloqueada') || boton.classList.contains('aprobada')) return;

        boton.classList.add('aprobada');
        boton.disabled = true;

        const desbloquear = boton.getAttribute('data-desbloquea');
        if (desbloquear) {
            const materias = desbloquear.split(' ');
            materias.forEach(nombre => {
                const target = document.querySelector(`[data-materia="${nombre}"]`);
                if (target && target.classList.contains('bloqueada')) {
                    target.classList.remove('bloqueada');
                    target.addEventListener('click', aprobar);
                }
            });
        }
    }
});
