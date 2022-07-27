const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const {NO_REPLY_EMAIL,NO_REPLY_EMAIL_PASSWORD,FRONTEND_URL} = require('../configs/configs');
const emailTemplates = require('../email-templates');
const CError = require("../errors/CustomError");

module.exports = {
  sendMail: async (userMail = '', emailAction = '', context = {}) => {
    const transporter = nodemailer.createTransport({
      from: 'No reply',
      auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD,
      },
      service: 'gmail',
    });

    const hbsOptions = {
      viewEngine: {
        extname: '.hbs', //так як тут вказано hbs то можна створювати файли main.hbs замість main.handlebars
        defaultLayout: 'main',
        layoutsDir: path.join(process.cwd(), 'email-templates', 'layouts'),
        partialsDir: path.join(process.cwd(), 'email-templates', 'partials'),
      },
      viewPath: path.join(process.cwd(), 'email-templates', 'views'),
      extName: '.hbs',
    }

    transporter.use('compile', hbs(hbsOptions));

    const templateInfo = emailTemplates[emailAction];
    if (!templateInfo) {
      throw new CError('Wrong email action', 500);
    }

    context.frontendURL = FRONTEND_URL;

    console.log(`Email start sending | email: ${userMail} | action: ${emailAction}`);
    return transporter.sendMail({
      to: userMail,
      subject: templateInfo.subject,
      template: templateInfo.template,
      context
    });
  }
}
