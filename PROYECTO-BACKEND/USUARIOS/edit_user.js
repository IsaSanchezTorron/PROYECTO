require('dotenv').config();

const { getConnection } = require('../DB');
const { generateError } = require('../helpers');
const { updateUserSchema } = require('../validations/edit_user');

async function editUser(req, res, next) {
  let connection;
  try {
    await updateUserSchema.validateAsync(req.body);
    connection = await getConnection();
    const { id } = req.params;
    const { nombre, apellidos, url_foto, descripcion } = req.body;

    const [
      current
    ] = await connection.query(
      `SELECT id_usuario FROM USUARIOS  WHERE id_usuario =?`,
      [id]
    );
    if (!current.length) {
      throw generateError(`El usuario con id  ${id} no existe`, 404);
    }

    /* if (current[0].id !== req.auth.id && req.auth.role !== 'admin') {
            throw generateError('No tienes permisos para editar este usuario', 401);
        } */

    await connection.query(
      ` UPDATE USUARIOS SET nombre=?, apellidos =?, url_foto =?, descripcion=?  WHERE id_usuario=?`,
      [nombre, apellidos, url_foto, descripcion, id]
    );
    res.send({
      status: 'ok',
      message: 'Has actualizado tus datos correctamente'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { editUser };
