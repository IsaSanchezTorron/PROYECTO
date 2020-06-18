const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generateError } = require('../helpers');

const newRatingSchema = Joi.object().keys({
  /*fecha_valoracion: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .error(new Error('La fecha es incorrecta', 400)),*/

  valoracion: Joi.number()
    .min(1)
    .max(5)
    .integer()
    .error(
      new Error('Sólo son válidos números entre el 1 y el 5, sin decimales')
    )
});
module.exports = { newRatingSchema };
