const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n');

let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

const applyMask = (number) => {
    let binaryNumber = ('00000000000000000000000000000000000' + (number >>> 0).toString(2)).slice(-mask.length).split('').reverse();
    let reversedMask = mask.split('').reverse();

    let resultNumber = [];
    for (let i = 0; i < Math.min(reversedMask.length, binaryNumber.length); i++) {
        resultNumber = resultNumber.concat(reversedMask[i] === 'X' ? binaryNumber[i] : reversedMask[i]);
    }
    if (resultNumber.length < binaryNumber.length) {
        resultNumber = resultNumber.concat(binaryNumber.slice(resultNumber.length - 1));
    } else if (resultNumber.length < mask.length) {
        resultNumber = resultNumber.concat(mask.replace(/X/g, '0').split('').reverse().slice(resultNumber.length));
    }

    return parseInt(resultNumber.reverse().join(''), 2);
}

const isMask = (line) => {
    return line.startsWith('mask');
}

let memory = {};

lines.forEach(line => {
    if (isMask(line)) {
        mask = line.split(' = ')[1];
        return;
    }
    let splitLine = line.split(' = ');
    memory[splitLine[0].slice(4, splitLine[0].length - 1)] = applyMask(splitLine[1]);
});

console.log(Object.keys(memory).reduce((agg, curr) => agg + memory[curr], 0));