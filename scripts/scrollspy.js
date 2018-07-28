var oldSection;
var currentSection;
var sections = document.getElementsByClassName( "page-section" );

var activeClassName = "active-navigation-button";

document.addEventListener( "scroll", checkScreenPosition );
document.addEventListener( "resize", checkScreenPosition );
document.addEventListener( "touchmove", checkScreenPosition );

function checkScreenPosition() {
	oldSection = currentSection;

	var jumbotronElement = document.getElementsByClassName( "jumbotron" )[ 0 ];
	var navigationBarElement = document.getElementsByClassName( "main-navigation" )[ 0 ];

	navigationBarElement.style.position = elementInViewport( jumbotronElement ) ? "relative" : "fixed";
	
	var navigationBarSize = navigationBarElement.offsetHeight; 
	var shouldAddPadding = navigationBarElement.style.position == "fixed";

	sections[ 0 ].style.paddingTop = shouldAddPadding ? navigationBarSize + "px" : "0px";

	for ( var s = 0; s < sections.length; s ++ ) {
		var section = sections[ s ];
		var sectionRect = section.getBoundingClientRect();

		if ( elementInViewport( section ) ) {
			anyWereSelected = true;
			currentSection = section;
		}
	}

	if ( currentSection == undefined || oldSection == undefined )
		return;

	if ( oldSection != undefined ) 
		if ( elementInViewport( oldSection ) && oldSection.offsetTop > currentSection.offsetTop )
			return;

	var oldSectionIdFormatted = oldSection.id + "-navigation";
	var oldNavigationEquivalent = document.getElementById( oldSectionIdFormatted );

	oldNavigationEquivalent.classList.remove( activeClassName );

	var sectionIdHash = "#" + currentSection.id;
	var sectionIdFormatted = currentSection.id + "-navigation";
	var navigationEquivalent = document.getElementById( sectionIdFormatted );
	
	navigationEquivalent.classList.add( activeClassName );

	history.pushState( null, null, sectionIdHash );
}

function elementInViewport( element ) {
	var bottomWithinViewport = element.offsetTop + element.offsetHeight >= window.pageYOffset &&
				   element.offsetTop + element.offsetHeight <= window.pageYOffset + window.innerHeight;
	var topWithinViewport = element.offsetTop <= window.pageYOffset + window.innerHeight && 
				element.offsetTop >= window.pageYOffset;
	return topWithinViewport || bottomWithinViewport;
}
