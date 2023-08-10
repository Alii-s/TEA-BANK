$(function () {
    $(document).scroll(function () {
        var $nav = $("#mainNavbar");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
})


const form = document.querySelector('form.register');
const firstName = document.querySelector('#firstName')
const secondName = document.querySelector('#secondName')
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConf = document.querySelector('#passwordConf');
const register = document.querySelector('#register');
const card = document.querySelector('.card')
const showPassword = document.querySelector('#showPassword')
const showPasswordConf = document.querySelector('#showPasswordConf')
const faEye = document.querySelector('.fa-eye');
const faEyeConf = document.querySelector('.fa-eye.conf');
const support=document.querySelector('#support')
let successFlagP = false;
let successFlagE = false;
let successFlagPC = false
let successFlagFN = false
let successFlagSN = false
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    validateInputs();
})

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const validateInputs = () => {
    successFlagP = false;
    successFlagE = false;
    successFlagPC = false;
    successFlagFN = false;
    successFlagSN = false;
    const firstNameValue = firstName.value.trim();
    const secondNameValue = secondName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordConfValue = passwordConf.value.trim();
    if (firstNameValue === '') {
        setError(firstName, 'First name is required.')
    } else {
        setSuccess(firstName);
        successFlagFN=true;
    }
    if (secondNameValue === '') {
        setError(secondName, 'Second name is required.')
    } else {
        setSuccess(secondName);
        successFlagSN=true;
    }
    if (emailValue === '') {
        setError(email, 'Email is required.');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Please enter a valid email.');
    } else {
        setSuccess(email);
        successFlagE = true;
    }
    if (passwordValue === '') {
        setError(password, 'Password is required.');
        faEye.style.bottom = '46%'
    } else if (passwordValue.length < 8 || passwordValue.length > 20) {
        setError(password, 'Password must be between 8 & 20 characters.');
        faEye.style.bottom = '46%'
    } else {
        setSuccess(password);
        successFlagP=true;
    }
    if (passwordConfValue !== passwordValue || passwordConfValue === '') {
        setError(passwordConf, 'Please confirm your password.')
        faEyeConf.style.bottom = '46%'
    }else{
        setSuccess(passwordConf);
        successFlagPC=true;
    }
    if (successFlagP && successFlagPC && successFlagE && successFlagFN &&successFlagSN) {
        const userArray=[firstNameValue,secondNameValue,emailValue,passwordValue, Math.floor(Math.random() * 899999 + 100000), 0, 'none'];
        localStorage.setItem('user', JSON.stringify(userArray));
        localStorage.setItem('isLoggedIn','true');
        window.location.href = "../TEA-BANK.HTML"
    }

}
// form end


showPassword.addEventListener('click', function (e) {
    this.classList.toggle("fa-eye");
    this.classList.toggle('fa-eye-slash');
    if (password.getAttribute('type') === 'password') {
        password.setAttribute('type', 'text');
    }
    else {
        password.setAttribute('type', 'password');
    }
})
showPasswordConf.addEventListener('click', function (e) {
    this.classList.toggle("fa-eye");
    this.classList.toggle('fa-eye-slash');
    if (passwordConf.getAttribute('type') === 'password') {
        passwordConf.setAttribute('type', 'text');
    }
    else {
        passwordConf.setAttribute('type', 'password');
    }
})

if (!(localStorage.getItem('isLoggedIn') === 'true')) {  
    support.classList.toggle('d-none');
  }



