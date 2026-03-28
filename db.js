const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ",GE6`j48&._E",
  database: "gestion_citas_medicas",
});

db.connect((err) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

module.exports = db;
