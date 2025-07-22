document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Convertir texto a clave sencilla (minúscula y sin espacios extras)
  const clave = (texto) => texto.toLowerCase().trim();

  // Map para saber qué materias están seleccionadas/aprobadas
  const aprobados = new Map();

  // Inicializar materias: bloquear si tiene prerequisito no cumplido
  function inicializar() {
    ramos.forEach(ramo => {
      const prereq = ramo.dataset.prereq.trim();
      const nombre = clave(ramo.dataset.nombre);
      aprobados.set(nombre, false);

      if (prereq === "") {
        ramo.classList.remove("bloqueado");
      } else {
        ramo.classList.add("bloqueado");
      }
    });
  }

  // Actualizar estados de desbloqueo según materias aprobadas
  function actualizarDesbloqueo() {
    ramos.forEach(ramo => {
      const nombre = clave(ramo.dataset.nombre);
      const prereqRaw = ramo.dataset.prereq.trim();

      if (prereqRaw === "") {
        // Sin prerequisito, siempre desbloqueado
        if (!aprobados.get(nombre)) ramo.classList.remove("bloqueado");
        return;
      }

      const prereqs = prereqRaw.split(",").map(clave);

      // Verificar si todos los prerequisitos están aprobados
      const todosAprobados = prereqs.every(p => aprobados.get(p) === true);

      if (todosAprobados) {
        ramo.classList.remove("bloqueado");
      } else {
        ramo.classList.add("bloqueado");
        // Si estaba seleccionado, quitar selección porque no cumple prereqs
        if (aprobados.get(nombre)) {
          aprobados.set(nombre, false);
          ramo.classList.remove("seleccionado");
        }
      }
    });
  }

  // Al hacer click en materia
  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) {
        alert("Esta materia está bloqueada. Debes aprobar sus prerrequisitos primero.");
        return;
      }
      const nombre = clave(ramo.dataset.nombre);

      if (aprobados.get(nombre)) {
        aprobados.set(nombre, false);
        ramo.classList.remove("seleccionado");
      } else {
        aprobados.set(nombre, true);
        ramo.classList.add("seleccionado");
      }

      actualizarDesbloqueo();
    });
  });

  // Ejecutar inicialización y actualización al cargar
  inicializar();
  actualizarDesbloqueo();
});
