// script.js

document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Convertir nombre a formato "clave" para comparar
  function claveNombre(nombre) {
    return nombre.toLowerCase().trim();
  }

  // Map para saber si un ramo está seleccionado
  const seleccionados = new Map();

  // Inicializar: bloquear materias con prerequisito no cumplido
  function inicializarEstado() {
    ramos.forEach(ramo => {
      const prereqRaw = ramo.dataset.prereq.trim();
      if (prereqRaw === "") {
        // Sin prerequisitos => desbloqueado
        ramo.classList.remove("bloqueado");
        seleccionados.set(claveNombre(ramo.dataset.nombre), false);
      } else {
        // Verificar prerequisitos separados por coma
        const prereqs = prereqRaw.split(",").map(s => claveNombre(s));
        // Si todos prereqs están desbloqueados (es decir, sin prereq o ya seleccionados), desbloquear
        // Al inicio nadie está seleccionado, así que solo si prereq vacío está desbloqueado
        // Al principio bloquear si hay prereq
        ramo.classList.add("bloqueado");
        seleccionados.set(claveNombre(ramo.dataset.nombre), false);
      }
    });
  }

  // Actualizar estado de desbloqueo según selección
  function actualizarEstado() {
    ramos.forEach(ramo => {
      const nombre = claveNombre(ramo.dataset.nombre);
      const prereqRaw = ramo.dataset.prereq.trim();

      if (prereqRaw === "") {
        // Sin prereq, desbloqueado siempre
        if (seleccionados.get(nombre) === false) {
          ramo.classList.remove("bloqueado");
        }
        return;
      }

      // Prerequisitos separados
      const prereqs = prereqRaw.split(",").map(s => claveNombre(s));
      // Si todos los prereq están seleccionados, desbloqueamos
      const todosCumplen = prereqs.every(p => seleccionados.get(p) === true);

      if (todosCumplen) {
        // Desbloquear
        ramo.classList.remove("bloqueado");
      } else {
        // Bloquear y deseleccionar si estaba seleccionado
        ramo.classList.add("bloqueado");
        if (seleccionados.get(nombre) === true) {
          seleccionados.set(nombre, false);
          ramo.classList.remove("seleccionado");
        }
      }
    });
  }

  // Click en ramo
  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) {
        alert("Esta materia está bloqueada. Debes aprobar las prerrequisitos primero.");
        return;
      }
      const nombre = claveNombre(ramo.dataset.nombre);
      const estaSeleccionado = seleccionados.get(nombre);

      if (estaSeleccionado) {
        // Deseleccionar
        seleccionados.set(nombre, false);
        ramo.classList.remove("seleccionado");
      } else {
        // Seleccionar
        seleccionados.set(nombre, true);
        ramo.classList.add("seleccionado");
      }
      // Actualizar bloqueos según selección
      actualizarEstado();
    });
  });

  // Ejecutar inicialización
  inicializarEstado();
  actualizarEstado();
});
