require('dotenv').config();

const { getConnection } = require('../DB');
const { updateUserSchema } = require('../validations/edit_user');
const {
  generateError,
  processAndSavePhoto,
  deletePhoto
} = require('../helpers');

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

    if (current[0].id_usuario !== req.auth.id && req.auth.role !== 'admin') {
      throw generateError('No tienes permisos para editar este usuario', 401);
    }

    const [user] = current;

    const currentImage = [user.url_foto];

    const newImage = [request.files.url_foto];

    const imageToDB = [];

    if (request.files) {
      let savedFileName;

      for (let i = 0; i < newImage.length; i++) {
        savedFileName = await processAndSavePhoto(newImage[i]);

        if (currentImage[i]) {
          await deletePhoto(currentImage[i]);
        }

        imageToDB.push(savedFileName);
      }
    }

    await connection.query(
      ` UPDATE USUARIOS SET nombre=?, apellidos =?, url_foto =?, descripcion=?  WHERE id_usuario=?`,
      [nombre, apellidos, imageToDB[0], descripcion, id]
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
