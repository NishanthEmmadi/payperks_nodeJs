const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../../model/User");
const PayHistory = require("../../model/PayHistory");
var mongoose = require('mongoose');

 exports.generateJwtToken = async (req, res) => {

  const uname = req.query.username;
  const password = req.query.password;

  const user =  await User.findOne({ username:uname });

  if(!user)
  return res.status(400).send({
    result: "redirect",
    url: "/login",
    style: "login.css",
    loginError: "login error !!!!!"
  });

   const validPass =await bcrypt.compare(password, user.password);
       
   if(!validPass)
   return res.status(400).send({
     result: "redirect",
     url: "/login",
     style: "login.css",
     loginError: "login error !!!!!"
   });

  //generating jwt token 
  let token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: uname }, 'secret');

  //console.log('Generated '+ token);

  return res.status(200).send({
    result: "redirect",
    token: token,
    url: "/homePage"
  });

}

exports.renderDashBoard = (req, res) => {
 // console.log("home page called");

  res.render("dashboard");
};



exports.renderHomePagev2 = (req, res) => {

  res.render("landingv2", {
    style: "landingStyles.css"
  });
};

exports.persistPayHistory = async (req,res) => {

       let uid = 'sdhjfsjdf745683247';

      const payStub = {
            payrollAmount: req.body.payrollAmount,
            hoursWorked: req.body.hoursWorked,
            hourlyRate: req.body.hourlyRate,
            total: req.body.total,
            bufferAmount: req.body.bufferAmount,
            //cumulativeBuffer: req.body.bufferAmount,
            deposit: req.body.deposit,
            totalDeductions: req.body.totalDeductions,
            month: req.body.month,
            federalTax: req.body.federalTax,
            stateTax: req.body.stateTax,
            healthInsurance: req.body.healthInsurance,
            otherDeductions: req.body.otherDeductions,
            socialSecurityTax : req.body.socialSecurityTax,
            medicalTax: req.body.medicalTax,
            stub_id : uid + req.body.month
        }

    console.log(payStub);


       PayHistory.updateOne({ _id: uid }, { "$pull": { "payStubs": { "stub_id": "sdhjfsjdf745683247January" } }}, { safe: true, multi:true }, function(err, obj) {

      if(err){
        console.log(err);
        return res.status(400);
      } else {
      
        console.log('removed stub with uid' + payStub.stub_id);
        
      }
     });


       PayHistory.findOneAndUpdate(
      { _id: uid },
      { $push: { payStubs: payStub } },{new: true, upsert : true}, (err, result) => {

        if(err){
          console.log(err);
          return res.status(400);
        }else {
      
          console.log('Added stub with uid' + payStub.stub_id);
          
        }
       })

    return res.json({'response' : "Success !!"});

};


exports.renderHistoryPage = async (req, res) => {

  const resultset = await PayHistory.findOne({_id : 'sdhjfsjdf745683247'});

  console.log(resultset.payStubs);

  res.render("history", {
    style: "history.css",
    payHistory : resultset.payStubs
  });

  
};

exports.renderRegistrationPage = (req, res) => {
  res.render("registration", {
    style: "registration.css"
  });
};

exports.registerUser = async (req, res) => {

  let isEmailExist = await User.findOne({ username: req.body.username });

  if (isEmailExist) 
  return res.status(200).render("registration", {
    style: "registration.css",
    registrationError: 'User already exists! Please try again'
  });

  const UserProvidedpassword =req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(UserProvidedpassword, salt);

  //console.log('Generated Hash'+ hashPassword)

      const user = new User({
        username: req.body.username,
        password: hashPassword
      });
  
      try {
         await user.save();

       return res.status(200).render("login", {
          style: "login.css",
          loginError: "Registration Successful !!"
        });

      } catch (err) {
  
          console.log('error while saving:' + err)
  
        return res.status(200).render("registration", {
          style: "registration.css",
          registrationError: 'Error!! please try again'
        });
  
      }
};

exports.renderLoginPage = (req, res) => {
  res.render("login", {
    style: "login.css"
  });
};

exports.getWeather = (req, res) => {

  const request = req.body;

  let payDetails = {
    payrollAmount: parseFloat(request.payrollAmount),
    socialSecurityTax:
      request.socialSecurityTax == undefined || 
      request.socialSecurityTax.length ===0 ? 0.0 : request.socialSecurityTax,

    medicalTax: request.medicalTax == undefined || 
      request.socialSecurityTax.length === 0 ? 0.0 : request.medicalTax,

    federalTax: request.federalTax === "" ? 0.0 : request.federalTax,
    StateTax: request.stateTax === "" ? 0.0 : request.stateTax,
    HealthInsurance:
      request.healthInsurance === "" ? 0.0 : request.healthInsurance,
    otherDeductions:
      request.otherDeductions === "" ? 0.0 : request.otherDeductions,
    hoursWorked: parseFloat(request.hoursWorked),
    hourlyRate: parseFloat(request.hourlyRate),
    month: request.month
  };

  //console.log(payDetails);

  let total = payDetails.hoursWorked * payDetails.hourlyRate;
  let bufferAmount = total - payDetails.payrollAmount;

  let deductions =
    parseFloat(payDetails.socialSecurityTax) +
    parseFloat(payDetails.medicalTax) +
    parseFloat(payDetails.StateTax) +
    parseFloat(payDetails.federalTax) +
    parseFloat(payDetails.HealthInsurance) +
    parseFloat(payDetails.otherDeductions);

  let deposit = payDetails.payrollAmount - deductions;

  let response = {
    payrollAmount: payDetails.payrollAmount,
    socialSecurityTax: payDetails.socialSecurityTax,
    medicalTax: payDetails.medicalTax,
    federalTax: payDetails.federalTax,
    StateTax: payDetails.StateTax,
    HealthInsurance: payDetails.HealthInsurance,
    otherDeductions: payDetails.otherDeductions,
    hoursWorked: payDetails.hoursWorked,
    hourlyRate: payDetails.hourlyRate,
    total: total,
    bufferAmount: bufferAmount.toFixed(2),
    cumulativeBuffer: bufferAmount.toFixed(2),
    deposit: deposit,
    deductions: deductions.toFixed(2),
    month: payDetails.month,
    displayPayroll : true
  };

  res.render("landingv2", response);
};
