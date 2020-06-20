require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError, formatDateToDB } = require('../../helpers');

async function nextConcourses(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const dateToday = formatDateToDB(new Date());
    console.log(dateToday);

    const [result] = await connection.query(
      `SELECT CONCURSOS.nombre, CONCURSOS.descripcion, CONCURSOS.fecha_inicio, CONCURSOS.fecha_final, CONCURSOS.genero, CONCURSOS.modalidad, CONCURSOS.ciudad, ROUND(AVG(INSCRIPCIONES.valoracion))
      FROM CONCURSOS
      LEFT JOIN INSCRIPCIONES ON CONCURSOS.id_concurso = INSCRIPCIONES.CONCURSOS_id_concurso
      WHERE CONCURSOS.fecha_final >= ?
      GROUP BY CONCURSOS.id_concurso
      ORDER BY CONCURSOS.fecha_inicio`,
      [dateToday]
    );

    if (!result.length) {
      throw generateError(`No existen concursos próximamente`, 404);
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