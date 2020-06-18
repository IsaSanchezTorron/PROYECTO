require('dotenv').config();

const { getConnection } = require('../../DB');
const { updateUserSchema } = require('../../validations/edit_user');
const {
  generateError,
  processAndSavePhoto,
  deletePhoto
} = require('../../helpers');

async function editUser(req, res, next) {
  let connection;
  try {
    await updateUserSchema.validateAsync(req.body);
    connection = await getConnection();
    const { id } = req.params;

    const { nombre, apellidos, descripcion } = req.body;

    const [
      current
    ] = await connection.query(
      `SELECT id_usuario, url_foto  FROM USUARIOS  WHERE id_usuario =?`,
      [id]
    );

    if (!current.length) {
      throw generateError(`El usuario con id  ${id} no existe`, 404);
    }

    //console.log(typeof current);
    //console.log(current);

    if (current[0].id_usuario !== req.auth.id) {
      throw generateError('No tienes permisos para editar este usuario', 401);
    }

    let savedFileName;
    console.log(req.files);
    console.log(req.files.url_foto);
    if (req.files && req.files.url_foto) {
      try {
        savedFileName = await processAndSavePhoto(req.files.url_foto);
        if (current && current[0].url_foto) {
          await deletePhoto(current[0].url_foto);
        }
      } catch (error) {
        throw generateError('No se puede procesar la imagen.', 400);
      }
    } else {
      savedFileName = current[0].url_foto;
    }

    await connection.query(
      ` UPDATE USUARIOS SET nombre=?, apellidos =?, descripcion=?, url_foto =? WHERE id_usuario=?`,
      [nombre, apellidos, descripcion, savedFileName, id]
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
