( function () {
	function generateGrid() {
		const grid = document.querySelector( '.grid-wrapper' );
		const gridSize = 16;

		for ( let row = 0; row < gridSize; row++ ) {
			for ( let col = 0; col < gridSize; col++ ) {
				const square = document.createElement( 'div' );
				square.classList.add( 'square' );

				grid.appendChild( square );
			}
		}
	}

	function handleMouseOver( event ) {
		event.target.classList.add( 'square-color' );
	}

	function main() {
		generateGrid();

		const squares = document.querySelectorAll( '.square' );
		squares.forEach( square => {
			square.addEventListener( 'mouseover', handleMouseOver );
		} );
	}

	main();
}() );
