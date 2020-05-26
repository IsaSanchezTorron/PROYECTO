require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError } = require('../../helpers');
const { updateConcourseSchema } = require('../../validations/edit_concourse');

async function setWinner(req, res, next) {
  let connection;
  try {
    await updateConcourseSchema.validateAsync(req.body);
    connection = await getConnection();
    const { id } = req.params;
    const { id_usuario, id_concurso } = req.body;

    const [
      current
    ] = await connection.query(
      `SELECT id_concurso, id_usuario FROM INSCRIPCIONES  WHERE id_concurso =? AND id_usuario=?`,
      [id_concurso, id_usuario]
    );
    if (current.length) {
      throw generateError(`El concurso con  ${id} ya tiene ganador`, 404);
    }
    if (current[0].id_usuario !== req.auth.id && req.auth.role !== 'admin') {
      throw generateError(
        'No tienes permisos para seleccionar ganadores del concursos',
        401
      );
    }
    await connection.query(` UPDATE INSCRIPCIONES SET ganador = 1`);

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
