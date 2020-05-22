const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const updateUserSchema = Joi.object().keys({
  nombre: Joi.string()
    .max(100)
    .min(2)
    .error(new Error('Tu nombre debe tener entre 2 y 100 caracteres')),

  apellidos: Joi.string()

    .max(200)
    .min(2)

    .error(new Error('El campo debe tener entre 2 y 200 caracteres')),

  descripcion: Joi.string()
    .max(1000)
    .min(10)
    .error(new Error('El campo debe tener entre 10 y 1000 caracteres'))
});
module.exports = { updateUserSchema };
