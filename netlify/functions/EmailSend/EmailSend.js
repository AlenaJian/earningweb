
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({

  host: process.env.HOST,
  port:process.env.PORT,
  service:process.env.SERVICE,
  secure: true,
  auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
  },
  
});

const handler = async (event) => {
  const { email, subject, text } = JSON.parse(event.body);
  const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: subject,
      text: text,
  };

  try {
      await transport.sendMail(mailOptions);
      return {
          statusCode: 200,
          body: JSON.stringify({
              message: 'Email sent successfully',
          }),
      };
  } catch (err) {
      console.log('error', err);
      return {
          statusCode: 500,
          body: JSON.stringify({
              message: 'Please try after sometime',
          }),
      };
  }

}


module.exports = { handler }
