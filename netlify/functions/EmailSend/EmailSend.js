// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  // service: 'gmail',
  host:'smtp.gmail.com',
  port:'465',
  service:'gmail',
  secure: true,
  auth: {
      user: 'alenaavni1999@gmail.com',
      pass: 'jtsgagtbwwcfende',
  },
  
});

const handler = async (event) => {
  const { email, subject, text } = JSON.parse(event.body);
  const mailOptions = {
      from: "alenaavni1999@gmail.com",
      to: "khanshab9343@gmail.com",
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
