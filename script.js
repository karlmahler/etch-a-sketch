( function () {
	const COLORS = { black: 'rgb(0, 0, 0)' };
	const grid = document.querySelector( '.grid-wrapper' );
	const config = { gridSize: 16 };

	function generateGrid() {
		for ( let row = 0; row < config.gridSize; row++ ) {
			for ( let col = 0; col < config.gridSize; col++ ) {
				const square = document.createElement( 'div' );
				square.classList.add( 'square' );

				grid.appendChild( square );
			}
		}
	}

	function isBackgroundBlack( event ) {
		return event.target.style.getPropertyValue( 'background-color' ) === COLORS.black;
	}

	function addBlackBackground( event ) {
		if ( isBackgroundBlack( event ) ) {
			return;
		}

		event.target.style.setProperty( 'background-color', COLORS.black );
	}

	function isShade( event ) {
		const OPACITY_REGEX = /^rgba\(0, 0, 0, \d(\.\d)?\)$/;
		return OPACITY_REGEX.test( event.target.style.getPropertyValue( 'background-color' ) );
	}

	function getOpacity( event ) {
		const OPACITY_INDEX_START = -4;
		const OPACITY_INDEX_END = -1;

		const opacity = Number(
			event.target.style
				.getPropertyValue( 'background-color' )
				.slice( OPACITY_INDEX_START, OPACITY_INDEX_END )
		);

		return opacity;
	}

	function addShadeBackground( event ) {
		if ( isBackgroundBlack( event ) ) {
			return;
		}

		if ( !isShade( event ) ) {
			const INITIAL_OPACITY = 'rgba(0, 0, 0, 0.1)';
			event.target.style.setProperty( 'background-color', INITIAL_OPACITY );

			return;
		}

		const OPACITY_STEP = 0.1;
		const currentOpacity = getOpacity( event );
		event.target.style.setProperty( 'background-color', `rgba(0, 0, 0, ${currentOpacity + OPACITY_STEP})` );
	}

	function getRandomRgbValue() {
		const MAX_VALUE = 255;
		const randomValue = Math.floor( Math.random() * MAX_VALUE + 1 );

		return randomValue;
	}

	function getRandomRgb() {
		const [ red, green, blue ] = [
			getRandomRgbValue(),
			getRandomRgbValue(),
			getRandomRgbValue()
		];
		const rgb = `rgb(${red}, ${green}, ${blue})`;

		return rgb;
	}

	function addRandomRgbBackground( event ) {
		event.target.style.setProperty( 'background-color', getRandomRgb() );
	}

	function eraseBackground( event ) {
		event.target.style.setProperty( 'background-color', '' );
	}

	config.currentDrawingMode = addBlackBackground;

	function handleMode( event ) {
		if ( event.target.value === 'shade' ) {
			config.currentDrawingMode = addShadeBackground;
		} else if ( event.target.value === 'random-color' ) {
			config.currentDrawingMode = addRandomRgbBackground;
		} else if ( event.target.value === 'erase' ) {
			config.currentDrawingMode = eraseBackground;
		} else {
			config.currentDrawingMode = addBlackBackground;
		}
	}

	function handleMouseOver( event ) {
		config.currentDrawingMode( event );
	}

	function addMouseOverListener() {
		const squares = document.querySelectorAll( '.square' );
		squares.forEach( square => {
			square.addEventListener( 'mouseover', handleMouseOver );
		} );
	}

	function createLayout() {
		generateGrid();
		addMouseOverListener();
	}

	function clearGrid() {
		grid.textContent = '';
	}

	function getGridSize() {
		const minSize = 2, maxSize = 100;
		const promptMessage = `Enter a number between ${minSize} and ${maxSize}`;
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

	function setGridSize( size ) {
		config.gridSize = size;
	}

	function resizeGrid() {
		const size = getGridSize();

		if ( !size ) {
			return;
		}

		setGridSize( size );
		clearGrid();
		grid.style.setProperty( 'grid-template-columns', `repeat(${config.gridSize}, 1fr)` );
		createLayout();
	}

	function resetGrid() {
		clearGrid();
		createLayout();
	}

	function main() {
		createLayout();

		const resizeButton = document.getElementById( 'resize-grid' );
		resizeButton.addEventListener( 'click', resizeGrid );

		const resetButton = document.getElementById( 'reset-grid' );
		resetButton.addEventListener( 'click', resetGrid );

		const radioInputs = document.querySelectorAll( 'input[type="radio"][name="drawing-mode"]' );
		radioInputs.forEach( radioInput => {
			radioInput.addEventListener( 'change', event => {
				handleMode( event );
			} );
		} );
	}

	main();
}() );
