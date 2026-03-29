const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE
router.post("/", (req, res) => {
  const { paciente_id, medico_id, fecha_cita, motivo } = req.body;

  const sql = `
        INSERT INTO citas (paciente_id, medico_id, fecha_cita, motivo)
        VALUES (?, ?, ?, ?)
    `;

  db.query(sql, [paciente_id, medico_id, fecha_cita, motivo], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Cita creada");
  });
});

// READ
router.get("/", (req, res) => {
  const sql = `
        SELECT c.id, p.nombre AS paciente, m.nombre AS medico,
               c.fecha_cita, c.motivo, c.estado
        FROM citas c
        JOIN pacientes p ON c.paciente_id = p.id
        JOIN medicos m ON c.medico_id = m.id
    `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

module.exports = router;
