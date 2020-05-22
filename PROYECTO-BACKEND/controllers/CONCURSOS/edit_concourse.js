require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError } = require('../../helpers');
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
      genero
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
    /* if (current[0].id !== req.auth.id && req.auth.role !== 'admin') {
            throw generateError('No tienes permisos para editar este usuario', 401);
        } */
    await connection.query(
      ` UPDATE CONCURSOS SET nombre=?, fecha_inicio=?, fecha_final=?, descripcion =?, modalidad=?, genero=?,  WHERE id_concurso=?`,
      [nombre, fecha_inicio, fecha_final, descripcion, modalidad, genero]
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
