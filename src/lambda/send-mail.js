const nodemailer = require("nodemailer");

export function handler(event, context, callback) {
  const body = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: body.email,
    to: process.env.HELLO_EMAIL,
    subject: `Hi, Aisha, ${body.name} would like to contact you`,
    html: `<p>${body.message}</p>`
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      msg: 'sent email'
    })
  });
}
