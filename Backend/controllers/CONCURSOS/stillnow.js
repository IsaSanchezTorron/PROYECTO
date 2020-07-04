require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError } = require('../../helpers');

async function stillNowConcourses(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `SELECT id_concurso, nombre, fecha_inicio, fecha_final, url_foto, descripcion, modalidad, genero, ciudad, id_ganador, ROUND(AVG(INSCRIPCIONES.valoracion), 1) AS valoracion
    FROM CONCURSOS
    LEFT JOIN INSCRIPCIONES ON CONCURSOS.id_concurso = INSCRIPCIONES.CONCURSOS_id_concurso
    WHERE id_ganador IS NULL
    GROUP BY id_concurso
    ORDER BY fecha_final`
    );

    if (!result.length) {
      throw generateError(`No existen concursos en la Base de Datos`, 404);
    }
    console.log(result);

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

module.exports = { stillNowConcourses };
