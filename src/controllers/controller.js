exports.renderHomePage = (req,res) => {
res.render('landing');
}

exports.renderAboutPage = (req,res) => {
    res.render('about');
}

exports.getWeather = (req,res) => {

    const request = req.body;

   let payDetails = {
        payrollAmount: parseFloat(request.payrollAmount),
        socialSecurityTax: request.socialSecurityTax === '' ? 0.0 : request.socialSecurityTax,
        medicalTax: request.medicalTax === '' ? 0.0 : request.medicalTax,
        federalTax: request.federalTax === '' ? 0.0 : request.federalTax,
        StateTax: request.StateTax === '' ? 0.0 : request.StateTax,
        HealthInsurance: request.HealthInsurance === '' ? 0.0 : request.HealthInsurance,
        otherDeductions: request.otherDeductions === '' ? 0.0 : request.otherDeductions,
        hoursWorked: parseFloat(request.hoursWorked),
        hourlyRate: parseFloat(request.hourlyRate),
    }

    let total= payDetails.hoursWorked * payDetails.hourlyRate;
    let bufferAmount = total-payDetails.payrollAmount;
    
    console.log(parseFloat(payDetails.federalTax) + 'fed');
    
    let deductions = (parseFloat(payDetails.socialSecurityTax) +
    parseFloat(payDetails.medicalTax) +
    parseFloat(payDetails.StateTax) +
    parseFloat(payDetails.federalTax) +
    parseFloat(payDetails.HealthInsurance) +
    parseFloat(payDetails.otherDeductions ));

    let deposit = payDetails.payrollAmount - deductions;

    console.log(deposit+'--->');

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
        bufferAmount : bufferAmount.toFixed(2),
        cumulativeBuffer: bufferAmount.toFixed(2),
        deposit: deposit,
        deductions : deductions.toFixed(2)

    }

    res.render('landing',response);

}