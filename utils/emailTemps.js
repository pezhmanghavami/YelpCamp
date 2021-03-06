const emailVerified = {
    subject: "🏕️ Your email has been verified! - YelpCamp 🏕️",
    text: function (a) {
        return `Your email has been successfully verified.`
    },
    html: function (a) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your email has been successfully verified</title>
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
                <h3>Your email has been successfully verified!</h3>
                <a href="http://127.0.0.1:300/campgrounds">Start browsing our campgrounds now!</a>
            </main>
        </body>
        </html>`
    }
}

const newUser = {
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
                <p>If the link above doesn't work please copy and paste this link into your browser and press enter.</p>
                <p>${verifyAccURL}</p>
                <a href="http://127.0.0.1:300/campgrounds">Start browsing our campgrounds now!</a>
            </main>
        </body>
        </html>`
    }
}

const forgotPassword = {
    subject: "🏕️ Forgot Password - YelpCamp 🏕️",
    text: function (verifyAccURL) {
        return `To reset Your password use the following link.
        ${verifyAccURL}
        If you didn't made this request please ignore this email.`
    },
    html: function (verifyAccURL) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Forgot Password</title>
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
                <h3>Forgot Password</h3>
                <a href="${verifyAccURL}">Please click on this link to reset your password.</a>
                <p>If the link above doesn't work please copy and paste this link into your browser and press enter.</p>
                <p>${verifyAccURL}</p>
                <h3>If you didn't made this request please igonre this email.</h3>
            </main>
        </body>
        </html>`
    }
}

const passwordChanged = {
    subject: "🏕️ You have successfully changed your password - YelpCamp 🏕️",
    text: function (a) {
        return `Your password has been successfully changed.`
    },
    html: function (a) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reseted</title>
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
                <h3>Your password has been successfully changed!</h3>
                <a href="http://127.0.0.1:300/campgrounds">Start browsing our campgrounds now!</a>
            </main>
        </body>
        </html>`
    }
}

module.exports = { newUser, emailVerified, forgotPassword, passwordChanged }