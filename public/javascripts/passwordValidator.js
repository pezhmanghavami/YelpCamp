const passwordRe = document.querySelector("form #password-re");
const password = document.querySelector('form #password');
const username = document.querySelector('form #username');//for username and email i want an active search query
const email = document.querySelector('form #email');//to my db to see if the same email or username is already present
const button = document.querySelector("form button");
let passIsOkay = false;
let passReIsOkay = false;

button.disabled = true;

const validatePassword = () => {
    const newPassword = password.value;
    const minNumberofChars = 8;
    // const maxNumberofChars = 16;
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (newPassword.length >= minNumberofChars && regularExpression.test(newPassword)) {
        password.classList.remove("is-invalid");
        password.classList.add("is-valid");
        passIsOkay = true;
        checkPass();
    } else {
        password.classList.remove("is-valid");
        password.classList.add("is-invalid");
        passIsOkay = false;
        controlButton();
    }
}


const checkPass = () => {
    if (passwordRe.value === password.value && passwordRe.value !== '') {
        passwordRe.classList.remove("is-invalid");
        passwordRe.classList.add("is-valid");
        passReIsOkay = true;
        controlButton();
    } else {
        passwordRe.classList.remove("is-valid");
        passwordRe.classList.add("is-invalid");
        passReIsOkay = false;
        controlButton();
    }
}

const controlButton = () => {
    if (username.value !== '' && email.value !== '' && passIsOkay && passReIsOkay) {
        button.classList.remove("is-valid");
        button.disabled = false;
    } else {
        button.classList.add("is-valid");
        button.disabled = true;
    }
}

document.querySelector("#btn-div").addEventListener('mouseenter', controlButton);

username.addEventListener('keyup', controlButton);
email.addEventListener('keyup', controlButton);

password.addEventListener('keyup', validatePassword);
// password.addEventListener('keyup', checkPass);
passwordRe.addEventListener('keyup', checkPass);
