const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  console.log("in the mail");
  const mailOptions = {
    from: '"Ramana Gowrishetty" - ramana.03shetty@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  try {
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendEmail };
