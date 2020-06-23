require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError, formatDateToDB } = require('../../helpers');

async function getPendingRatings(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const dateToday = formatDateToDB(new Date());

    const { id } = req.auth;
    // Pido la lista de concursos a las que el usuario está inscrito y que ya han terminado haciendo join con tabla de concursos y usuarios.
    const [result] = await connection.query(
      `SELECT USUARIOS.id_usuario, USUARIOS.nombre, USUARIOS.apellidos, CONCURSOS_id_concurso,
             CONCURSOS.nombre as nombre_concurso, CONCURSOS.descripcion, CONCURSOS.fecha_inicio, CONCURSOS.fecha_final, INSCRIPCIONES.valoracion
             FROM USUARIOS 
             INNER JOIN INSCRIPCIONES ON USUARIOS.id_usuario = INSCRIPCIONES.USUARIOS_id_usuario 
             INNER JOIN CONCURSOS ON CONCURSOS.id_concurso = INSCRIPCIONES.CONCURSOS_id_concurso
             WHERE USUARIOS.id_usuario = ? AND CONCURSOS.fecha_final <= ? AND INSCRIPCIONES.valoracion IS NULL`,
      [id, dateToday]
    );
    console.log(result);
    if (!result.length) {
      throw generateError(
        'No tienes ningún concurso pendiente de valoración',
        404
      );
    }

    res.send({
      status: 'ok',
      data: result
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getPendingRatings };
