const { group } = require('console');

const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n\n');

console.log(lines.map(line => {
	const groupSize = line.split('').filter(char => char === '\n').length + 1;
	const yesInGroup = [];
	const aAnsiCode = 'a'.charCodeAt(0);
	line.replace(/\n/g, '').split('').forEach(char => {
		yesInGroup[char.charCodeAt(0) - aAnsiCode] = (yesInGroup[char.charCodeAt(0) - aAnsiCode] || 0) + 1;
	});

	return yesInGroup.filter(char => char === groupSize).length;
}).reduce((agg, curr) => agg + curr, 0));