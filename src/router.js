const express = require('express');
const  auth = require('./auth');

const router = express.Router();


const controller = require('./controllers/controller');

//test cookie
router.get('/get', (req, res) => {
    // MAIN CODE HERE :
      const signedCookies = req.signedCookies; // get signed cookies
      console.log('signed-cookies:', signedCookies);  
     
    res.send('get cookie');
  });


//display dashBoard
//router.get('/dashboard', controller.renderDashBoard);

// Successful login -> homepage
router.get('/homePage',auth, controller.renderHomePagev2);

//display payroll history
router.get('/history', controller.renderHistoryPage);

router.post('/history',controller.persistPayHistory);


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