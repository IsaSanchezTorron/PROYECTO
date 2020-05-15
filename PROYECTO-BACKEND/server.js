require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

const { newUser } = require('./usuarios/nuevo_usuario.js');
const { validateUser } = require('./usuarios/validation.js');
const { newConcourse } = require('./concursos/nuevo_concurso.js');
const { newRating } = require('./votaciones/nueva_votacion.js');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

app.post('/usuarios', newUser);
app.get('/usuarios/validar', validateUser);
app.post('/concursos', newConcourse);
app.post('/votaciones', newRating);

//Middleware de error
app.use((error, req, res, next) => {
  res.status(error.httpCode || 500).send({
    status: 'error',
    message: error.message
  });
});

app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found'
  });
});
app.listen(port, () => {
  console.log(`Servidor funcionando en  http://localhost:${port} 💞`);
});
