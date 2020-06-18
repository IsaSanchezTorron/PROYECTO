require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getConnection } = require('../../DB');
const { generateError } = require('../../helpers');
const { loginSchema } = require('../../validations/login');

async function loginUser(req, res, next) {
  let connection;

  try {
    await loginSchema.validateAsync(req.body);

    const { mail, contrasenha } = req.body;
    connection = await getConnection();
    const [
      dbUser
    ] = await connection.query(
      'SELECT id_usuario, nombre, mail, contrasenha, rol  FROM USUARIOS WHERE mail=? AND activo=1',
      [mail]
    );

    if (!dbUser.length) {
      throw generateError(
        'Actualmente no hay ningun usuario con ese correo electrónico, comprueba que estás registrado o chequea tu correo para activarla',
        404
      );
    }

    const [user] = dbUser;
    const passwordsMath = await bcrypt.compare(contrasenha, user.contrasenha);

    if (!passwordsMath) {
      throw generateError('Password incorrecta', 401);
    }
    console.log(user);
    const tokenPayload = {
      id: user.id_usuario,
      name: user.nombre,
      mail: user.mail,
      rol: user.rol
    };
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: '60d'
    });

    res.send({
      status: 'ok',
      message: 'Login correcto, coño!',
      mail: user.mail,
      id: user.id_usuario,
      name: user.nombre,
      rol: user.rol,
      data: { token }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { loginUser };
