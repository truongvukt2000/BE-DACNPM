const nodemailer = require("nodemailer");

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    const myEmail = process.env.EMAIL;
    const myPassword = process.env.PASSWORD;
    const apiUrl = process.env.SERVER_URL;
    const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: myEmail,
          pass: myPassword,
        },
      });

    transport.sendMail({
      from: myEmail,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=${apiUrl}/verifyAccount/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };