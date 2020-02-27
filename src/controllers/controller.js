exports.renderHomePage = (req,res) => {
res.render('landing');
}

exports.renderAboutPage = (req,res) => {
    res.render('about');
}

exports.getWeather = (req,res) => {

   let payDetails = {
        payrollAmount: parseInt(req.body.payrollAmount),
        socialSecurityTax: req.body.socialSecurityTax,
        medicalTax: req.body.medicalTax,
        federalTax: req.body.federalTax,
        StateTax: req.body.StateTax,
        HealthInsurance: req.body.HealthInsurance,
        otherDeductions: req.body.otherDeductions,
        hoursWorked: parseInt(req.body.hoursWorked),
        hourlyRate: parseInt(req.body.hourlyRate),
    }

    let total= payDetails.hoursWorked * payDetails.hourlyRate;
    let bufferAmount = payDetails.payrollAmount-total;

    console.log(payDetails);

    res.render('landing',{

        payrollAmount: req.body.payrollAmount,
        socialSecurityTax: req.body.socialSecurityTax,
        medicalTax: req.body.medicalTax,
        federalTax: req.body.federalTax,
        StateTax: req.body.StateTax,
        HealthInsurance: req.body.HealthInsurance,
        otherDeductions: req.body.otherDeductions,
        hoursWorked: parseInt(req.body.hoursWorked),
        hourlyRate: parseInt(req.body.hourlyRate),
        total: total,
        bufferAmount : bufferAmount,
        cumulativeBuffer: bufferAmount

    });

}