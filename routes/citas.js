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

module.exports = router;