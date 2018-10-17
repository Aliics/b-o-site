window.addEventListener("load", setupAboutSection, false);

function setupAboutSection() {
	const serverHost = window.location.hostname;
	const serverPath = "http://" + serverHost + ":8080";

	const aboutElement = document.getElementById("about");
	const httpRequest = new XMLHttpRequest();
	
	httpRequest.open("GET", serverPath + "/requestservices/site-info/about", true);

	httpRequest.onload = function() {
		const requestStatusIsOk = httpRequest.status == 200;

		if (!requestStatusIsOk)
			return;

		const aboutJSON = JSON.parse(this.response);
		const aboutParagraphs = aboutJSON["aboutParagraphs"];

		for (const paragraph of aboutParagraphs) {
			const aboutParagraph = document.createElement("p");
			aboutParagraph.innerHTML = paragraph;
			aboutElement.appendChild(aboutParagraph);
		}
	}

	httpRequest.send();
}