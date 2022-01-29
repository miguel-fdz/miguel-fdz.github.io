let color = 'black'; 
newGrid(30); //initialize board at 30x30 pixels

/** First remove entirety of previous grid if it exists,    
 * 
 * then build pixels for specified grid area, and add
 * 
 * coloring functionality as mouse hovers over grid
 */
function newGrid(gridSize) {
  const oldGrid = document.querySelectorAll('.pixel');
  oldGrid.forEach(oldPixel => container.removeChild(oldPixel));

  container.style.gridTemplateColumns = 'repeat(' + gridSize + ', 1fr)';

  for (let index = 0; index < (gridSize * gridSize); index++) {
    const newPixel = document.createElement('div');
    newPixel.classList.add('pixel');
    newPixel.addEventListener('mouseover', () => paint(newPixel));
    container.appendChild(newPixel);
  }
};

/** Paints over pixel according to current
 * 
 * color selection
 */
function paint(e) {
  if (color === 'black') e.style.backgroundColor = color;
  else e.style.backgroundColor = randomizeColor();
}

/**
 * Clear all pixel coloring
 */
function reset() {
  document.querySelectorAll('.pixel').forEach(e => e.style.backgroundColor = 'white');
}

/**
 * Alternate color selection for paint function 
 * 
 * as well as html of color selection button
 */
function chooseColor() {
  const button = document.querySelector("#paintColor");
  if (color === 'black') {
    button.value = "Rainbow";
    color = 'random';
  }
  else {
    button.value = "Black" 
    color = 'black';
  }
}

/**
 * Generate random RGB for rainbow color scheme
 */
function randomizeColor() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

/**
 * Prompt user for valid numeric input for
 * 
 * new grid size and then rebuild accordingly
 */
function resize() {
  const newSize = prompt('How large would you like the grid area to be? \nMust be between 0 and 100 pixels', '16');
  if (newSize > 0 && newSize <= 100 && newSize !== null) newGrid(newSize);
  else alert('Please supply a number greater than zero but less than 100')
}

//Change hover button color for rainbow color scheme
paintColor.addEventListener("mouseenter", () => {
  if(paintColor.value == "Rainbow") paintColor.style.backgroundColor = randomizeColor();
  else paintColor.style.backgroundColor = "#286f6c"
});

paintColor.addEventListener("mouseleave", () => {
  if(paintColor.value == "Black") paintColor.style.backgroundColor = "#fff"
});