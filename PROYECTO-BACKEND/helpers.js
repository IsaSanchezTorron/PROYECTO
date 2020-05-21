const { format } = require('date-fns');
require('dotenv').config();
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

const sharp = require('sharp');
const path = require('path');
const fs = require('fs-extra');
const uuid = require('uuid');
const crypto = require('crypto');
const imageUploadPath = path.join(__dirname, process.env.UPLOADS_DIR);

function formatDateToDB(date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
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

  await fs.ensueDir(imageUploadPath);
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

module.exports = {
  formatDateToDB,
  sendEmail,
  generateError,
  randomString,
  processAndSavePhoto,
  deletePhoto
};
