/* eslint-disable */
// const axios = require('axios');
import axios from 'axios';
import { showAlert } from './alert';
export const login = async (email, password) => {
  console.log('login', email, password);
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
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
    console.log(res);
  } catch (err) {
    console.log(err.response.data);
    showAlert('error', err.response.data.message);
  }
};
export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    if (res.data.status === 'success') {
      location.reload();
    }
  } catch (error) {
    showAlert('error', 'Error logging out. Try again!');
  }
};
