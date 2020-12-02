var readLines = require('../utils').readLines;
var binarySearch = require('../utils').binarySearch;

const lines = readLines('./input.txt').map(l => +l);
lines.sort((a, b) => a - b);

let element1 = -1;
let element2 = -1;
let element3 = -1;

loop1:
for (let i of lines) {
	element1 = i;
	for (let j of lines) {
		element2 = j;
		const element3Index = binarySearch(lines, 2020 - element1 - element2);
		if (element3Index !== -1) {
			element3 = lines[element3Index];
			break loop1;
		}
	}
}

console.log(element1, element2, element3);
console.log(element1 * element2 * element3);