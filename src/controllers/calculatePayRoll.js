
exports.calculatePayroll = (req, res) => {
    const request = req.body;
  
    let payDetails = {
      payrollAmount: parseFloat(request.payrollAmount),
      socialSecurityTax:
        request.socialSecurityTax == undefined ||
        request.socialSecurityTax.length === 0
          ? 0.0
          : request.socialSecurityTax,
  
      medicalTax:
        request.medicalTax == undefined || request.socialSecurityTax.length === 0
          ? 0.0
          : request.medicalTax,
  
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
      displayPayroll: true
    };
  
    res.render("landingv2", response);
  };