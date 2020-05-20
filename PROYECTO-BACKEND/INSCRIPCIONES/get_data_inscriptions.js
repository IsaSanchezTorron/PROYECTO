require('dotenv').config();

const { getConnection } = require('../DB');
const { generateError } = require('../helpers');

async function getInscribed(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [result] = await connection.query(
      `SELECT CONCURSOS.id_concurso, CONCURSOS.nombre, CONCURSOS.fecha_inicio, CONCURSOS.fecha_final, USUARIOS.id_usuario, USUARIOS.nombre, USUARIOS.apellidos, INSCRIPCIONES.fecha_inscripcion
FROM USUARIOS
INNER JOIN INSCRIPCIONES ON  INSCRIPCIONES.USUARIOS_id_usuario= USUARIOS.id_usuario
INNER JOIN CONCURSOS  ON  CONCURSOS.id_concurso = INSCRIPCIONES.CONCURSOS_id_concurso
WHERE id_concurso = ? `,

      [id]
    );

    console.log(result);
    if (!result.length) {
      throw generateError('Nadie se ha inscrito en este concurso todavía', 404);
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

module.exports = { getInscribed };
