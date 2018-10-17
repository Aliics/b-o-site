window.addEventListener("load", setupEnquiryForm, false);

function setupEnquiryForm() {
	const enquiryFormName = "enquiry-form";
	const enquiryForm = document.getElementsByClassName(enquiryFormName)[0];

	enquiryForm.onsubmit = function(e) {
		e.preventDefault();

		let jsonData = {};
		for (let i = 0; i < enquiryForm.length; i++) {
			const input = enquiryForm[i];
			if (input.name)
				jsonData[input.name] = input.value;
		}

		enquiryForm.reset();

		const serverHost = window.location.hostname;
		const serverPath = "http://" + serverHost + ":8080";

		const httpRequest = new XMLHttpRequest();

		httpRequest.open(enquiryForm.method, serverPath + "/requestservices/enquiry", true);
		httpRequest.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

		const requestStatusMessage = document.getElementsByClassName("enquiry-status").length == 0 ? document.createElement("p") : 
										document.getElementsByClassName("enquiry-status")[0];
		requestStatusMessage.className = "enquiry-status";
		requestStatusMessage.innerHTML = "Sending enquiry...";
		requestStatusMessage.style.color = "#7d4f45";

		enquiryForm.appendChild(requestStatusMessage);

		httpRequest.onload = function() {
			const success = httpRequest.status == 200;
			requestStatusMessage.innerHTML = success ? "Enquiry sent successfully!" : "Enquiry could not be sent.";
			requestStatusMessage.style.color = success ? "#FFA500" : "red";
		};

		httpRequest.send(JSON.stringify(jsonData));
	};
}
