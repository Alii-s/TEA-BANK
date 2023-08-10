function ValidateKey(e) {
    var keyCode = e.keyCode || e.which;
    var regex = /^[0-9]$/;
    return regex.test(String.fromCharCode(keyCode));
}
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const currDate = new Date();
const form = document.querySelector('form.support');
const email = document.querySelector('#email');
const telephone = document.querySelector('#telephone');
const serviceSelect = document.querySelector('#serviceSelect');
const locationSelect = document.querySelector('#locationSelect');
const date = document.querySelector('#date')
const logout = document.querySelector('#logout');
const login = document.querySelector('#login');
const notes = document.querySelector('#notes');
const card=document.querySelector('.card');
const cardHidden=document.querySelector('.card.hidden');
let successFlagE = false;
let successFlagTel = false;
let successFlagSS = false;
let successFlagLS = false;
let successFlagD = false;
date.setAttribute("min", currDate);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    validateInputs();
})


const setError = (element, message) => {
    let inputControl;
    if (element === telephone) {
        inputControl = element.parentElement.parentElement;
    } else {
        inputControl = element.parentElement;
    }
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = (element) => {
    if (element === telephone) {
        inputControl = element.parentElement.parentElement;
    } else {
        inputControl = element.parentElement;
    }
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}


const validateInputs = () => {
    successFlagE = false;
    successFlagTel = false;
    successFlagSS = false;
    successFlagLS = false;
    successFlagD = false;
    const emailValue = email.value.trim();
    const telephoneValue = telephone.value.trim();
    const serviceSelectValue = serviceSelect.value;
    const locationSelectValue = locationSelect.value;
    const notesValue = notes.value;
    if (emailValue === '') {
        setError(email, 'Email is required.');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Please enter a valid email.');
    } else {
        setSuccess(email);
        successFlagE = true;
    }
    if (telephoneValue === '') {
        setError(telephone, 'Telephone is required.');
    } else if (telephoneValue.length !== 10) {
        setError(telephone, 'Please input 10 digits.')
    } else {
        setSuccess(telephone);
        successFlagTel = true;
    }
    if (serviceSelectValue === 'default') {
        setError(serviceSelect, 'Please select a service');
    } else {
        setSuccess(serviceSelect)
        successFlagSS = true;
    }
    if (locationSelectValue === 'default') {
        setError(locationSelect, 'Please select a location');
    } else {
        setSuccess(locationSelect)
        successFlagLS = true;
    }
    // (currDate.getFullYear()<parseInt(date.value.slice(0,4))||currDate.getMonth()<parseInt(date.value.slice(5,7))||currDate.getDate()>=parseInt(date.value.slice(8,10)))
    setError(date, 'Please Select a future date.');
    if (date.value == '') {
        setError(date, 'Date is required.');
    } else if (currDate.getFullYear() > parseInt(date.value.slice(0, 4))) {
        setError(date, 'Please Select a future date.');
    } else if (currDate.getMonth()>parseInt(date.value.slice(5,7))) {
        setError(date, 'Please Select a future date.');
    }else if(currDate.getDate()>=parseInt(date.value.slice(8,10))){
        setError(date, 'Please Select a future date.');
    }
    else {
        setSuccess(date);
        successFlagD = true;
    }
    if (successFlagLS && successFlagE && successFlagTel && successFlagSS && successFlagD) {
        const userArray = [emailValue, telephoneValue, serviceSelectValue, locationSelectValue, date.value, notesValue];
        localStorage.setItem('userAppointment', JSON.stringify(userArray));
        card.classList.toggle('d-none');
        cardHidden.classList.toggle('d-none')
    }
}


if (localStorage.getItem('isLoggedIn') === 'true') {
    login.classList.toggle('d-none');
    logout.classList.toggle('d-none');
    account.classList.toggle('d-none');
}
logout.addEventListener('click', function (e) {
    localStorage.clear();
})
