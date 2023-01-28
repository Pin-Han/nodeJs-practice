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
    console.log(res);
  } catch (err) {
    console.log(err.response.data);
  }
};
document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  login(email, password);
});