require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

//Middleware de error
app.use((error, req, res, next) => {
  res.status(error.httpCode || 500).send({
    status: "error",
    message: error.message,
  });
});

app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});
app.listen(port, () => {
  console.log(`Servidor funcionando en  http://localhost:${port} 💞`);
});
