document.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll(".materia");

  materias.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("bloqueada")) return;

      btn.classList.toggle("aprobada");

      const desbloquear = btn.dataset.desbloquea;
      if (desbloquear) {
        desbloquear.split(" ").forEach(nombre => {
          document.querySelectorAll(`[data-materia="${nombre}"]`).forEach(materia => {
            materia.classList.remove("bloqueada");
          });
        });
      }
    });
  });
});
