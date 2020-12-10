const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n');

let windowStart = 0;
let preamble = [];
let xmasData = [];
let complements;
do {
	complements = {};
	preamble = lines.slice(windowStart, windowStart + 25);
	xmasData = lines.slice(windowStart + 25);
	preamble.forEach((element, index) => {
		const complement = +xmasData[0] - +element;
		if (complement > 0) {
			complements['' + complement] = +index;
		}
	});
	windowStart++;
}
while (preamble.some((element, index) => complements.hasOwnProperty(element) && complements[element] !== index));

console.log(xmasData[0]);