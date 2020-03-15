const PayHistory = require("../../model/PayHistory");

exports.renderDashBoard = (req, res) => {
  res.render("dashboard");
};

exports.renderHomePagev2 = (req, res) => {
  res.render("landingv2", {
    style: "landingStyles.css"
  });
};

exports.renderHistoryPage = async (req, res) => {
  const resultset = await PayHistory.findOne({ _id: req.signedCookies.uid });

  if(resultset != null){

    resultset.payStubs.sort((a, b) => (a.monthId > b.monthId) ? 1 : -1)

  }

  res.render("history", {
    style: "history.css",
    payHistory: resultset != null ? resultset.payStubs : ""
  });
};

exports.renderRegistrationPage = (req, res) => {
  res.render("registration", {
    style: "registration.css"
  });
};

exports.renderLoginPage = (req, res) => {
  res.render("login", {
    style: "login.css"
  });
};
