require('dotenv').config();
const { getConnection } = require('../../DB');
const { generateError } = require('../../helpers');

async function viewRating(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const id_concurso = req.params.id;

    const [
      current
    ] = await connection.query(
      `SELECT AVG(valoracion)  FROM INSCRIPCIONES WHERE CONCURSOS_id_concurso=? `,
      [id_concurso]
    );
    if (!current.length) {
      throw generateError('Este concurso no ha sido evaluado todavía.', 404);
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
module.exports = { viewRating };
