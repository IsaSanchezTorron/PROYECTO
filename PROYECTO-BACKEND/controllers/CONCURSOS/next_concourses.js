require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError, formatDateToDB } = require('../../helpers');

async function nextConcourses(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const dateToday = formatDateToDB(new Date());
    console.log(dateToday);

    const [
      result
    ] = await connection.query(
      `SELECT * FROM CONCURSOS WHERE fecha_final >= ? ORDER BY fecha_inicio`,
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

module.exports = { nextConcourses };
