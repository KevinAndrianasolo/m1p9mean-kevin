const nodemailer  = require('nodemailer');

let sendMail = async function(mail){
    console.log(mail);
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //   let account = await nodemailer.createTestAccount();
    let account = {
        user : "m1p9mean.kevin@gmail.com",
        pass : "kevinM1P9"
    }
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        //host: "smtp.ethereal.email",
        host: "smtp.gmail.com",

        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: account.user, // sender address
        to: mail.recipient, // list of receivers
        subject: mail.subject, // Subject line
        text: mail.text, // plain text body
        // html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
module.exports.sendMail = sendMail;



