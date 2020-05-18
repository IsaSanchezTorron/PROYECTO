require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

const { newUser } = require('./usuarios/new_user');
const { loginUser } = require('./usuarios/login');
const { validateUser } = require('./usuarios/validation');
const { getUser } = require('./usuarios/get_data');
const { editUser } = require('./usuarios/edit_user');
const { userIsAuthenticated, userIsAdmin } = require('./middlewares/auth');
const { updatePassword } = require('./usuarios/edit_password');
const { disableUser } = require('./usuarios/disable');
const { deleteUser } = require('./usuarios/delete');

const { newConcourse } = require('./concursos/new_concourse');
const { editConcourse } = require('./concursos/edit_concourse');
const { getConcourse } = require('./concursos/get_data');
const { deleteConcourse } = require('./concursos/delete');

//const { newConcourse } = require('./concursos/nuevo_concurso');
//const { newRating } = require('./votaciones/nueva_votacion');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

app.post('/usuarios', newUser);
app.post('/usuarios/login', loginUser);
app.get('/usuarios/validar', validateUser);
app.put('/usuarios/:id', editUser);
app.get('/usuarios/:id', userIsAuthenticated, userIsAdmin, editUser);
app.get('/usuarios/:id', userIsAuthenticated, userIsAdmin, getUser);
app.put('/usuarios/password/:id', userIsAuthenticated, updatePassword);
app.put('/usuarios/disable/:id', userIsAuthenticated, disableUser);
app.delete('/usuarios/delete', userIsAuthenticated, userIsAdmin, deleteUser);

app.post('/concursos', newConcourse, userIsAuthenticated, userIsAdmin);
app.put('/concursos/:id', editConcourse, userIsAuthenticated, userIsAdmin);
app.get('/concursos/:id', getConcourse);
app.delete(
  '/concursos/delete',
  userIsAuthenticated,
  userIsAdmin,
  deleteConcourse
);
//app.post('./votaciones', newRating);

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
