const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n')
	.map(line => {
		return {operation: line.split(' ')[0], argument: line.split(' ')[1]};
});

const runWithInput = (lines) => {
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
	return { pointer, accumulator };
}

let swapIndex = -1;

const swapNext = (lines) => {
	const foundIndex = lines.findIndex((element, index) => {
		return ['jmp', 'nop'].includes(element.operation) && index > swapIndex;
	});
	swapIndex = foundIndex;
	const returnList = lines.slice();
	returnList[swapIndex] = {operation: returnList[swapIndex].operation === 'jmp' ? 'nop' : 'jmp', argument: returnList[swapIndex].argument};
	return returnList;
}

let { pointer, accumulator } = runWithInput(swapNext(lines));

while (pointer < lines.length) {
	let newResult = runWithInput(swapNext(lines));
	pointer = newResult.pointer;
	accumulator = newResult.accumulator;
}

console.log(accumulator);