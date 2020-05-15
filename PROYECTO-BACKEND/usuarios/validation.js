require('dotenv').config();

const { getConnection } = require('../DB');
const { generateError } = require('../helpers');

async function validateUser(req, res, next) {
  let connection;

  try {
    const { code } = req.query;

    connection = await getConnection();

    //Actualizar el usuario
    const [
      result
    ] = await connection.query(
      'UPDATE USUARIOS SET activo=1,codigo_registro=NULL WHERE codigo_registro=?',
      [code]
    );
    if (result.affectedRows === 0) {
      throw generateError('Wrong validation', 400);
    }
    res.send({
      status: 'ok',
      message: 'User is validated, now, you can login.'
      // data: {
      //   token
      // }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { validateUser };
