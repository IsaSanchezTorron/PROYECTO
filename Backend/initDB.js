require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('./DB');

async function main() {
  const connection = await getConnection();
  /*
  console.log('Borrando tablas si existen');
  await connection.query('DROP TABLE IF EXISTS CONCURSOS');
  await connection.query('DROP TABLE IF EXISTS USUARIOS');
  await connection.query('DROP TABLE IF EXISTS INSCRIPCIONES');
  await connection.query('DROP TABLE IF EXISTS VALORACIONES');

  console.log('Creando tablas de BB.DD.');

  await connection.query(`CREATE TABLE  CONCURSOS (
  id_concurso INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  fecha_inicio DATETIME NOT NULL,
  url_foto VARCHAR(100) NULL,
  descripcion TEXT NOT NULL,
  modalidad ENUM('presencial', 'online') NOT NULL,
  genero VARCHAR(100) NOT NULL
 );`);

  await connection.query(
    `CREATE TABLE  USUARIOS (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NULL,
  apellidos VARCHAR(45) NULL,
  mail VARCHAR(100) NOT NULL,
  contrasenha VARCHAR(100) NOT NULL,
  url_foto VARCHAR(100) NULL,
  descripcion TEXT,
  fecha_registro DATETIME NOT NULL,
  fecha_modificacion DATETIME, 
  codigo_registro VARCHAR (100),
  rol ENUM ('escritor', 'agregador', 'admin') default 'escritor' NOT NULL
 );`
  );

  await connection.query(
    `CREATE TABLE  INSCRIPCIONES (
FOREIGN KEY(id_concurso) REFERENCES CONCURSOS(id_concurso),
FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario),
fecha_inscripcion DATETIME NOT NULL,


  PRIMARY KEY (CONCURSOS_id_concurso, USUARIOS_id_usuario),
  CONSTRAINT fk_CONCURSOS_has_USUARIO_CONCURSO1
    FOREIGN KEY CONCURSOS_id_concurso
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_CONCURSOS_has_USUARIO_USUARIO1
    FOREIGN KEY USUARIOS_id_usuario
  
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

 );`
  );

  await connection.query(`CREATE TABLE  VALORACIONES (


FOREIGN KEY (id_concurso) REFERENCES CONCURSOS (id_concurso),
FOREIGN KEY (id_usuario) REFERENCES USUARIOS (id_usuario),
puntuacion INT NULL,
fecha_valoracion DATETIME,


  PRIMARY KEY (CONCURSOS_id_concurso, USUARIOS_id_usuario),
  CONSTRAINT fk_CONCURSOS_has_USUARIO_CONCURSO2
    FOREIGN KEY (CONCURSOS_id_concurso)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION

  CONSTRAINT fk_CONCURSOS_has_USUARIO_USUARIO2
  FOREIGN KEY USUARIOS_id_usuario
   
    ON DELETE NO ACTION
    ON UPDATE NO ACTION

 );`);

  //Crear usuario admin inicial
  const password = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

  await connection.query(`
        INSERT INTO USUARIOS(nombre, apellidos, mail, contrasenha, urlFoto, descripcion, fecha_registro, fecha_modificacion, codigo_registro, rol)
        VALUES("Isabel", "Sánchez Torrón", "isasancheztorron@gmail.com",  "${password}", "http://", "Me llamo Isa y soy admin", "2020-8-05", NULL, "administrador")
      `);
      */

  const result = await connection.query('SELECT * FROM CONCURSOS');
  console.log(result[0]);
  connection.release();
  process.exit(); //Se cierra el proceso lanzado (initDB)
}

main();
