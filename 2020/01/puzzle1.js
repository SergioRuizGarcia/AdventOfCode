var readLines = require('../utils').readLines;
var binarySearch = require('../utils').binarySearch;

const lines = readLines('./input.txt').map(l => +l);
lines.sort((a, b) => a - b);

let element = -1;
let complement = -1;
for (let i of lines) {
	element = i;
	const complementIndex = binarySearch(lines, 2020 - i);
	if (complementIndex !== -1) {
		complement = lines[complementIndex];
		break;
	}
}

console.log(element, complement);
console.log(element * complement);