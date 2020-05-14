require('dotenv').config();
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

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
    to: mail,
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
module.exports = { sendEmail, generateError, randomString };
