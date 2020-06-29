require('dotenv').config();

const { getConnection } = require('../../DB');
const { newConcourseSchema } = require('../../validations/nuevo_concurso');
const {
  generateError,
  processAndSavePhoto,
  formatDateToDB
} = require('../../helpers');

async function newConcourse(req, res, next) {
  let connection;
  try {
    await newConcourseSchema.validateAsync(req.body);
    connection = await getConnection();

    // Defino los campos mínimos a rellenar para dar de alta un concurso. Todos "NOT NULL"
    const {
      nombre,
      fecha_final,
      descripcion,
      modalidad,
      genero,
      ciudad
    } = req.body;

    let savedFileName;
    console.log(req.files);
    console.log(req.files.url_foto);

    if (req.files && req.files.url_foto) {
      try {
        savedFileName = await processAndSavePhoto(req.files.url_foto);
      } catch (error) {
        throw generateError(
          'Ha habido un error en el procesado, inténtalo más tarde.',
          400
        );
      }
    }

    //Compruebo que la descripción del concurso no exista para que no se produzcan duplicidades
    //por error
    const [
      existingConcourse
    ] = await connection.query(`SELECT nombre FROM CONCURSOS WHERE nombre=?`, [
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
      `INSERT INTO CONCURSOS ( nombre, fecha_final, url_foto, descripcion, modalidad, genero, ciudad, fecha_publicacion )
      VALUES (?,?,?,?,?,?,?, NOW())`,
      [
        nombre,
        fecha_final,
        savedFileName,
        descripcion,
        modalidad,
        genero,
        ciudad
      ]
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
