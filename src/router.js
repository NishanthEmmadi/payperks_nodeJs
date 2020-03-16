const express = require('express');
const  auth = require('./service/auth');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const PayHistory = require("../model/PayHistory");

const router = express.Router();


const controller = require('./controllers/controller');
const authTokenController = require('./controllers/authTokenController');
const payHistoryController = require('./controllers/payHistoryController');
const userRegistrationController = require('./controllers/userRegistrationController');
const calculatePayRoll = require('./controllers/calculatePayRoll');

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
router.get('/history',auth, controller.renderHistoryPage);

router.post('/history',auth,payHistoryController.persistPayHistory);


// registration page
 router.get('/register', controller.renderRegistrationPage);
 router.post('/register-user', userRegistrationController.registerUser);


// generate JWT token
router.get('/generateToken', authTokenController.generateJwtToken)

//welcome login page
router.get('/', controller.renderLoginPage);

//edit payStub
router.get('/payedit/:monthId', controller.renderPayEditPage)

// pay calculation submit
router.post('/calculate',auth, calculatePayRoll.calculatePayroll);


router.get('/cumm',async (req,res) => {

  console.log(moment().month("Jan").format("M") + "---<>>>");

  let cumulativeBuffer = 0.0;

    await PayHistory.find({_id : '5e66a8277c30850b73a48f9a'}, function(err, stubs){
        
        
        stubs[0].payStubs.forEach((stub) => {
            cumulativeBuffer += parseFloat(stub.bufferAmount);
        });
    
    });

    return res.json(cumulativeBuffer);

});




module.exports = router;


