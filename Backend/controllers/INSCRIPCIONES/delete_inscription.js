require('dotenv').config();
const { getConnection } = require('../../DB');
const { generateError } = require('../../helpers');

async function deleteInscription(req, res, next) {
  let connection;
  try {
    const userid = req.auth.id;
    const concourseid = req.params.id;

    connection = await getConnection();

    await connection.query(
      'DELETE FROM INSCRIPCIONES WHERE id_usuario=? & concourse_id=?',
      [userid, concourseid]
    );

    res.send({
      status: 'OK',
      message: `Se ha cancelado tu suscripción a este concurso.`
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { deleteInscription };
