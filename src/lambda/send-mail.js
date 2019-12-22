const mailgun = require("mailgun-js");

export function handler(event, context, callback) {
  const body = JSON.parse(event.body);

  const HELLO_EMAIL = process.env.HELLO_EMAIL;
  const API_KEY = process.env.MAILGUN_API_KEY;
  const DOMAIN = process.env.MAILGUN_DOMAIN;
  const URL = process.env.MAILGUN_URL;

  const loaded = mailgun({ apiKey: API_KEY, domain: DOMAIN, url: URL });
  const data = {
    from: `Your Site Visitor <${body.email}>`,
    to: HELLO_EMAIL,
    subject: `Hi, Aisha, ${body.name} would like to contact you`,
    text: `${body.message}`,
    html: `<p>${body.message}</p>`
  };

  loaded.messages().send(data, (error, body) => {
    if (error) {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          error: error
        })
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          info: body
        })
      });
    }
  });
}
