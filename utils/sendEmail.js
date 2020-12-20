const nodemailer = require('nodemailer');
const emailTemp = require("./emailTemps");

const sendEmail = async (targetUserEmail, verifyAccURL, msgType) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.AUTO_EMAIL_USERNAME, // generated ethereal user
                pass: process.env.AUTO_EMAIL_PASSWORD, // generated ethereal password
            },
        });
        const msg = emailTemp[msgType];
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"YelpCamp 🏕️" <test@YOURMAIL.com>', // sender address
            to: targetUserEmail, // list of receivers
            subject: msg.subject,
            text: msg.text(verifyAccURL),
            html: msg.html(verifyAccURL),
        });

        console.log("Message sent: %s", info.messageId);
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = { sendEmail }