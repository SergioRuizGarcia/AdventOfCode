const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n').map(line => +line).sort((lineA, lineB) => lineA - lineB);

const joltageDifferences = {};

lines.unshift(0);
lines.push(lines[lines.length - 1] + 3);

for (let i = 1; i < lines.length; i++) {
	joltageDifferences[lines[i] - lines[i-1]] = (joltageDifferences[lines[i] - lines[i-1]] || 0) + 1;
}

console.log(joltageDifferences[1] * joltageDifferences[3]);