const navBtn = document.querySelector('.header__nav-btn');
const navIcon = document.querySelector('.nav-icon');
const row = document.querySelector('.header__row');

navBtn.addEventListener('click', function() {
    navIcon.classList.toggle('nav-icon--active');
    row.classList.toggle('header__row--mobile');
    document.body.classList.toggle("no-scroll");
});