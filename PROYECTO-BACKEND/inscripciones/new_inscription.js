require('dotenv').config();

const { generateError } = require('../helpers');
const { getConnection } = require('../DB');

async function newInscription(req, res, next) {
  let connection;

  try {
    console.log('entró aquí');

    connection = await getConnection();
    const userid = req.auth.id_usuario;
    const concourseid = req.params.id_concurso;
    //await newInscriptionSchema.validateAsync(req.body);
    console.log('prueba1');

    const [
      existingInscription
    ] = await connection.query(
      'SELECT id_concurso, id_usuario from INSCRIPCIONES where id_concurso=? & id_usuario=?',
      [concourseid, userid]
    );

    if (existingInscription.length) {
      throw generateError('Ya te has inscrito a este concurso', 409);
    }
    console.log('prueba asf');
    await connection.query(
      `INSERT INTO INSCRIPCIONES ( id_concurso, id_usuario, fecha_inscripcion)
      VALUES (?,?,NOW()) `,
      [concourseid, userid]
    );

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
