const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generateError } = require('../helpers');

const updateUserSchema = Joi.object().keys({
  nombre: Joi.string()
    .max(50)
    .min(2)
    .error(new Error('Tu nombre debe tener entre 2 y 100 caracteres')),

  apellidos: Joi.string()

    .max(50)
    .min(2)

    .error(new Error('Field must have between 2 and 50 types')),
  mail: Joi.string().email().error(new Error('Email not valid')),

  descripcion: Joi.string()
    .max(1000)
    .min(10)
    .error(new Error('El campo debe tener entre 10 y 1000 caracteres'))
});
module.exports = { updateUserSchema };
