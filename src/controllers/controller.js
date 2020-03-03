const User = require("../../model/User");

exports.generateJwtToken = (req, res) => {
  console.log("received");

  return res.status(200).send({
    result: "redirect",
    token: "DFHSFDKSJFKSHFD434",
    url: "/homePage"
  });
};

exports.renderHomePage = (req, res) => {
  console.log("home page called");

  res.render("landing", {
    style: "style.css"
  });
};

exports.renderRegistrationPage = (req, res) => {
  res.render("registration", {
    style: "registration.css"
  });
};

exports.registerUser = async (req, res) => {

  let userResult = await User.findOne({ username: req.body.username }, function(
    err,
    obj
  ) {});

  if (userResult == null) {

    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    try {
      await user.save();
    } catch (err) {

        console.log('error while saving:' + err)

      res.status(200).render("registration", {
        style: "registration.css",
        registrationError: 'Error!! please try again'
      });

      return;

    }

    res.status(200).render("login", {
        style: "login.css",
        loginError: "Registration Successful !!"
      });

  }else {

    res.status(200).render("registration", {
        style: "registration.css",
        registrationError: 'User already exists! Please try again'
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
      request.socialSecurityTax === "" ? 0.0 : request.socialSecurityTax,
    medicalTax: request.medicalTax === "" ? 0.0 : request.medicalTax,
    federalTax: request.federalTax === "" ? 0.0 : request.federalTax,
    StateTax: request.StateTax === "" ? 0.0 : request.StateTax,
    HealthInsurance:
      request.HealthInsurance === "" ? 0.0 : request.HealthInsurance,
    otherDeductions:
      request.otherDeductions === "" ? 0.0 : request.otherDeductions,
    hoursWorked: parseFloat(request.hoursWorked),
    hourlyRate: parseFloat(request.hourlyRate)
  };

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
    deductions: deductions.toFixed(2)
  };

  res.render("landing", response);
};
