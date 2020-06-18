const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generateError } = require('../helpers');
const { passwordSchema } = require('./usuarios');

const editPasswordSchema = Joi.object().keys({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
  newPasswordRepeat: Joi.any()
    .valid(Joi.ref('newPassword'))
    .error(
      generateError(
        'Por favor, asegúrate de que ambas contraseñas coinciden.',
        400
      )
    )
});

module.exports = { editPasswordSchema };
