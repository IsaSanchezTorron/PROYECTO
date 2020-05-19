require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('../DB');
const { editPasswordSchema } = require('../validations/edit_password');
const { generateError } = require('../helpers');

async function updatePassword(req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    connection = await getConnection();

    await editPasswordSchema.validateAsync(req.body);

    const { oldPassword, newPassword } = req.body;

    if (Number(id) !== req.auth.id) {
      throw generateError(
        `No puede cambiar la password del usuario con id ${id}`,
        401
      );
    }

    if (oldPassword === newPassword) {
      throw generateError(
        'La nueva contraseña no debe ser igual a la anterior',
        400
      );
    }

    // Sacar la info del usuario de la base de datos
    const [currentUser] = await connection.query(
      `
      SELECT id_usuario, contrasenha from USUARIOS where id_usuario=?
      `,
      [id]
    );

    if (!currentUser.length) {
      throw generateError(`The user with id ${id} does not exist`, 404);
    }

    const [dbUser] = currentUser;

    // Comprobar que la vieja password envíada sea la correcta
    // el orden es: passord sin encriptar, password encriptada
    const passwordsMath = await bcrypt.compare(oldPassword, dbUser.contrasenha);

    if (!passwordsMath) {
      throw generateError('Tu password antigua es incorrecta', 401);
    }

    // Generar el hash de la contraseña
    const dbNewPassword = await bcrypt.hash(newPassword, 10);

    // actualizar la base de datos
    await connection.query(
      `
      UPDATE USUARIOS SET contrasenha=?, fecha_modificacion_contrasenha= NOW() WHERE id_usuario=?
    `,
      [dbNewPassword, id]
    );

    res.send({
      status: 'ok',
      message:
        'La contraseña ha sido cambiada con éxito. Por favor haz el proceso de login de nuevo'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { updatePassword };
