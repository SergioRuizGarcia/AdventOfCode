const readLines = require('../utils').readLines;

const lines = readLines('./input.txt');

let maxId = 0;

lines.map(line => {
	// Front is 0 because the front row is the first one
	const row = parseInt(line.slice(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2);
	const column = parseInt(line.slice(7).replace(/L/g, '0').replace(/R/g, '1'), 2);
	maxId = Math.max(maxId, row * 8 + column);
});

console.log(maxId);