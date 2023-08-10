$(function () {
    $(document).scroll(function () {
      var $nav = $("#mainNavbar");
      $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
  })

  const login = document.querySelector('#login');
  const logout = document.querySelector('#logout');
  const card=document.querySelector('.card');
  const firstName=document.querySelector('#firstName');
  const lastName=document.querySelector('#lastName');
  const email=document.querySelector('#email');
  const password=document.querySelector('#password');
  const BankID=document.querySelector('#BankID');
  const Balance=document.querySelector('#Balance');
  const email2=document.querySelector('#email2');
  const telephone=document.querySelector('#phoneNumber');
  const service=document.querySelector('#service');
  const location2=document.querySelector('#location');
  const date=document.querySelector('#date');
  const notes=document.querySelector('#notes')

    login.classList.toggle('d-none');
    logout.classList.toggle('d-none');
    account.classList.toggle('d-none');
    infoArray=JSON.parse(localStorage.getItem('user'));
    const welcomeMsg = 'Greetings, '+infoArray[0]+'!';
    card.querySelector('.card-title').innerText=welcomeMsg;

    firstName.innerText=`${infoArray[0]}`;
    lastName.innerText=`${infoArray[1]}`;
    email.innerText=`${infoArray[2]}`;
    password.innerText=`${infoArray[3]}`;
    BankID.innerText=`${infoArray[4]}`;
    Balance.innerText=`${infoArray[5]}`;

if(JSON.parse(localStorage.getItem('userAppointment'))){
    appointmentArray=JSON.parse(localStorage.getItem('userAppointment'));
    email2.innerText=`${appointmentArray[0]}`;
    telephone.innerText=`${appointmentArray[1]}`;
    service.innerText=`${appointmentArray[2]}`;
    location2.innerText=`${appointmentArray[3]}`;
    date.innerText=`${appointmentArray[4]}`;
    notes.innerText=`${appointmentArray[5]}`;
}

logout.addEventListener('click', function (e) {
  localStorage.clear();
})