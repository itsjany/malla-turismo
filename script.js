document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Convierte los ramos NodeList a un array para facilidad
  const ramosArr = Array.from(ramos);

  // Función para actualizar estados de desbloqueo según prerrequisitos
  function actualizarEstados() {
    ramosArr.forEach(ramo => {
      const prereqs = ramo.dataset.prereq.trim();

      if (!prereqs) {
        // Sin prerrequisitos: siempre desbloqueado
        if (!ramo.classList.contains("aprobado")) {
          ramo.classList.add("desbloqueado");
          ramo.classList.remove("bloqueado");
        }
      } else {
        // Tiene prerrequisitos, se pueden separar por comas
        const prereqArray = prereqs.split(",").map(s => s.trim());

        // Verifica si todos los prereqs están aprobados
        const todosAprobados = prereqArray.every(prereqNombre => {
          const prereqRamo = ramosArr.find(r => r.dataset.nombre === prereqNombre);
          return prereqRamo && prereqRamo.classList.contains("aprobado");
        });

        if (todosAprobados) {
          if (!ramo.classList.contains("aprobado")) {
            ramo.classList.add("desbloqueado");
            ramo.classList.remove("bloqueado");
          }
        } else {
          ramo.classList.remove("desbloqueado", "aprobado");
          ramo.classList.add("bloqueado");
        }
      }
    });
  }

  // Evento click para aprobar/desaprobar ramos desbloqueados
  ramosArr.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("bloqueado")) {
        // Alterna aprobado
        ramo.classList.toggle("aprobado");

        // Si está aprobado, remover desbloqueado (queda aprobado)
        if (ramo.classList.contains("aprobado")) {
          ramo.classList.remove("desbloqueado");
        } else {
          // Si desapruebas, vuelve a desbloqueado
          ramo.classList.add("desbloqueado");
        }

        // Actualiza el estado general
        actualizarEstados();
      }
    });
  });

  // Inicializa estados al cargar
  actualizarEstados();
});
