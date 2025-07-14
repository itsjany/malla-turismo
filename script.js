// Cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo');

  // Inicializar: todos bloqueados menos los que no tienen prerequisitos (los primeros)
  ramos.forEach(ramo => {
    const desbloquea = ramo.dataset.desbloquea;
    // Si desbloquea algo, pero no está desbloqueado ni aprobado
    if (desbloquea) {
      ramo.classList.add('bloqueado');
    } else {
      // Si no desbloquea nada, pero es un ramo inicial, se desbloquea
      if (!ramo.dataset.id) return;
      // Permitimos que los primeros estén desbloqueados si no tienen prerequisitos
      ramo.classList.remove('bloqueado');
      ramo.classList.add('desbloqueado');
    }
  });

  // Método para desbloquear ramos cuando apruebas uno
  function desbloquear(ramoId) {
    ramos.forEach(ramo => {
      const prerequisitos = ramo.dataset.desbloquea ? ramo.dataset.desbloquea.split(',') : [];
      if (prerequisitos.includes(ramoId)) {
        if (!ramo.classList.contains('aprobado')) {
          ramo.classList.remove('bloqueado');
          ramo.classList.add('desbloqueado');
        }
      }
    });
  }

  // Para cada ramo, al hacer click
  ramos.forEach(ramo => {
    // Los ramos bloqueados no reaccionan
    ramo.addEventListener('click', () => {
      if (ramo.classList.contains('bloqueado')) return;

      // Si está aprobado, no hace nada
      if (ramo.classList.contains('aprobado')) return;

      // Cambia el estado a aprobado
      ramo.classList.add('aprobado');
      ramo.classList.remove('desbloqueado');

      // Desbloquea los ramos que dependen de este
      const id = ramo.dataset.id;
      desbloquear(id);
    });
  });

  // Para que los ramos iniciales se desbloqueen (los que no tienen prerequisitos)
  // Buscamos ramos que NO estén en la lista de prerequisitos de ningún otro ramo
  const todosIds = Array.from(ramos).map(r => r.dataset.id);
  const idsPrerrequisitos = [];

  ramos.forEach(ramo => {
    const desbloquea = ramo.dataset.desbloquea;
    if (desbloquea) {
      desbloquea.split(',').forEach(id => {
        if (id) idsPrerrequisitos.push(id);
      });
    }
  });

  // Los iniciales son los que no aparecen en idsPrerrequisitos
  const iniciales = todosIds.filter(id => !idsPrerrequisitos.includes(id));

  // Desbloquear iniciales
  iniciales.forEach(id => {
    const r = document.querySelector(`.ramo[data-id="${id}"]`);
    if (r && !r.classList.contains('aprobado')) {
      r.classList.remove('bloqueado');
      r.classList.add('desbloqueado');
    }
  });
});
