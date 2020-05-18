require('dotenv').config();

const { getConnection } = require('../DB');
const { generateError } = require('../helpers');

async function getConcourse(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `SELECT id_concurso, nombre, fecha_inicio, fecha_final, url_foto, descripcion, modalidad, genero,ciudad
           FROM CONCURSOS WHERE id_concurso=?`,
      [id]
    );

    if (!result.length) {
      throw generateError(`No existe ningún concurso con ese ${id}`, 404);
    }
    const [concourseData] = result;

    let payload = {};

    if (concourseData.id_concourse === req.auth.id_concourse) {
      payload.nombre = concourseData.nombre;
      payload.fecha_inicio = concourseData.apellidos;
      payload.fecha_final = concourseData.mail;
      payload.url_foto = concourseData.url_foto;
      payload.descripcion = concourseData.fecha_registro;
      payload.modalidad = concourseData.rol;
      payload.genero = concourseData.genero;
      payload.ciudad = concouseData.ciudad;
    } else {
      throw generateError('No tiene permisos para ver esta información', 401);
    }
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
