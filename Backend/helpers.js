require('dotenv').config();

const path = require('path');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const sharp = require('sharp');

const { format } = require('date-fns');

const fs = require('fs-extra');
const uuid = require('uuid');

const imageUploadPath = path.join(__dirname, process.env.UPLOADS_DIR);

console.log(path);

function formatDateToDB(date) {
  return format(date, 'yyyy-MM-dd');
}

function generateError(message, code) {
  const error = new Error(message);
  if (code) error.httpCode = code;
  return error;
}

function randomString(size = 20) {
  return crypto.randomBytes(size).toString('hex').slice(0, size);
}

async function sendEmail({ email, title, content }) {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const msg = {
    to: email,
    from: 'isasancheztorron@gmail.com',
    subject: title,
    text: content,
    html: `<div>
      <h1>Por favor, valida tu email.</h1>
      <p>${content}</p>  
    </div>`
  };

  await sgMail.send(msg);
}

async function processAndSavePhoto(uploadedImage) {
  const savedFileName = `${uuid.v1()}.jpg`;

  await fs.ensureDir(imageUploadPath);

  const finalImage = sharp(uploadedImage.data);

  const imageInfo = await finalImage.metadata();

  if (imageInfo.width > 450) {
    finalImage.resize(450);
  }

  await finalImage.toFile(path.join(imageUploadPath, savedFileName));

  return savedFileName;
}

async function deletePhoto(imagePath) {
  await fs.unlink(path.join(imageUploadPath, imagePath));
}

function searchConcourses(queryParams) {
  let query = `SELECT CONCURSOS.id_concurso, CONCURSOS.nombre, CONCURSOS.fecha_publicacion, CONCURSOS.fecha_final, CONCURSOS.url_foto, CONCURSOS.descripcion, CONCURSOS.modalidad, CONCURSOS.genero, CONCURSOS.ciudad,  CONCURSOS.id_ganador, CONCURSOS.fecha_asignacion_ganador, USUARIOS.nombre as nombre_ganador, USUARIOS.apellidos, ROUND(AVG(INSCRIPCIONES.valoracion),1) as valoracionmedia
    FROM CONCURSOS
    LEFT JOIN USUARIOS ON USUARIOS.id_usuario = CONCURSOS.id_ganador
    LEFT JOIN INSCRIPCIONES ON INSCRIPCIONES.CONCURSOS_id_concurso = CONCURSOS.id_concurso
    `;

  const params = [];
  const {
    nombre,
    fecha_publicacion,
    fecha_final,
    genero,
    modalidad,
    ciudad
  } = queryParams;

  if (
    nombre ||
    fecha_publicacion ||
    fecha_final ||
    genero ||
    modalidad ||
    ciudad
  ) {
    query = `${query} WHERE`;
    const conditions = [];

    if (nombre) {
      conditions.push('CONCURSOS.nombre LIKE ?');
      params.push(`%${nombre}%`);
    }

    if (fecha_publicacion) {
      conditions.push('CONCURSOS.fecha_final >= ?');
      params.push(fecha_publicacion);
    }

    if (fecha_final) {
      conditions.push('CONCURSOS.fecha_final >= ?');
      params.push(fecha_final);
    }

    if (genero) {
      conditions.push('CONCURSOS.genero like = ?');
      params.push(`%${genero}%`);
    }

    if (ciudad) {
      conditions.push('CONCURSOS.ciudad like = ?');
      params.push(`%${ciudad}%`);
    }

    if (modalidad) {
      conditions.push('CONCURSOS.modalidad = ?');
      params.push(modalidad);
    }

    query = `${query} ${conditions.join(' AND ')} `;
  }
  query = `${query} GROUP BY CONCURSOS.id_concurso
    ORDER BY CONCURSOS.fecha_final DESC`;
  return {
    query,
    params
  };
}

module.exports = {
  formatDateToDB,
  sendEmail,
  generateError,
  randomString,
  processAndSavePhoto,
  deletePhoto,
  searchConcourses
};
