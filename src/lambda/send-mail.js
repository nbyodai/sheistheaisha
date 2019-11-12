const nodemailer = require("nodemailer");

export function handler(event, context, callback) {
  const body = JSON.parse(event.body);
  
  const EMAIL_USERNAME = process.env.EMAIL_USERNAME
  const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
  const HELLO_EMAIL = process.env.HELLO_EMAIL

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    }
  });

  const mailOptions = {
    from: body.email,
    to: HELLO_EMAIL,
    subject: `Hi, Aisha, ${body.name} would like to contact you`,
    html: `<p>${body.message}</p>`
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.error({ err });
    else console.log({ info });
  });

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      msg: 'sent email'
    })
  });
}