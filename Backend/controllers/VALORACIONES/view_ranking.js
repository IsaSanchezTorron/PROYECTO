require('dotenv').config();
const { getConnection } = require('../../DB');
const { generateError } = require('../../helpers');

async function viewRanking(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // const id_concurso = req.params.id;

    const [current] = await connection.query(
      `SELECT INSCRIPCIONES.CONCURSOS_id_concurso, CONCURSOS.id_concurso, CONCURSOS.nombre, CONCURSOS.fecha_final, AVG(INSCRIPCIONES.valoracion) as valoracion
FROM INSCRIPCIONES
INNER JOIN CONCURSOS ON INSCRIPCIONES.CONCURSOS_id_concurso = CONCURSOS.id_concurso
WHERE valoracion IS NOT NULL
GROUP BY CONCURSOS_id_concurso ORDER BY AVG(valoracion) DESC;
      `
    );
    if (!current.length) {
      throw generateError(
        'No existen votaciones disponibles para hacer un ranking',
        404
      );
    }

    res.send({
      status: 'ok',
      data: current
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { viewRanking };
