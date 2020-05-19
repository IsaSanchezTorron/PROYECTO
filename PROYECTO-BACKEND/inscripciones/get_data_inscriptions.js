/*require('dotenv').config();

const { getConnection } = require('../DB');
const { generateError } = require('../helpers');

async function getInscriptions(req, res, next) {
    let connection;

    try {
        connection = await getConnection();

        const { id } = req.params;

        const [result] = await connection.query(
          ` SELECT USUARIOS.id_usuario, USUARIOS.nombre, USUARIOS.apellidos, CONCURSOS_id_concurso,
            CONCURSOS.nombre, CONCURSOS.fecha_inicio, CONCURSOS.fecha_final
            FROM USUARIOS 
            INNER JOIN INSCRIPCIONES ON id_usuario = USUARIOS_id_usuario 
            INNER JOIN CONCURSOS ON id_concurso = INSCRIPCIONES.CONCURSOS_id_concurso;`
            [id]
        );

        if (!result.length) {
            throw generateError(`Todavía no te has inscrito a ningún concurso.`, 404);
        }
        const [userData] = result;
        // const payload = { id_usuario: userData.id_usuario };
        let payload = {};
        // const payload = {;
         nombre: userData.nombre,
                  apellidos: userData.apellidos,
                  mail = userData.mail,
                  // contrasenha = userData.contrasenha,
                  url_foto = userData.contrasenha,
                  fecha_registo: userData.fecha_registro,
                  rol: userData.rol
      };


        if (userData.id_usuario === req.auth.id || req.auth.rol === 'admin') {
            payload.nombre = userData.nombre;
            payload.apellidos = userData.apellidos;
            payload.mail = userData.mail;
            payload.url_foto = userData.url_foto;
            payload.descripcion = userData.descripcion;
            payload.fecha_registro = userData.fecha_registro;
            payload.rol = userData.rol;
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

module.exports = { getUser };

*/
