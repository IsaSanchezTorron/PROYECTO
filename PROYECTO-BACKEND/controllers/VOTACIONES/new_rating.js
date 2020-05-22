/*
require('dotenv').config();
const { getConnection } = require('../../database/DB');

async function newRating(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    await newRatingSchema.validateAsync(req.body);

    const{
      CONCURSOS_id_concurso,
      USUARIOS_id_usuario,
      puntuacion,
      fecha_valoracion
    } = req.body;

    await connection.query(
      `INSERTO INTO VALORACIONES ()`
    )

    ///////OCURREN MOVIDAS///////
    res.send({
      status: 'ok',
      message: 'Gracias por participar en la votacion.'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { newRating };
console.log('rulando');
*/
