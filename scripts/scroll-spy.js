let oldSection;
let currentSection;

const activeClassName = "active-navigation-button";

window.addEventListener("load", setSectionOnload, false);
document.addEventListener("scroll", checkScreenPosition);
document.addEventListener("resize", checkScreenPosition);
document.addEventListener("touchmove", checkScreenPosition);

function setSectionOnload() {
	const anchor = window.location.hash;
	const navigationButtonId = anchor.substring(1, anchor.length) + "-navigation";
	const navigationButton = document.getElementById(navigationButtonId);

	navigationButton.classList.add(activeClassName);
}

function checkScreenPosition() {
	oldSection = currentSection;

	const sectionsContainer = document.getElementsByClassName("page-sections")[0];
	const sections = sectionsContainer.getElementsByClassName("page-section");
	
	const jumbotronElement = document.getElementsByClassName("jumbotron")[0];
	const navigationBarElement = document.getElementsByClassName("main-navigation")[0];

	const navigationBarSize = navigationBarElement.offsetHeight; 
	const shouldAddMargin = !elementInViewport(jumbotronElement);

	sectionsContainer.style.marginTop = shouldAddMargin ? navigationBarSize + "px" : "0px";

	navigationBarElement.style.position = elementInViewport(jumbotronElement) ? "relative" : "fixed";

	for (let s = 0; s < sections.length; s++) {
		const section = sections[s];

		if (elementInViewport(section)) {
			anyWereSelected = true;
			currentSection = section;
		}
	}

	if (currentSection == undefined || oldSection == undefined)
		return;

	if (elementInViewport(oldSection) && 
		oldSection.getBoundingClientRect().top > currentSection.getBoundingClientRect().top)
		return;

	const oldSectionIdFormatted = oldSection.id + "-navigation";
	const oldNavigationEquivalent = document.getElementById(oldSectionIdFormatted);

	oldNavigationEquivalent.classList.remove(activeClassName);

	const sectionIdHash = "#" + currentSection.id;
	const sectionIdFormatted = currentSection.id + "-navigation";
	const navigationEquivalent = document.getElementById(sectionIdFormatted);
	
	navigationEquivalent.classList.add(activeClassName);

	if (oldSection !== currentSection)
		history.pushState(null, null, sectionIdHash);
}

function elementInViewport(element) {
	const elementRect = element.getBoundingClientRect();

	const bottomWithinViewport = elementRect.bottom >= 0 &&
				   elementRect.bottom <= window.innerHeight;
	const topWithinViewport = elementRect.top <= window.innerHeight && 
				elementRect.top >= 0;

	return topWithinViewport || bottomWithinViewport;
}
