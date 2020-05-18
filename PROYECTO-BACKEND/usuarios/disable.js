require('dotenv').config();
const { getConnection } = require('../DB');
const { generateError, randomString } = require('../helpers');

async function disableUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    const [
      current
    ] = await connection.query(
      ' SELECT activo, id_usuario FROM USUARIOS where id_usuario=?',
      [id]
    );
    if (!current.length) {
      throw generateError(
        `No existe un usuario con id. de registo  ${id}`,
        400
      );
    }
    /*
    if (current[0].id !== req.auth.id && req.auth.role !== 'admin') {
      throw generateError('You do not autorise to disable this user', 401);
    }*/

    const registrationCode = randomString(40);

    await connection.query(
      `UPDATE USUARIOS SET activo = 0, codigo_registro=? WHERE id_usuario=?`,
      [registrationCode, id]
    );

    res.send({
      status: 'OK',
      message: 'El usuario ha sido borrado correctamente.'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { disableUser };
