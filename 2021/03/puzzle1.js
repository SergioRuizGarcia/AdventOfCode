const readLines = require('../../utils').readLines;
const bin2dec = require('../../utils').bin2dec;

const puzzleInput = readLines('./input01.txt');

const accumulatedBits = { };

for (line of puzzleInput) {
    for (charIndex in line) {
        accumulatedBits[charIndex] = (accumulatedBits[charIndex] || 0) + +line[charIndex];
    }
}

const resultingBits = Object.keys(accumulatedBits).map(key => (accumulatedBits[key]/puzzleInput.length) > 0.5 ? '1' : '0').reduce((acc, curr) => acc + curr, '');

const gammaRate = bin2dec(resultingBits);
const epsilonRate = bin2dec(resultingBits)^bin2dec(new Array(resultingBits.length + 1).join( '1' ));
console.log(gammaRate * epsilonRate)