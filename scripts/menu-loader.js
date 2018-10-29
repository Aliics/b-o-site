window.addEventListener("load", setupMenuSection, false);

function setupMenuSection() {
	const serverHost = window.location.hostname;
	const serverPath = "http://" + serverHost + ":8080";

	const menuSection = document.getElementById("menu");
	const menuElement = document.createElement("div");
	menuElement.className = "menu";
	menuSection.appendChild(menuElement);

	const httpRequest = new XMLHttpRequest();

	httpRequest.open("GET", serverPath + "/requestservices/site-info/menu", true);

	httpRequest.onload = function() {
		if (httpRequest.status == 200) {
			const menuJSON = JSON.parse(this.response);
			
			const menuGroups = Object.keys(menuJSON);

			menuGroups.forEach(function(key) {
				const groupDiv = document.createElement("div");
				const groupDivTitle = document.createElement("p");

				groupDiv.className = "menu-group";

				groupDivTitle.className = "menu-group-title";
				groupDivTitle.innerHTML = key;
				groupDiv.appendChild(groupDivTitle);

				for (let a = 0; a < menuJSON[key].length; a++) {
					const itemName = menuJSON[key][a]["name"];
					const itemMoney = menuJSON[key][a]["money"];
					const itemDescription = menuJSON[key][a]["description"];
					const itemNameParagraph = document.createElement("p");
					const itemMoneyAttrib = document.createElement("a");
					const itemDescriptionAttrib = document.createElement("a");

					itemNameParagraph.className = "item-name";
					itemNameParagraph.innerHTML = itemName;
					itemMoneyAttrib.className = "item-money";
					itemMoneyAttrib.innerHTML = itemMoney != "0" ? " - $" + itemMoney + "<br/>" : "<br/>";
					itemDescriptionAttrib.className = "item-description";
					itemDescriptionAttrib.innerHTML = itemDescription;

					itemNameParagraph.appendChild(itemMoneyAttrib);
					itemNameParagraph.appendChild(itemDescriptionAttrib);
					groupDiv.appendChild(itemNameParagraph);
				}

				menuElement.appendChild(groupDiv);
			});
		}
	}

	httpRequest.send();
}
