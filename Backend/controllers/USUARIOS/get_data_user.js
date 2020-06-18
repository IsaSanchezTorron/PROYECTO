require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError } = require('../../helpers');

async function getUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.auth;

    const [result] = await connection.query(
      `SELECT id_usuario, nombre, apellidos, mail, url_foto, descripcion, fecha_registro, rol)
           FROM USUARIOS WHERE id_usuario=?`,
      [id]
    );

    if (!result.length) {
      throw generateError(`No existe ningún usuario con ese ${id}`, 404);
    }
    const [userData] = result;

    let payload = {};

    if (userData.id_usuario === req.auth.id || req.auth.rol === 'admin') {
      payload.nombre = userData.nombre;
      payload.apellidos = userData.apellidos;
      payload.mail = userData.mail;
      payload.url_foto = userData.url_foto;
      payload.descripcion = userData.descripcion;
      payload.fecha_registro = userData.fecha_registro;
      payload.rol = userData.rol;
    } else {
      throw generateError('No tiene permisos para ver esta información', 401);
    }
    res.send({
      status: 'ok',
      data: payload
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getUser };
