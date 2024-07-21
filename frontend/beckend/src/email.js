const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: 'rachelb2855@gmail.com', 
        pass: 'gaeh llzr cqcd ftnq' 
    }
});

let sendMail = (to, subject, text, html) => {
    let mailOptions = {
        from: '"music" <rachelb2855@gmail.com>', 
        to: to,
        subject: subject, 
        text: text, 
        html: html 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};

module.exports = sendMail;
