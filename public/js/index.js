/*eslint-disable */
// import '@babel/polyfill';
import { login, logout } from './login';

// DOM elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');
// Values

// Delegation
if (mapBox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );
  console.log('locations', locations);
}
if (loginForm) {
  console.log('have form');
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
if(logoutBtn){
  logoutBtn.addEventListener('click',logout)
}