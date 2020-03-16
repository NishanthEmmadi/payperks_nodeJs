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

  if (resultset != null) {
    resultset.payStubs.sort((a, b) => (a.monthId > b.monthId ? 1 : -1));
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

exports.renderPayEditPage = async (req, res) => {
  await PayHistory.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      const resultset = result[0].payStubs.filter(
        x => x.monthId === parseInt(req.params.monthId)
      );
    //  res.json(resultset != null ? resultset[0] : "");

      res.render("sorry! This feature will be available in next release");

    }
  });
};
