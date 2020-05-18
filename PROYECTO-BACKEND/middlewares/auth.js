require('dotenv').config();
const jwt = require('jsonwebtoken');

const { getConnection } = require('../DB');
const { generateError } = require('../helpers');

async function userIsAuthenticated(req, res, next) {
  let connection;

  try {
    // Comprobar si la cabecera de la actualización es válida
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError('Falta la cabecera de Autorizacion');
    }

    const authorizationParts = authorization.split(' ');

    let token;

    if (authorizationParts.length === 1) {
      token = authorization;
    } else if (authorizationParts[0] === 'Bearer') {
      token = authorizationParts[1];
    } else {
      throw generateError('No es posible leer el token');
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      throw new Error('El token no ha podido crearse correctamente');
    }

    // Comprobar que la fecha de expedición del token sea mayor a la
    // fecha de última actualización de password del usuario
    const { id, iat } = decoded;

    connection = await getConnection();

    const [
      result
    ] = await connection.query(
      'SELECT fecha_modificacion_contrasenha FROM USUARIOS WHERE id_usuario=?',
      [id]
    );

    if (!result.length) {
      generateError('No existe el usuario en la Base de Datos', 400);
    }

    const [user] = result;

    // comprobar que la fecha del token menor mayor que user.date_password_modification
    // Tened en cuenta que el iat del token está guardado en segundos y node trabaja en
    // milisegundos
    if (new Date(iat * 1000) < new Date(user.fecha_modificacion_contrasenha)) {
      generateError('El token no es válido, debes hacer login de nuevo', 401);
    }

    req.auth = decoded;
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

function userIsAdmin(req, res, next) {
  if (!req.auth && req.auth.role !== 'admin') {
    const error = generateError('No tienes privilegios de administrador', 401);

    return next(error);
  }

  next();
}

module.exports = {
  userIsAuthenticated,
  userIsAdmin
};
