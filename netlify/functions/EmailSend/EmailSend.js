
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
    const headers = {
        "Access-Control-Allow-Origin": "http://localhost:3000", // Update to specific origins if needed
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      };
      if (event.httpMethod === 'OPTIONS') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: "CORS preflight request success" }),
        };
      }

  console.log("emaillll",event.body)
  const { email, subject, text } = JSON.parse(event.body);
  console.log("check",email, subject, text)
  const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: subject,
      text: text,
  };

  try {
       transport.sendMail(mailOptions).then(()=>{
        return {
            statusCode: 200,
             headers: {
                  "Access-Control-Allow-Origin": "*",
              },
            body: JSON.stringify({
                message: 'Email sent successfully',
            }),
        };
       }).catch((Err)=>{
        console.log('error', Err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Please try after sometime',
            }),
        };
       });
     
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
