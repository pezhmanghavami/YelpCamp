const passwordRe = document.querySelector("form #password-re");
const password = document.querySelector('form #password');
const button = document.querySelector("form button");
let passIsOkay = false;
let passReIsOkay = false;

button.disabled = true;

const validatePassword = () => {
    const newPassword = password.value;
    const minNumberofChars = 8;
    // const maxNumberofChars = 16;
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;
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
    if (passIsOkay && passReIsOkay) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

document.querySelector("#btn-div").addEventListener('mouseenter', controlButton);

password.addEventListener('keyup', validatePassword);
// password.addEventListener('keyup', checkPass);
passwordRe.addEventListener('keyup', checkPass);
