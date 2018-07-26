var oldSection;
var currentSection;
var sections = document.getElementsByClassName( "page-section" );

var activeClassName = "active-navigation-button";

document.addEventListener( "scroll", checkScreenPosition );
document.addEventListener( "resize", checkScreenPosition );

function checkScreenPosition() {
	oldSection = currentSection;

	var anyWereSelected = false;

	for ( var s = 0; s < sections.length; s ++ ) {
		var section = sections[ s ];
		var sectionRect = section.getBoundingClientRect();

		if ( withinViewport( section ) ) {
			anyWereSelected = true;
			currentSection = section;
		}
	}

	if ( currentSection == undefined || oldSection == undefined ) {
		return;
	}

	if ( oldSection != undefined ) 
		if ( withinViewport( oldSection ) && oldSection.offsetTop > currentSection.offsetTop )
			return;

	var oldSectionIdFormatted = oldSection.id + "-navigation";
	var oldNavigationEquivalent = document.getElementById( oldSectionIdFormatted );

	oldNavigationEquivalent.classList.remove( activeClassName );

	if ( !anyWereSelected ) {
		currentSection = undefined;
		history.pushState( null, null, "" );
		return;
	}

	var sectionIdHash = "#" + currentSection.id;
	var sectionIdFormatted = currentSection.id + "-navigation";
	var navigationEquivalent = document.getElementById( sectionIdFormatted );
	
	navigationEquivalent.classList.add( activeClassName );

	history.pushState( null, null, sectionIdHash );
}

function withinViewport( element ) {
	return element.offsetTop < window.pageYOffset + window.innerHeight;
}
