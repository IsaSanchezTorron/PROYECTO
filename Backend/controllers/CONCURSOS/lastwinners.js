require('dotenv').config();

const { getConnection } = require('../../DB');
const { generateError, formatDateToDB } = require('../../helpers');

async function seelastwinners(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const dateToday = formatDateToDB(new Date());
    console.log(dateToday);

    const [result] = await connection.query(
      `SELECT CONCURSOS.nombre as nombreconcurso, CONCURSOS.id_ganador, CONCURSOS.fecha_asignacion_ganador, USUARIOS.nombre as nombreusuario, USUARIOS.apellidos
FROM CONCURSOS
INNER JOIN USUARIOS ON USUARIOS.id_usuario = CONCURSOS.id_ganador
WHERE CONCURSOS.id_ganador IS NOT NULL
ORDER BY CONCURSOS.fecha_asignacion_ganador;`
    );

    if (!result.length) {
      throw generateError(
        `No existen todavía concursos en la Base de Datos que tengan ganador asignado`,
        404
      );
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

module.exports = { seelastwinners };
