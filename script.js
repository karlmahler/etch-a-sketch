( function () {
	const grid = document.querySelector( '.grid-wrapper' );

	function generateGrid( gridSize = 16 ) {
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

	function addMouseOverListener() {
		const squares = document.querySelectorAll( '.square' );
		squares.forEach( square => {
			square.addEventListener( 'mouseover', handleMouseOver );
		} );
	}

	function getGridSize() {
		const promptMessage = 'Enter a number between 1 and 100';
		const minSize = 1, maxSize = 100;
		let gridSize = prompt( promptMessage );

		while ( gridSize !== null ) {
			gridSize = parseInt( gridSize );

			if (
				!isNaN( gridSize ) &&
				gridSize >= minSize &&
				gridSize <= maxSize
			) {
				return gridSize;
			}

			gridSize = prompt( `Invalid value! ${promptMessage}` );
		}

		return null;
	}

	function resizeGrid() {
		const size = getGridSize();

		if ( !size ) {
			return;
		}

		// Clear container's content.
		grid.textContent = '';
		grid.style.setProperty( 'grid-template-columns', `repeat(${size}, 1fr)` );

		generateGrid( size );
		addMouseOverListener();
	}

	function main() {
		generateGrid();
		addMouseOverListener();

		const resizeButton = document.getElementById( 'resize-grid' );
		resizeButton.addEventListener( 'click', resizeGrid );
	}

	main();
}() );
