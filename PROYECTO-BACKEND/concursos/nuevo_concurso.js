require('dotenv').config();

const { getConnection } = require('../DB');
const { newConcourseSchema } = require('../validations/concursos');

async function newConcourse(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    await newConcourseSchema.validateAsync(req.body);

    // Defino los campos mínimos a rellenar para dar de alta un concurso. Todos "NOT NULL"
    const {
      nombre,
      fecha_inicio,
      fecha_final,
      descripcion,
      modalidad,
      genero
    } = req.body;

    //Compruebo que la descripción del concurso no exista para que no se produzcan duplicaciones
    //por error
    const [
      existingConcourse
    ] = await connection.query('SELECT nombre FROM CONCURSOS WHERE nombre=?', [
      nombre
    ]);

    if (existingConcourse.length) {
      throw generateError(
        'Esta descripción de concurso ya existe en la base de datos'
      );
    }

    // El await para que se inserten en la BD los campos cuando los tengamos preparados.
    //

    await connection.query(
      `INSERT INTO CONCURSOS ( nombre, fecha_inicio, fecha_final, url_foto, descripcion, modalidad, genero, ciudad )
      VALUES (?,?,?, NULL, ?,?,?, NULL)`,
      [nombre, fecha_inicio, fecha_final, descripcion, modalidad, genero]
    );

    res.send({
      status: 'ok',
      message: 'Concurso creado correctamente'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { newConcourse };
console.log('Llega hasta aquí.');
