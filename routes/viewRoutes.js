const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedI);

router.get('/', viewController.getOverview);

router.get('/tour/:slug', viewController.getTour);

//  login
router.get('/login', viewController.getLoginForm);

module.exports = router;
