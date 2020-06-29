require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError } = require('../../helpers');

async function listingConcourses(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `SELECT CONCURSOS.id_concurso, CONCURSOS.nombre, CONCURSOS.fecha_inicio, CONCURSOS.fecha_final, CONCURSOS.fecha_publicacion, CONCURSOS.url_foto, CONCURSOS.descripcion, CONCURSOS.modalidad, CONCURSOS.genero, CONCURSOS.ciudad, ROUND(AVG(INSCRIPCIONES.valoracion), 1) AS valoracion, CONCURSOS.id_ganador, CONCURSOS.fecha_asignacion_ganador, USUARIOS.nombre AS nombre_ganador, USUARIOS.apellidos
    FROM CONCURSOS
    LEFT JOIN INSCRIPCIONES ON  INSCRIPCIONES.CONCURSOS_id_concurso = CONCURSOS.id_concurso 
    LEFT JOIN USUARIOS ON USUARIOS.id_usuario = CONCURSOS.id_ganador
    GROUP BY CONCURSOS.id_concurso
    ORDER BY CONCURSOS.fecha_final DESC`
    );

    if (!result.length) {
      throw generateError(`No existen concursos en la Base de Datos`, 404);
    }
    console.log(result);

    res.send({
      status: 'ok',
      data: result
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listingConcourses };
