require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError } = require('../../helpers');

async function getInscriptionHistoryUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.auth;
    // Pido la lista de concursos a las que el usuario está inscrito haciendo join con tabla de concursos y usuarios.
    const [result] = await connection.query(
      `SELECT USUARIOS.id_usuario, USUARIOS.nombre, USUARIOS.apellidos, INSCRIPCIONES.CONCURSOS_id_concurso,
             CONCURSOS.nombre as nombre_concurso, CONCURSOS.descripcion, CONCURSOS.fecha_inicio, CONCURSOS.fecha_publicacion, CONCURSOS.fecha_final, INSCRIPCIONES.valoracion
             FROM USUARIOS 
             INNER JOIN INSCRIPCIONES ON USUARIOS.id_usuario = INSCRIPCIONES.USUARIOS_id_usuario 
             INNER JOIN CONCURSOS ON CONCURSOS.id_concurso = INSCRIPCIONES.CONCURSOS_id_concurso
             WHERE USUARIOS.id_usuario = ?`,
      [id]
    );
    console.log(result);
    if (!result.length) {
      throw generateError('Todavía no estás inscrito en ningún concurso.', 404);
    }

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

module.exports = { getInscriptionHistoryUser };
