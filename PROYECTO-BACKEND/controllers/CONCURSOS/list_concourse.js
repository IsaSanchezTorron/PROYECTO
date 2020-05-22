require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError } = require('../../helpers');

async function listingConcourses(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `SELECT * FROM CONCURSOS ORDER BY CONCURSOS.fecha_final`
    );

    if (!result.length) {
      throw generateError(`No existen concursos en la Base de Datos`, 404);
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

module.exports = { listingConcourses };
