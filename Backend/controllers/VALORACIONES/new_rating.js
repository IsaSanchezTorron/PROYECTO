require('dotenv').config();
const { getConnection } = require('../../DB');
const { newRatingSchema } = require('../../validations/new_rating');
const { generateError } = require('../../helpers');

async function newRating(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    await newRatingSchema.validateAsync(req.body);

    const id_usuario = req.auth.id;
    const id_concurso = req.params.id;
    const { valoracion } = req.body;

    const [
      current
    ] = await connection.query(
      `SELECT valoracion  FROM INSCRIPCIONES WHERE USUARIOS_id_usuario=? AND CONCURSOS_id_concurso=?  AND valoracion is NULL`,
      [id_usuario, id_concurso]
    );
    if (!current.length) {
      throw generateError(
        'Sólo puedes votar una vez cada concurso en que has participado.',
        404
      );
    }

    await connection.query(
      `UPDATE INSCRIPCIONES 
       SET valoracion = ?, fecha_valoracion = NOW()
       WHERE USUARIOS_id_usuario= ? AND CONCURSOS_id_concurso= ? `,
      [valoracion, id_usuario, id_concurso]
    );

    res.send({
      status: 'ok',
      message:
        'Has valorado este concurso, esperamos que tu experiencia haya sido positiva.'
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
