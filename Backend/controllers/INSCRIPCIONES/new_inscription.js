require('dotenv').config();

const { generateError, formatDateToDB } = require('../../helpers');
const { getConnection } = require('../../DB');

async function newInscription(req, res, next) {
  let connection;

  try {
    //Establece
    connection = await getConnection();

    const idusuario = req.auth.id;

    const idconcurso = req.params.id;

    const [
      current
    ] = await connection.query(
      `SELECT id_concurso, fecha_final FROM CONCURSOS WHERE id_concurso=?`,
      [idconcurso]
    );

    const today = new Date();
    console.log(current[0].fecha_final < today);
    console.log(today);

    if (current[0].fecha_final < today) {
      throw generateError(
        '¡No puedes escribirte en un concurso que ya ha terminado!'
      );
    }

    if (current[0].fecha_final >= today) {
      await connection.query(
        `INSERT INTO INSCRIPCIONES ( CONCURSOS_id_concurso, USUARIOS_id_usuario, fecha_inscripcion)
      VALUES (?, ?, NOW()) `,
        [idconcurso, idusuario]
      );

      res.send({
        status: 'ok',
        message: 'Te has inscrito correctamente a este concurso'
      });
    }
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
