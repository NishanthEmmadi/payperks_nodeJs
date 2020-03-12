const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    _id :  String,

    payStubs : [
        {
        stub_id : String,
        payrollAmount: Number,
        socialSecurityTax: Number,
        medicalTax: Number,
        federalTax: Number,
        StateTax: Number,
        HealthInsurance: Number,
        otherDeductions: Number,
        hoursWorked: Number,
        hourlyRate: Number,
        total: Number,
        bufferAmount: Number,
        cumulativeBuffer: Number,
        deposit: Number,
        deductions: Number,
        month: String
      }
    ]
});


module.exports = mongoose.model('PayHistory',userSchema);

