window.onload = function() {
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

		var httpRequest = new XMLHttpRequest();
		httpRequest.open(enquiryForm.method, enquiryForm.action, true);
		httpRequest.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");

		httpRequest.send(JSON.stringify(jsonData));

		httpRequest.onloadend = function() {
			if (httpRequest.status == 200)
				alert("Enquiry sent success!");
			else
				alert("Enquiry could not send.");
		};
	};
}
