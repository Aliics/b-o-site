window.onload = function() {
	const serverOrigin = window.location.origin;

	console.log(serverOrigin);

	const menuElement = document.getElementsByClassName("menu")[0];
	const httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", serverOrigin + "/requestservices/menu", true);

	httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
	httpRequest.setRequestHeader("Content-Type", "application/json");

	httpRequest.send();

	httpRequest.onloadend = function() {
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
					itemMoneyAttrib.innerHTML = " - $" + itemMoney + "</br>";
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
}
