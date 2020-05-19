const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const newConcourseSchema = Joi.object().keys({
  nombre: Joi.string()
    .max(500)
    .required()
    .error(
      new Error('El nombre del concurso no debe exceder de los 500 caracteres')
    ),

  fecha_inicio: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .required()
    .error(
      new Error(
        'El formato de la fecha no es correcto o se ha producido algún error relacionado'
      )
    ),
  fecha_final: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .required()
    .error(
      new Error(
        'El formato de la fecha del concurso no es correcto o se ha producido algún error relacionado'
      )
    ),
  descripcion: Joi.string()
    .max(5000)
    .required()
    .error(
      new Error(
        'La descripción de los concursos debe tener un máximo de 5000 caracteres'
      )
    ),
  modalidad: Joi.string()
    .max(20)
    .required()
    .error(
      new Error(
        'La modalidad del concurso debe tener un máximo de 20 caracteres. Opciones: "online" y "presencial"'
      )
    ),
  genero: Joi.string()
    .max(200)

    .error(
      new Error('El género del concurso debe tener un máximo de 200 caracteres')
    )
});
module.exports = { newConcourseSchema };
