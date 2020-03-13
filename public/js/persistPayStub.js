
function persistPayStub(){

    let payStub = {

         month : document.getElementById("smonth").innerText,
         hoursWorked : document.getElementById("hoursWorked").value,
         hourlyRate : document.getElementById("hourlyRate").value,
         payrollAmount : document.getElementById("payrollAmount").value,
         federalTax : document.getElementById("federalTax").value,
         stateTax : document.getElementById("stateTax").value,
         healthInsurance : document.getElementById("healthInsurance").value,
         otherDeductions : document.getElementById("otherDeductions").value,
         socialSecurityTax : document.getElementById("socialSecurityTax").value,
         medicalTax: document.getElementById("medicalTax").value,
         total : document.getElementById("stotal").innerText,
         totalDeductions : document.getElementById("sdeductions").innerText,
         deposit : document.getElementById("sdeposit").innerText,
         bufferAmount : document.getElementById("sbufferAmount").innerText
    }

    $.ajax({
        type: "POST",
        url: '/history',
        // headers: {"uid": localStorage.getItem("payDayAppUid")},
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(payStub),
        dataType: "json",
        success: function (response) {
            
            alert("Save information successfully !!"); 
        
        },
        error: function(xhr, textStatus, error){
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log("Error in saving information !!");
        }
    });

}