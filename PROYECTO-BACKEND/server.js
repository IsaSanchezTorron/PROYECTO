require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

app.use(express.static(path.join(__dirname, 'static')));

//############### Funciones importadas relativas a USUARIOS #######################
const { newUser } = require('./controllers/USUARIOS/new_user');
const { loginUser } = require('./controllers/USUARIOS/login');
const { validateUser } = require('./controllers/USUARIOS/validation');
const { getUser } = require('./controllers/USUARIOS/get_data_user');
const { editUser } = require('./controllers/USUARIOS/edit_user'); //middlewares para autenticación
const { updatePassword } = require('./controllers/USUARIOS/edit_password');
const { disableUser } = require('./controllers/USUARIOS/disable');
const { deleteUser } = require('./controllers/USUARIOS/delete');
const {
  getInscriptionHistoryUser
} = require('./controllers/USUARIOS/get_history_user');
const { userIsAuthenticated } = require('./middlewares/auth.js');
const { userIsAdmin } = require('./middlewares/auth.js');

//############## Funciones importadas relativas a CONCURSOS ######################
const { newConcourse } = require('./controllers/CONCURSOS/new_concourse');
const { editConcourse } = require('./controllers/CONCURSOS/edit_concourse');
const { getConcourse } = require('./controllers/CONCURSOS/get_data');
const { deleteConcourse } = require('./controllers/CONCURSOS/delete');
const { listingConcourses } = require('./controllers/CONCURSOS/all_concourses');
const { nextConcourses } = require('./controllers/CONCURSOS/next_concourses');
const {
  finishedConcourses
} = require('./controllers/CONCURSOS/finished_concourses');
const { setWinner } = require('./controllers/CONCURSOS/winner');

//############# Funciones importadas relativas a INSCRIPCIONES ##############
const {
  newInscription
} = require('./controllers/INSCRIPCIONES/new_inscription');
const {
  deleteInscription
} = require('./controllers/INSCRIPCIONES/delete_inscription');
const {
  getInscribed
} = require('./controllers/INSCRIPCIONES/get_data_inscriptions');

const { newRating } = require('./controllers/VALORACIONES/new_rating');

const { viewRating } = require('./controllers/VALORACIONES/view_rating');

const { viewRanking } = require('./controllers/VALORACIONES/view_ranking');

// ################## RUTAS DE USUARIO ##############################

app.post('/usuarios', newUser); // Crear nuevo usuario
app.post('/usuarios/login', loginUser); // Hacer login
app.get('/usuarios/validar', validateUser); // Validar cuenta
app.put('/usuarios/editar/:id', userIsAuthenticated, editUser); //Editar usuario
app.get('/usuarios/:id', userIsAuthenticated, userIsAdmin, getUser); //Obtener datos de un usuario
app.put('/usuarios/password/:id', userIsAuthenticated, updatePassword); //Cambiar contraseña de usuario
app.put('/usuarios/disable/:id', userIsAuthenticated, disableUser); // Deshabilitar usuario
app.delete(
  '/usuarios/delete/:id',
  userIsAuthenticated,
  userIsAdmin,
  deleteUser
); // Borrar cuenta de usuario
app.get(
  '/usuarios/historial/:id',
  userIsAuthenticated,
  getInscriptionHistoryUser
); // Ver historial de usuarios

// ################### RUTAS DE CONCURSO ###########################

app.post(
  '/concursos/new_concourse',
  newConcourse,
  userIsAuthenticated,
  userIsAdmin
); //Nuevo concurso
app.put(
  '/concursos/editar/:id',
  editConcourse,
  userIsAuthenticated,
  userIsAdmin
); //Editar concurso
app.get('/concursos/info/:id', getConcourse); //Obtener datos de un concurso
app.delete(
  '/concursos/delete/:id',
  userIsAuthenticated,
  userIsAdmin,
  deleteConcourse
); // Borrar concurso
app.get('/concursos/listado', listingConcourses); //Listado de todos los concursos
app.get('/concursos/proximamente', nextConcourses); //Listado de próximos concursos
app.get('/concursos/finalizados', finishedConcourses); //Listado de concursos ya finalizados.
app.put(
  '/concursos/asignar_ganador',
  userIsAuthenticated,
  userIsAdmin,
  setWinner
);

//################ RUTAS DE INSCRIPCIONES #############################

app.post('/concursos/inscripciones/:id', userIsAuthenticated, newInscription); // Nueva inscripción
app.delete(
  '/concursos/inscripciones/borrar/:id',
  userIsAuthenticated,
  deleteInscription
); // Borrar inscripción
app.get('/concursos/inscripciones/:id', userIsAuthenticated, getInscribed); // Listar inscritos a un concurso

//############### RUTAS DE VALORACIONES #################################
app.post('/valoraciones/:id', userIsAuthenticated, newRating); // Nueva valoracion
app.get('/valoraciones/ver/:id', viewRating); // Ver valoración de un concurso
app.get('/valoraciones/ranking', viewRanking); // Ver ranking de concursos

// ############ Middlewares de error ##################################

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
  console.log(`Servidor funcionando en  http://localhost:${port} 💞🥑🤓🌱💞`);
});
