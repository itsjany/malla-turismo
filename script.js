document.addEventListener('DOMContentLoaded', () => {
  const materias = document.querySelectorAll('.materia');

  // Al iniciar, bloquea materias que no están en el primer semestre
  materias.forEach(materia => {
    const semestre = materia.closest('.semestre').dataset.semestre;
    if (semestre !== "1") {
      materia.classList.add('bloqueada');
      materia.disabled = true;
    }
  });

  materias.forEach(materia => {
    materia.addEventListener('click', () => {
      if (materia.classList.contains('bloqueada')) return;

      if (materia.classList.contains('aprobada')) {
        // Desmarcar aprobada
        materia.classList.remove('aprobada');
        desbloquearMaterias(materia.dataset.abre, false);
      } else {
        // Marcar como aprobada
        materia.classList.add('aprobada');
        desbloquearMaterias(materia.dataset.abre, true);
      }
    });
  });

  function desbloquearMaterias(lista, desbloquear) {
    if (!lista) return;
    const materiasParaDesbloquear = lista.split(',').map(m => m.trim());

    materiasParaDesbloquear.forEach(nombre => {
      const materiaObj = document.querySelector(`.materia[data-materia="${nombre}"]`);
      if (materiaObj) {
        if (desbloquear) {
          materiaObj.classList.remove('bloqueada');
          materiaObj.disabled = false;
        } else {
          materiaObj.classList.add('bloqueada');
          materiaObj.disabled = true;
          materiaObj.classList.remove('aprobada');
          // También deberías bloquear las materias que dependen de esta recursivamente
          desbloquearMaterias(materiaObj.dataset.abre, false);
        }
      }
    });
  }
});
