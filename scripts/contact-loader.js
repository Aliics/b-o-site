window.addEventListener("load", setupContactSection);

function setupContactSection() {
	const contactPageSection = document.getElementById("contact");
	const contactContentHolder = document.createElement("div");
	const enquiryForm = document.getElementsByClassName("enquiry-form")[0];
	const contactSection = document.createElement("div");

	contactContentHolder.className = "contact-content";
	contactSection.className = "contact";

	contactPageSection.appendChild(contactContentHolder);
	contactContentHolder.appendChild(enquiryForm);
	contactContentHolder.appendChild(contactSection);

	const serverHost = window.location.hostname;
	const serverPath = "http://" + serverHost + ":8080";

	const httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", serverPath + "/requestservices/site-info/contact", true);

	httpRequest.onload = function() {
		if (httpRequest.status == 200) {
			const contactJSON = JSON.parse(this.response);

			const contactSectionTitle = document.createElement("p");
			contactSectionTitle.className = "contact-title";
			contactSectionTitle.innerHTML = "CONTACT INFORMATION";

			contactSection.appendChild(contactSectionTitle);

			// setContactInformationFromJSON(contactSection, "ADDRESS", contactJSON["address"]);
			setContactInformationFromJSON(contactSection, "PHONE", contactJSON["phoneNumber"]);
			setContactInformationFromJSON(contactSection, "EMAIL", contactJSON["emailAddress"]);
			setContactInformationFromJSON(contactSection, "HOURS", contactJSON["prefContactHours"]);
		}
	}

	httpRequest.send();
}

function setContactInformationFromJSON(parent, title, content) {
	const paragraph = document.createElement("p");
	const span = document.createElement("span");

	paragraph.className = "info-title";
	span.className = "info";

	paragraph.innerHTML = title + "<br />";
	span.innerHTML = content;

	paragraph.appendChild(span);
	parent.appendChild(paragraph);
}