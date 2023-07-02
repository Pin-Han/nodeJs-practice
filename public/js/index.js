/*eslint-disable */
// import '@babel/polyfill';
import { login, logout } from './login';
import { updateData } from './updateSettings';
// DOM elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataFrom = document.querySelector('.form-user-data');

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
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (userDataFrom) {
  userDataFrom.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    updateData(name, email);
  });
}
