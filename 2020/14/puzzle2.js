const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n');

let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

const applyMask = (binaryNumber) => {
    let paddedBinaryNumber = ('00000000000000000000000000000000000' + binaryNumber).slice(-mask.length).split('').reverse();
    let reversedMask = mask.split('').reverse();

    let resultNumber = [];
    for (let i = 0; i < Math.min(reversedMask.length, paddedBinaryNumber.length); i++) {
        resultNumber = resultNumber.concat(reversedMask[i] === '0' ? paddedBinaryNumber[i] : reversedMask[i]);
    }
    if (resultNumber.length < paddedBinaryNumber.length) {
        resultNumber = resultNumber.concat(paddedBinaryNumber.slice(resultNumber.length - 1));
    } else if (resultNumber.length < mask.length) {
        resultNumber = resultNumber.concat(mask.replace(/X/g, '0').split('').reverse().slice(resultNumber.length));
    }

    return resultNumber.reverse().join('');
}

const isMask = (line) => {
    return line.startsWith('mask');
}

const getPossibleAddresses = (seed, prefix = '') => {
	if (seed.length === 0) {
		return [prefix];
	}
	let possibleAddresses = [];
	if (seed[0] === 'X') {
		possibleAddresses = possibleAddresses.concat(getPossibleAddresses(seed.slice(1), prefix + '0'));
		possibleAddresses = possibleAddresses.concat(getPossibleAddresses(seed.slice(1), prefix + '1'));
	} else {
		possibleAddresses = possibleAddresses.concat(getPossibleAddresses(seed.slice(1), prefix + seed[0]));
	}
	return possibleAddresses;
}

let memory = {};

lines.forEach(line => {
    if (isMask(line)) {
        mask = line.split(' = ')[1];
        return;
	}
	
	let splitLine = line.split(' = ');
	const possibleAddresses = getPossibleAddresses(applyMask((splitLine[0].slice(4, splitLine[0].length - 1) >>> 0).toString(2)));
	possibleAddresses.forEach(address => memory[address] = +splitLine[1]);
});

console.log(Object.keys(memory).reduce((agg, curr) => agg + memory[curr], 0));