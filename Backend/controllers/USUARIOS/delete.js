require('dotenv').config();
const { getConnection } = require('../../DB');
const { generateError } = require('../../helpers');
async function deleteUser(req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    connection = await getConnection();

    if (req.auth.rol !== 'admin') {
      throw generateError(
        'Sólo el administrador tiene permisos para realizar esta operación.',
        400
      );
    }

    await connection.query('delete from USUARIOS where id_usuario=?', [id]);

    res.send({
      status: 'ok',
      message: `El usuario con id ${id} ha sido borrado.`
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { deleteUser };
