const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n\n');

console.log(lines.map(line => {
	return line.replace(/\n/g, '')
		.split('')
		// https://stackoverflow.com/a/14438954
		.filter((value, index, self) => self.indexOf(value) === index).length;
	})
	.reduce((agg, curr) => agg + curr, 0));
