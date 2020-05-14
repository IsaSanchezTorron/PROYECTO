require('dotenv').config();
const { getConnection } = require('../../database/db');

async function newUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    ///////OCURREN MOVIDAS///////
    res.send({
      status: 'ok',
      message:
        'User created properly.Check your email for activate your account.'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { newUser };
console.log('rulando');
