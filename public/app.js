const API = "http://localhost:3000/api/citas";

const form = document.getElementById("formCita");

let editando = false;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cita = {
    paciente_id: document.getElementById("paciente_id").value,
    medico_id: document.getElementById("medico_id").value,
    fecha_cita: document.getElementById("fecha_cita").value,
    motivo: document.getElementById("motivo").value,
    estado: document.getElementById("estado").value,
  };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cita),
  });

  form.reset();
  cargarCitas();
});
