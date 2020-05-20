require('dotenv').config();

const { getConnection } = require('../DB');
const { generateError } = require('../helpers');

async function deleteConcourse(req, res, next) {
  let connection;
  try {
    const { id } = req.params;
    console.log(id);

    connection = await getConnection();
    const [
      current
    ] = await connection.query(
      'SELECT id_concurso FROM CONCURSOS where id_concurso=?',
      [id]
    );
    console.log(current[0]);

    if (!current.length) {
      throw generateError(
        `No existe ningún concurso con  identificador ${id}`,
        400
      );
    }
    if (
      current[0].id_concurso !== req.auth.id_usuario &&
      req.auth.rol !== 'admin'
    ) {
      throw generateError(
        'Sólo el administrador puede realizar esta acción',
        400
      );
    }
    await connection.query('DELETE FROM CONCURSOS WHERE id_concurso=?', [id]);
    res.send({
      status: 'ok',
      message: `El concurso con identificador ${id} ha sido borrado `
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { deleteConcourse };
