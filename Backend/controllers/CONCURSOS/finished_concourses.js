require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError, formatDateToDB } = require('../../helpers');

async function finishedConcourses(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const dateToday = formatDateToDB(new Date());
    console.log(dateToday);

    const [result] = await connection.query(
      `SELECT CONCURSOS.nombre, CONCURSOS.descripcion, CONCURSOS.fecha_publicacion, CONCURSOS.fecha_final, CONCURSOS.url_foto,  CONCURSOS.genero, CONCURSOS.modalidad, CONCURSOS.ciudad,  ROUND(AVG(INSCRIPCIONES.valoracion)) as valoracion
FROM CONCURSOS
LEFT JOIN INSCRIPCIONES ON CONCURSOS.id_concurso = INSCRIPCIONES.CONCURSOS_id_concurso
WHERE CONCURSOS.fecha_final <= ? 
GROUP BY CONCURSOS.id_concurso
ORDER BY CONCURSOS.fecha_publicacion`,
      [dateToday]
    );

    if (!result.length) {
      throw generateError(
        `No existen concursos en la Base de Datos que ya hayan finalizado`,
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

module.exports = { finishedConcourses };
