document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo');

  // Primero, bloquear todos
  ramos.forEach(ramo => {
    ramo.classList.add('bloqueado');
    ramo.classList.remove('aprobado');
    ramo.classList.remove('desbloqueado');
  });

  // Función para verificar si un ramo está desbloqueado
  function puedeDesbloquear(ramo) {
    const prerequisitosStr = ramo.dataset.prerequisitos.trim();
    if (!prerequisitosStr) return true; // Sin prerequisitos, desbloqueado

    const prerequisitos = prerequisitosStr.split(',').map(p => p.trim()).filter(p => p);
    // Para desbloquear, TODOS los prerequisitos deben estar aprobados
    return prerequisitos.every(pr => {
      const preRamo = document.querySelector(`.ramo[data-id="${pr}"]`);
      return preRamo && preRamo.classList.contains('aprobado');
    });
  }

  // Función para actualizar el estado de todos los ramos
  function actualizarEstados() {
    ramos.forEach(ramo => {
      if (ramo.classList.contains('aprobado')) {
        ramo.classList.remove('bloqueado');
        ramo.classList.remove('desbloqueado');
      } else if (puedeDesbloquear(ramo)) {
        ramo.classList.remove('bloqueado');
        ramo.classList.add('desbloqueado');
      } else {
        ramo.classList.add('bloqueado');
        ramo.classList.remove('desbloqueado');
      }
    });
  }

  actualizarEstados();

  // Evento click para aprobar ramos desbloqueados
  ramos.forEach(ramo => {
    ramo.addEventListener('click', () => {
      if (ramo.classList.contains('bloqueado')) return; // bloqueado no hace nada
      if (ramo.classList.contains('aprobado')) return; // ya aprobado, no hace nada

      // Aprobar el ramo
      ramo.classList.add('aprobado');
      ramo.classList.remove('desbloqueado');

      // Actualizar el estado de todos los ramos (para desbloquear los que dependan)
      actualizarEstados();
    });
  });
});
