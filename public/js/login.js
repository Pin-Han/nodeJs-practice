/* eslint-disable */
// const axios = require('axios');
// import axios from 'axios';
const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email: email,
        password: password
      }
    });
    if (res.data.status === 'success') {
      alert('Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
    console.log(res);
  } catch (err) {
    console.log(err.response.data);
    alert(err.response.data.message);
  }
};
document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  login(email, password);
});
