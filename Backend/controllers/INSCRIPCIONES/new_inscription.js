require('dotenv').config();

const { generateError } = require('../../helpers');
const { getConnection } = require('../../DB');

async function newInscription(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const userid = req.auth.id;
    const concourseid = req.params.id;

    //Pendiente depurar la comprobación de duplicidad aunque la propia BD impide que se repita la combinación de las dos FK.
    /*
    const [
      existingInscription
    ] = await connection.query(
      'SELECT CONCURSOS_id_concurso, USUARIOS_id_usuario from INSCRIPCIONES where CONCURSOS_id_concurso=? & USUARIOS_id_usuario=?',
      [concourseid, userid]
    );

    if (existingInscription.length) {
      throw generateError('Ya te has inscrito a este concurso', 409);
    }
*/

    await connection.query(
      `INSERT INTO INSCRIPCIONES ( CONCURSOS_id_concurso, USUARIOS_id_usuario, fecha_inscripcion)
      VALUES (?, ?, NOW()) `,
      [concourseid, userid]
    );
    console.log('prueba1');
    res.send({
      status: 'ok',
      message: 'Te has inscrito correctamente a este concurso'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { newInscription };
console.log('Llega hasta aquí en nueva inscripcion');
