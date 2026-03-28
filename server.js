const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const citas = require("./routes/citas");
app.use("/api/citas", citas);

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
