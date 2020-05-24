require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT;

//############### Funciones importadas relativas a USUARIOS #######################
const { newUser } = require('./controllers/USUARIOS/new_user');
const { loginUser } = require('./controllers/USUARIOS/login');
const { validateUser } = require('./controllers/USUARIOS/validation');
const { getUser } = require('./controllers/USUARIOS/get_data_user');
const { editUser } = require('./controllers/USUARIOS/edit_user');
const { userIsAuthenticated, userIsAdmin } = require('./middlewares/auth');
const { updatePassword } = require('./controllers/USUARIOS/edit_password');
const { disableUser } = require('./controllers/USUARIOS/disable');
const { deleteUser } = require('./controllers/USUARIOS/delete');
const {
  getInscriptionHistoryUser
} = require('./controllers/USUARIOS/get_history_user');

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

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));

// ################## RUTAS DE USUARIO ##############################

app.post('/usuarios', newUser);
app.post('/usuarios/login', loginUser);
app.get('/usuarios/validar', validateUser);
app.put('/usuarios/editar/:id', userIsAuthenticated, editUser);
app.get('/usuarios/:id', userIsAuthenticated, userIsAdmin, editUser);
app.get('/usuarios/:id', userIsAuthenticated, userIsAdmin, getUser);
app.put('/usuarios/password/:id', userIsAuthenticated, updatePassword);
app.put('/usuarios/disable/:id', userIsAuthenticated, disableUser);
app.delete(
  '/usuarios/delete/:id',
  userIsAuthenticated,
  userIsAdmin,
  deleteUser
);
app.get(
  '/usuarios/historial/:id',
  userIsAuthenticated,
  getInscriptionHistoryUser
);

// ################### RUTAS DE CONCURSO ###########################

app.post(
  '/concursos/new_concourse',
  newConcourse,
  userIsAuthenticated,
  userIsAdmin
);
app.put(
  '/concursos/editar/:id',
  editConcourse,
  userIsAuthenticated,
  userIsAdmin
);
app.get('/concursos/info/:id', getConcourse);
app.delete(
  '/concursos/delete/:id',
  userIsAuthenticated,
  userIsAdmin,
  deleteConcourse
);
app.get('/concursos/listado', listingConcourses);
app.get('/concursos/proximamente', nextConcourses);
app.get('/concursos/finalizados', finishedConcourses);

//################ RUTAS DE INSCRIPCIONES #############################

app.post('/concursos/inscripciones/:id', userIsAuthenticated, newInscription);
app.delete(
  '/concursos/inscripciones/borrar/:id',
  userIsAuthenticated,
  deleteInscription
);
app.get('/concursos/inscripciones/:id', userIsAuthenticated, getInscribed);

//############### RUTAS DE VALORACIONES #################################
app.post('/valoraciones/:id', userIsAuthenticated, newRating);
app.get('/valoraciones/ver/:id', viewRating);
app.get('/valoraciones/ranking', viewRanking);

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
