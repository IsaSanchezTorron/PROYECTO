require('dotenv').config();

const { generateError } = require('../helpers');
const { getConnection } = require('../DB');

async function newInscription(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const userid = req.auth.id;
    const concourseid = req.params.id;
    //await newInscriptionSchema.validateAsync(req.body);

    /*const [
      existingInscription
    ] = await connection.query(
      'SELECT id_concurso, id_usuario from INSCRIPCIONES where id_concurso=? & id_usuario=?',
      [concourseid, userid]
    );

    if (existingInscription.length) {
      throw generateError('Ya te has inscrito a este concurso', 409);
    }
    */
    //console.log('prueba asf');

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
