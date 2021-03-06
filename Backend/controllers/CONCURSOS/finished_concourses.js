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
      `SELECT CONCURSOS.id_concurso, CONCURSOS.nombre, CONCURSOS.descripcion, CONCURSOS.fecha_publicacion, CONCURSOS.fecha_final, CONCURSOS.url_foto,  CONCURSOS.genero, CONCURSOS.modalidad, CONCURSOS.ciudad,  ROUND(AVG(INSCRIPCIONES.valoracion)) as valoracion, CONCURSOS.fecha_asignacion_ganador, CONCURSOS.id_ganador, USUARIOS.id_usuario, USUARIOS.nombre as nombre_ganador, USUARIOS.apellidos as usuarios_apellidos
FROM CONCURSOS
LEFT JOIN INSCRIPCIONES ON CONCURSOS.id_concurso = INSCRIPCIONES.CONCURSOS_id_concurso
LEFT JOIN USUARIOS ON USUARIOS.id_usuario = CONCURSOS.id_ganador
WHERE CONCURSOS.fecha_final <= ?
GROUP BY CONCURSOS.id_concurso
ORDER BY CONCURSOS.fecha_final`,

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
