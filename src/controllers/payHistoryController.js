const PayHistory = require("../../model/PayHistory");
const moment = require("moment");

exports.persistPayHistory = async (req, res) => {
  const uid = req.signedCookies.uid;

  let stub_id = uid + req.body.month;

  const removedStub = await PayHistory.findByIdAndUpdate(
    { _id: uid },
    { $pull: { payStubs: { stub_id: stub_id } } },
    { safe: true, multi: true },
    function(err, obj) {
      if (err) {
        console.log(err);
        return res.status(400);
      } else {
        console.log("removed stub with uid" + stub_id);
      }
    }
  );

  if (removedStub) {
    console.log("found and removed the stub" + removedStub);
  }

  let cumulativeBuffer = 0.0;
  var promise = PayHistory.find({ _id: uid }).exec();

  promise.then(function(stubs) {
    if (stubs[0]) {
      console.log(stubs[0]);

      const stubLists = stubs[0].payStubs;

      stubLists.sort((a, b) => (a.monthId > b.monthId ? 1 : -1));

      cumulativeBuffer = calculatecummulativeBuffer(
        stubLists,
        req.body.month,
        (monthId, month) =>
          monthId <
          moment()
            .month(month)
            .format("M")
      );
    }

    console.log("total buffer amount" + cumulativeBuffer);

    const payStub = {
      payrollAmount: req.body.payrollAmount,
      hoursWorked: req.body.hoursWorked,
      hourlyRate: req.body.hourlyRate,
      total: req.body.total,
      bufferAmount: req.body.bufferAmount,
      cumulativeBuffer: (
        cumulativeBuffer + parseFloat(req.body.bufferAmount)
      ).toFixed(2),
      deposit: req.body.deposit,
      totalDeductions: req.body.totalDeductions,
      month: req.body.month,
      federalTax: req.body.federalTax,
      stateTax: req.body.stateTax,
      healthInsurance: req.body.healthInsurance,
      otherDeductions: req.body.otherDeductions,
      socialSecurityTax: req.body.socialSecurityTax,
      medicalTax: req.body.medicalTax,
      stub_id: stub_id,
      monthId: moment()
        .month(req.body.month)
        .format("M")
    };

    PayHistory.findOneAndUpdate(
      { _id: uid },
      { $push: { payStubs: payStub } },
      { new: true, upsert: true },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400);
        } else {
          console.log("Added stub with uid" + payStub.stub_id);
          if(stubs[0] && stubs[0].payStubs){
            stubs[0].payStubs.push(payStub);
            recalculateBufferAmmount(stubs,  moment().month(req.body.month).format("M"));
            }
        }
      });

  });

  return res.json({ response: "Success !!" });
};

function recalculateBufferAmmount(stubs, monId) {

  let filtteredStubs = stubs[0].payStubs.filter(x => x.monthId > monId)

  filtteredStubs.forEach(stub => {


       PayHistory.findOne({ _id: stubs[0]._id })
        .then(doc => {
          stubToUpdate = doc.payStubs.filter( x => x.stub_id === stub.stub_id)[0];
          stubToUpdate["cumulativeBuffer"] = (calculatecummulativeBuffer(
            stubs[0].payStubs,
            stub.month,
            (monthId, month) =>
              monthId <
              moment()
                .month(month)
                .format("M")
          ) + parseFloat(stub.bufferAmount)).toFixed(2);
          doc.save();
        })
        .catch(err => {
          console.log("Oh! Dark" + err);
        });
    
  });
}

function calculatecummulativeBuffer(stubLists, currentMonth, predicateFun) {
  let cumulativeBuffer = 0.0;

  stubLists.forEach(stub => {
    if (predicateFun(stub.monthId, currentMonth)) {
      cumulativeBuffer += parseFloat(stub.bufferAmount);

      console.log(
        " buffer amount for the month" +
          "" +
          stub.month +
          "is:" +
          cumulativeBuffer
      );
    }
  });

  return cumulativeBuffer;
}
