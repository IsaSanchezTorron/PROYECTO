const Joi = require('@hapi/joi');

const passwordSchema = Joi.string()
  .min(2)
  .max(100)
  .required()
  .error(new Error('El campo debe tener entre 2 y 100 caracteres'));

const mailSchema = Joi.string();
mail: Joi.string()
  .email()
  .required()
  .error(new Error('El correo electrónico no es válido'));

const loginSchema = Joi.object().keys({
  mail: mailSchema,
  contrasenha: passwordSchema
});

module.exports = { loginSchema };
