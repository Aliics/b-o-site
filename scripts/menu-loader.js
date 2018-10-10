window.onload = function() {
	let menuElement = document.getElementsByClassName("menu")[0];
	let httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", "http://localhost:8080/requestservices/menu", true);

	httpRequest.setRequestHeader("Content-Type", "application/json");

	httpRequest.send();

	httpRequest.onloadend = function() {
		if (httpRequest.status == 200) {
			let menuJSON = JSON.parse(this.response);
			
			let menuGroups = Object.keys(menuJSON);

			menuGroups.forEach(function(key) {
				let groupDiv = document.createElement("div");
				let groupDivTitle = document.createElement("p");

				groupDivTitle.innerHTML = key;
				groupDiv.appendChild(groupDivTitle);

				for (let a = 0; a < menuJSON[key].length; a++) {
					let itemName = menuJSON[key][a]["name"];
					let itemDescription = menuJSON[key][a]["description"];
					let itemNameParagraph = document.createElement("p");
					let itemDescriptionAttrib = document.createElement("a");

					itemNameParagraph.innerHTML = itemName;
					itemDescriptionAttrib.innerHTML = itemDescription;

					itemNameParagraph.appendChild(itemDescriptionAttrib);
					groupDiv.appendChild(itemNameParagraph);
				}

				menuElement.appendChild(groupDiv);
			});
		}
	}
}
