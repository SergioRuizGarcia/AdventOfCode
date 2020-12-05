const readLines = require('../utils').readLines;
const logInvertedColors = require('../utils').logInvertedColors;

const lines = readLines('./input.txt');

let width = lines[0].length;
let numberOfTrees = 0;
let currXPos = -3; // To offset the first pass of the loop

lines.forEach(line => {
	currXPos = (currXPos + 3)%width;
	
	if (line[currXPos] === '#') {	
		numberOfTrees++;
	}
});

console.log(numberOfTrees);
