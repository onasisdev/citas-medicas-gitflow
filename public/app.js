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

  const id = document.getElementById("citaId").value;

  if (editando) {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cita),
    });

    editando = false;
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cita),
    });
  }

  form.reset();
  cargarCitas();
});

const lista = document.getElementById("listaCitas");

async function cargarCitas() {
  const res = await fetch(API);
  const data = await res.json();

  lista.innerHTML = "";

  data.forEach((cita) => {
    const div = document.createElement("div");

    const fecha = new Date(cita.fecha_cita);

    const fechaFormateada = fecha.toLocaleString("es-DO", {
      dateStyle: "short",
      timeStyle: "short",
    });

    div.innerHTML = `
      <b>Paciente</b>: ${cita.paciente}<br><br>
      <b>Médico</b>: ${cita.medico}<br><br>
      <b>Fecha</b>: ${fechaFormateada}<br><br>
      <b>Motivo</b>: ${cita.motivo}<br><br>
      <b>Estado</b>: ${cita.estado}

       <button class="btnEditar">Editar</button>
       <button class="delete btnEliminar">Eliminar</button>
    `;

    div.querySelector(".btnEditar").addEventListener("click", () => {
      editar(cita);
    });

    div.querySelector(".btnEliminar").addEventListener("click", () => {
      eliminar(cita.id);
    });

    lista.appendChild(div);
  });
}

function editar(cita) {
  document.getElementById("citaId").value = cita.id;
  document.getElementById("paciente_id").value = cita.paciente_id || "";
  document.getElementById("medico_id").value = cita.medico_id || "";

  const fecha = cita.fecha_cita.slice(0, 16);
  document.getElementById("fecha_cita").value = fecha;

  document.getElementById("motivo").value = cita.motivo;
  document.getElementById("estado").value = cita.estado;

  editando = true;
}

async function eliminar(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  cargarCitas();
}

cargarCitas();
