const dependencias = {
  historia: ['introduccion'],
  ecologia: ['geografia'],
  investigacion: ['lenguaje'],
  ingles2: ['ingles1'],
  estadistica: ['matematicas'],
  economia: ['matematicas'],
  patrimonio: ['historia'],
  guiar: ['ecologia'],
  ingles3: ['ingles2']
  // Agrega más dependencias aquí
};

const materias = document.querySelectorAll('.materia');

materias.forEach(materia => {
  materia.addEventListener('click', () => {
    if (materia.classList.contains('bloqueada')) return;

    materia.classList.toggle('aprobada');

    const id = materia.dataset.id;

    for (let m in dependencias) {
      if (dependencias[m].includes(id)) {
        const desbloquear = dependencias[m].every(dep =>
          document.querySelector(`.materia[data-id="${dep}"]`).classList.contains('aprobada')
        );

        const materiaDestino = document.querySelector(`.materia[data-id="${m}"]`);
        if (materiaDestino) {
          if (desbloquear) {
            materiaDestino.classList.remove('bloqueada');
          } else {
            materiaDestino.classList.add('bloqueada');
            materiaDestino.classList.remove('aprobada');
          }
        }
      }
    }
  });
});
