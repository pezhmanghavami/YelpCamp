const { urlencoded } = require("express")

const msg = {
    subject: "🏕️ Welcome to YelpCamp! 🏕️",
    text: function (verifyAccURL) {
        return `Welcome to YelpCamp!\nPlease verify Your Account throught this link\n${verifyAccURL}`
    },
    html: function (verifyAccURL) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to YelpCamp</title>
            <style>
                body{
                    text-align: center;
                    background-color: #353535;
                    color: white;
                }
                a {
                    color: #4f82ce;
                }
            </style>
        </head>
        <body>
            <main>
                <h3>Welcome to YelpCamp!</h3>
                <a href="${verifyAccURL}">Please verify Your Account by clicking on this link.</a>
                <p>If the link above doesn't work please use copy and paste this link into your browser and press enter.</p>
                ${verifyAccURL}
                <a href="http://127.0.0.1:300/campgrounds">Start browsing our campgrounds now!</a>
            </main>
        </body>
        </html>`
    }
}
module.exports = { msg }