//Script for generating the paycheck


//add and remove spouse fields
var counter = 1;
$("#addspouseButton").click(function() {
    if (counter == 1) {

        var html = '';
        html += '<div id="inputFormRow1">';
        html += '<div class="input-group mb-3">';
        html += '<input type="text" id="spouseinput" name="spouseinput" class="form-control m-input" style="width: 300px; height:40px;" placeholder="Enter the full name" autocomplete="off" maxlength="50">';
        html += '<div class="input-group-append">';
        html += '<button id="removespouseRow" type="button" class="btn btn-danger">Remove</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        $('#q2').append(html);
    }
    counter--;
});

$(document).on('click', '#removespouseRow', function() {
    $(this).closest('#inputFormRow1').remove();
    counter = 1;
});

//add and remove child fields
$("#addchildButton").click(function() {
    var html = '';
    html += '<div class="childinputs">';
    html += '<div id="inputFormRow2">';
    html += '<div class="input-group mb-2">';
    html += '<input type="text" id="childinputs" name="childinputs" class="form-control m-input-1" style="width: 300px; height:40px;" placeholder="Enter the full name" autocomplete="off" maxlength="50">';
    html += '<div class="input-group-append-1">';
    html += '<button id="removechildRow" type="button" class="btn btn-remove">Remove</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    $('#q3').append(html);
});

$(document).on('click', '#removechildRow', function() {
    $(this).closest('#inputFormRow2').remove();
});


//filter dropdown 2 values based of dropdown 1
function showDiv() {
	var dropdownM = document.getElementById("monthD");
	var dropdownD = document.getElementById("termD");
    var current_value = dropdownM.options[dropdownM.selectedIndex].value;
	console.log(current_value);

    if (current_value == "jan" || current_value == "dec" ) {
		document.getElementById("third").style.display = "block";
    }
	else{
		document.getElementById("third").style.display = "none";
	}
	

	
}

//to calculate the total for a paycheck
function calculateTotal() {
    var employeeDeduction = 40,
        spouseDeduction = 20,
        childDeduction = 20, discount=0.1,
        spousename, childnames;
		
    var total = 2000;
    var employeename = document.getElementById('employeeinput').value;
	
    if (document.getElementById('spouseinput') !== null) {
        spousename = document.getElementById('spouseinput').value;
    }
	
    if (document.getElementsByClassName('childinputs') !== null) {
        childnames = document.getElementsByClassName('childinputs');
    }
	
	a = [];
	toArray(childnames);
	function toArray(childnames) {
		for(var i = 0; i < childnames.length; i++)
			a.push(childnames[i]);

    }
	
	
	
	//calculating the total for the employee
    if (employeename[0] == "A" || employeename[0] == "a") {
        total = total - employeeDeduction + (employeeDeduction * discount);
    } else {
        total = total - employeeDeduction;
    }
	
	//calculating the total for the spouse
    if (spousename) {
        if (spousename[0] == "A" || spousename[0] == "a") {
            total = total - spouseDeduction + (spouseDeduction * discount);
			spouseDeduction -=  (spouseDeduction * discount);
        } else {
            total = total - spouseDeduction;
        }
    }

	//calculating the total for the child/children
    var i, totalchildDeduction=0;
    if (a) {
        for (i = 0; i < a.length; i++) {
			if (a[i] && a[i] !== "" && a[i] !== null) {
				if (a[0].toString() =="A" || a[0].toString() == "a") {
					console.log("Inside childname A");
					total = total - childDeduction +(childDeduction * discount);
					totalchildDeduction += childDeduction - (childDeduction * discount);
				} else {
					total = total - childDeduction;
					totalchildDeduction += childDeduction;
				}
            }

        }
    }
	
	var monthValue = document.getElementById("monthD").value;
	var termValue = document.getElementById("termD").value;

	// exception for DEC III paycheck
	if (monthValue == "dec" && termValue == "third"){
		total = 2000;
	}
	
    sendToServer(total,termValue,monthValue);
	
	if (!spousename){
		spouseDeduction=0;
	}
	if (!a[0]){
		totalchildDeduction =0;
	}
	
    viewPaycheck(employeeDeduction, spouseDeduction, totalchildDeduction);
	
	$(document).ready(function () {
		resetForms();
});
}

function sendToServer(total,termValue,monthValue) {
	//alert("Your paycheck: $" + total + " will be credited to your account after deducting cost of benefits.");
	alert("Your " + termValue+ " paycheck for " +monthValue +'\n' +"Total : $"+total);
}

function viewPaycheck(employeeDeduction, spouseDeduction, totalchildDeduction) {
	alert("Deduction details (cost of benefits)" + '\n' +"Employee: $"+ employeeDeduction+ '\n' + "Spouse: $" +spouseDeduction +'\n' +"Child/Children : $"+totalchildDeduction);
}

function resetForms() {
    document.forms['mypay_dashboard'].reset();
}