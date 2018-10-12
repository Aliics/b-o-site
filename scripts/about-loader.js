window.addEventListener("load", setupAboutSection, false);

function setupAboutSection() {
	const serverOrigin = window.location.origin;

	const aboutElement = document.getElementById("about");
	const httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", serverOrigin + "/requestservices/site-info/about", true);

	httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
	httpRequest.setRequestHeader("Content-Type", "application/json");

	httpRequest.onloadend = function() {
		const requestStatusIsOk = httpRequest.status == 200;

		if (!requestStatusIsOk)
			return;

		const menuJSON = JSON.parse(this.response);
		const aboutParagraphs = menuJSON["aboutParagraphs"];

		for (const paragraph of aboutParagraphs) {
			const aboutParagraph = document.createElement("p");
			aboutParagraph.innerHTML = paragraph;
			aboutElement.appendChild(aboutParagraph);
		}
	}

	httpRequest.send();
}