require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError, formatDateToDB } = require('../../helpers');

async function getConcourse(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `
    SELECT id_concurso, nombre, fecha_publicacion,fecha_final, url_foto, descripcion, modalidad, genero, ciudad, ROUND(AVG(INSCRIPCIONES.valoracion), 1) AS valoracion
    FROM CONCURSOS
    INNER JOIN INSCRIPCIONES 
    ON  INSCRIPCIONES.CONCURSOS_id_concurso = CONCURSOS_id_concurso 
    WHERE id_concurso= ?
    ORDER BY fecha_publicacion`,
      [id]
    );

    if (!result.length) {
      throw generateError(`No existe ningún concurso con ese ${id}`, 404);
    }

    const [concourseData] = result;

    const payload = {
      nombre: concourseData.nombre,
      fecha_inicio: formatDateToDB(concourseData.fecha_inicio),
      fecha_final: formatDateToDB(concourseData.fecha_final),
      url_foto: concourseData.url_foto,
      descripcion: concourseData.descripcion,
      modalidad: concourseData.modalidad,
      genero: concourseData.genero,
      ciudad: concourseData.ciudad,
      valoracion: concourseData.valoracion
    };

    res.send({
      status: 'ok',
      data: payload
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
console.log('Llego hasta aquí en get_data de concursos');
module.exports = { getConcourse };
