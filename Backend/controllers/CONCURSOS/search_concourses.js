require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError, searchConcourses } = require('../../helpers');

async function searchingConcourses(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { query, params } = searchConcourses(req.query);

    console.log(query);
    console.log(params);
    const [result] = await connection.query(query, params);
    if (!result.length) {
      throw generateError(
        `No existen coincidencias con tus criterios de búsqueda`,
        404
      );
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

module.exports = { searchingConcourses };
