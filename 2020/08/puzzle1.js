const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n')
	.map(line => {
		return {operation: line.split(' ')[0], argument: line.split(' ')[1]};
});

let pointer = 0;
const visitedPointers = new Set();
let accumulator = 0;

while (pointer < lines.length) {
	if (visitedPointers.has(pointer)) {
		break;
	}
	visitedPointers.add(pointer);

	switch (lines[pointer].operation) {
		case 'jmp':
			pointer += +lines[pointer].argument;
			break;
		case 'acc':
			accumulator += +lines[pointer].argument;
			pointer++;
			break;
		case 'nop':		
			pointer++;
			break;
		default:
	}
}

console.log(accumulator);