require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError } = require('../../helpers');
const { updateConcourseSchema } = require('../../validations/edit_concourse');

async function setWinner(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id_usuario, id_concurso } = req.body;

    const [
      existingConcourse
    ] = await connection.query(
      `SELECT id_concurso, nombre FROM CONCURSOS WHERE id_concurso=?`,
      [id_concurso]
    );

    if (!existingConcourse.length) {
      throw generateError('No existe este concurso en la BD', 400);
    }

    const [
      existingUser
    ] = await connection.query(
      `SELECT id_usuario FROM USUARIOS WHERE id_usuario=?`,
      [id_usuario]
    );
    if (!existingUser.length) {
      throw generateError('No existe este usuario en la BD', 400);
    }

    const [existingInscription] = await connection.query(
      `SELECT USUARIOS_id_usuario, CONCURSOS_id_concurso FROM INSCRIPCIONES 
      WHERE USUARIOS_id_usuario=? AND CONCURSOS_id_concurso=?`,
      [id_usuario, id_concurso]
    );
    if (!existingInscription.length) {
      throw generateError(
        'No existe coincidencias para esta inscripción, comprueba que el usuario está inscrito'
      );
    }

    const [
      existingWinner
    ] = await connection.query(
      `SELECT id_ganador FROM CONCURSOS WHERE id_concurso=?`,
      [id_concurso]
    );

    /*  console.log(existingWinner.id_ganador !== null); */
    console.log(typeof existingWinner[0].id_ganador);
    if (typeof existingWinner[0].id_ganador === 'number') {
      throw generateError('Este concurso ya tiene un ganador asignado.', 401);
    }

    await connection.query(
      `UPDATE CONCURSOS SET id_ganador=?, fecha_asignacion_ganador = NOW() WHERE id_concurso=?`,
      [id_usuario, id_concurso]
    );

    res.send({
      status: 'ok',
      message: `Has asignado un ganador al concurso ${existingConcourse[0].nombre}`
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { setWinner };
