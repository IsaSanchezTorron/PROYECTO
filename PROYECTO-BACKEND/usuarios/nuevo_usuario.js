require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('../DB');
const { newUserSchema } = require('../validations/usuarios');
const { generateError } = require('../helpers');

async function newUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    await newUserSchema.validateAsync(req.body);

    /////////////////////////////////////////////////////////////////
    const { nombre, apellidos, mail, contrasenha } = req.body;

    const [
      existingEmail
    ] = await connection.query('SELECT id_usuario from USUARIOS where mail=?', [
      mail
    ]);

    if (existingEmail.length) {
      throw generateError('Ya hay un usuario registrado con este mail', 409);
    }

    const dbPassword = await bcrypt.hash(contrasenha, 10);
    ////// mogollon de cosas por aqui  /////////////////////////////ls

    ///////////////////////////////////////////////////////////////

    const registrationCode = randomString(40);
    const validationURL = `${process.env.PUBLIC_HOST}/users/validate?code=${registrationCode}`;

    try {
      await sendEmail({
        email: email,
        title: 'Debes validar tu cuenta para LOA',
        content: `Para validar tu cuenta con LOA, clicka este enlace: ${validationURL}`
      });
    } catch (error) {
      console.error(error.response.body);
      throw new Error('Error al enviar el correo electrónico..');
    }

    let savedFileAvatar;
    if (req.files && req.files.avatar) {
      try {
        savedFileAvatar = await savedAvatar(req.files.avatar);

        if (current && current.avatar) {
          await deletePhoto(current.avatar);
        }
      } catch (error) {
        throw generateError(
          'No se pudo procesar la imagen, inténtalo de nuevo',
          400
        );
      }
    } else {
      savedFileAvatar = current.avatar;
    }

    await connection.query(
      `INSERT INTO USUARIOS ( nombre, apellidos, mail, contrasenha, url_foto, descripcion, fecha_registro, fecha_modificacion, codigo_registro, rol)
      VALUES (?,?,?,?,NULL,NULL,NOW(),NOW(),NULL,?,"escritor") `,
      [nombre, apellidos, mail, contrasenha, registrationCode]
    );

    res.send({
      status: 'ok',
      message: 'Usuario creado correctamente.'
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
