require('dotenv').config();
const { getConnection } = require('../../DB');
const { generateError } = require('../../helpers');

async function viewRanking(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // const id_concurso = req.params.id;

    const [current] = await connection.query(
      `SELECT CONCURSOS_id_concurso, AVG(valoracion)  FROM INSCRIPCIONES WHERE valoracion IS NOT NULL GROUP BY CONCURSOS_id_concurso ORDER BY AVG(valoracion) DESC`
    );
    if (!current.length) {
      throw generateError(
        'Sólo puedes votar una vez cada concurso en que has participado.',
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
