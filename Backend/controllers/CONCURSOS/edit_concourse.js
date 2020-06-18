require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError, processAndSavePhoto } = require('../../helpers');
const { updateConcourseSchema } = require('../../validations/edit_concourse');

async function editConcourse(req, res, next) {
  let connection;
  try {
    await updateConcourseSchema.validateAsync(req.body);
    connection = await getConnection();
    const { id } = req.params;
    const {
      nombre,
      fecha_inicio,
      fecha_final,
      descripcion,
      modalidad,
      genero,
      ciudad
    } = req.body;

    const [
      current
    ] = await connection.query(
      `SELECT id_concurso FROM CONCURSOS  WHERE id_concurso =?`,
      [id]
    );
    if (!current.length) {
      throw generateError(`El concurso con  ${id} no existe`, 404);
    }

    let savedFileName;

    if (req.files && req.files.url_foto) {
      try {
        savedFileName = await processAndSavePhoto(req.files.url_foto);

        if (current && current.url_foto) {
          await deletePhoto(current.url_foto);
        }
      } catch (error) {
        throw generateError(
          'Ha habido un error en el procesamiento, inténtalo más tarde',
          400
        );
      }
    } else {
      savedFileName = current.url_foto;
    }

    await connection.query(
      ` UPDATE CONCURSOS SET nombre=?, fecha_inicio=?, fecha_final=?, url_foto=?, descripcion =?, modalidad=?, genero=?, ciudad= ?,  WHERE id_concurso=?`,
      [
        nombre,
        fecha_inicio,
        fecha_final,
        savedFileName,
        descripcion,
        modalidad,
        genero,
        ciudad,
        id
      ]
    );
    res.send({
      status: 'ok',
      message: 'Has actualizado los datos del concurso correctamente.'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { editConcourse };
