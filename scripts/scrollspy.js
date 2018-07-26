var oldSection;
var currentSection;
var sections = document.getElementsByClassName( "page-section" );

var activeClassName = "active-navigation-button";

document.addEventListener( "scroll", checkScreenPosition );
document.addEventListener( "resize", checkScreenPosition );

function checkScreenPosition() {
	for ( var s = 0; s < sections.length; s ++ ) {
		var section = sections[ s ];
		var sectionRect = section.getBoundingClientRect();

		var isAlreadyActive = section === currentSection;

		if ( withinViewport( section ) && !isAlreadyActive ) {
			oldSection = currentSection;
			currentSection = section;
			break;
		}
	}

	if ( currentSection == undefined )
		return;

	if ( oldSection != undefined ) 
		if ( withinViewport( oldSection ) && oldSection.offsetTop > currentSection.offsetTop )
			return;

	removeOldNavigationButtons();

	var sectionIdFormatted = currentSection.id + "-navigation";
	var navigationEquivalent = document.getElementById( sectionIdFormatted );
	
	navigationEquivalent.classList.add( activeClassName );
}

function removeOldNavigationButtons() {
	var oldNavigationButtons = document.getElementsByClassName( activeClassName );

	for ( var o = 0; o < oldNavigationButtons.length; o ++ ) {
		var oldNavigationButton = oldNavigationButtons[ o ];

		oldNavigationButton.classList.remove( activeClassName );
	}
}

function withinViewport( element ) {
	return element.offsetTop < window.pageYOffset + window.innerHeight;
}
