const readLines = require('../utils').readLines;
const logInvertedColors = require('../utils').logInvertedColors;

const lines = readLines('./input.txt');

const slopes = [{
	x: 1,
	y: 1
}, {
	x: 3,
	y: 1
}, {
	x: 5,
	y: 1
}, {
	x: 7,
	y: 1
}, {
	x: 1,
	y: 2
}];

let width = lines[0].length;
// Multiplicative identity
let totalNumberOfTrees = 1;

slopes.forEach(slope => {
	let numberOfTreesInSlope = 0;
	// To offset the first pass of the loop we start with negatives
	let currXPos = -slope.x;
	let currYPos = -1;
	let lineNumber = -1;

	lines.forEach(line => {
		lineNumber++;
		if (lineNumber % slope.y !== 0) {
			return;
		}
		
		currXPos = (currXPos + slope.x)%width;
		
		if (line[currXPos] === '#') {	
			numberOfTreesInSlope++;
		}
	});
	
	totalNumberOfTrees *= numberOfTreesInSlope;
});

console.log(totalNumberOfTrees);
