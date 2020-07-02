require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError, formatDateToDB } = require('../../helpers');

async function nextConcourses(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.auth;

    const dateToday = formatDateToDB(new Date());
    console.log(dateToday);

    const [result] = await connection.query(
      `SELECT CONCURSOS.nombre, CONCURSOS.id_concurso, CONCURSOS.descripcion, CONCURSOS.fecha_inicio, CONCURSOS.fecha_final, CONCURSOS.genero, CONCURSOS.modalidad, CONCURSOS.ciudad
      FROM CONCURSOS
      LEFT JOIN INSCRIPCIONES ON CONCURSOS.id_concurso = INSCRIPCIONES.CONCURSOS_id_concurso
      WHERE CONCURSOS.fecha_final > ? AND INSCRIPCIONES.USUARIOS_id_usuario = ?
      GROUP BY CONCURSOS.id_concurso
      ORDER BY CONCURSOS.fecha_final`,
      [dateToday, id]
    );

    if (!result.length) {
      throw generateError(`No tienes ningún concurso en activo`, 404);
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

module.exports = { nextConcourses };
