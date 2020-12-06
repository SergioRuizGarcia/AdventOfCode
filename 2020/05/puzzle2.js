const readLines = require('../utils').readLines;

const lines = readLines('./input.txt');

const ids = lines.map(line => {
	// Front is 0 because the front row is the first one
	const row = parseInt(line.slice(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2);
	const column = parseInt(line.slice(7).replace(/L/g, '0').replace(/R/g, '1'), 2);
	return row * 8 + column;
}).sort((idA, idB) => idA - idB);

for (let i = 1; i < ids.length; i++) {
	if (ids[i] - ids[i-1] === 2) {
		console.log(ids[i] - 1);
		break;
	}
}