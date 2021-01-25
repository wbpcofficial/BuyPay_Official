const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "danielworkemail66@gmail.com",
    pass: "Forever1995!((%",
  },
});

exports.sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "danielworkemail66@gmail.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
