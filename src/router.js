const express = require('express');

const router = express.Router();


const controller = require('./controllers/controller');

// Successful login -> homepage
router.get('/homePage', controller.renderHomePage);

// registration page
 router.get('/register', controller.renderRegistrationPage);

 router.post('/register-user', controller.registerUser);


// generate JWT token
router.get('/generateToken', controller.generateJwtToken)

//welcome login page
router.get('/', controller.renderLoginPage);

// pay calculation submit
router.post('/calculate', controller.getWeather);




module.exports = router;