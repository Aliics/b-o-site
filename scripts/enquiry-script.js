window.addEventListener("load", setupEnquiryForm, false);

function setupEnquiryForm() {
	var enquiryFormName = "enquiry-form";
	var enquiryForm = document.getElementsByClassName(enquiryFormName)[0];

	enquiryForm.onsubmit = function(e) {
		e.preventDefault();

		var jsonData = {};
		for (var i = 0; i < enquiryForm.length; i++) {
			var input = enquiryForm[i];
			if (input.name)
				jsonData[input.name] = input.value;
		}

		enquiryForm.reset();
		
		var httpRequest = new XMLHttpRequest();
		httpRequest.open(enquiryForm.method, enquiryForm.action, true);
		httpRequest.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");

		httpRequest.onloadend = function() {
			if (httpRequest.status == 200)
				alert("Enquiry sent success!");
			else
				alert("Enquiry could not send.");
		};

		httpRequest.send(JSON.stringify(jsonData));
	};
}
