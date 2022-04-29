const readLines = require('../../utils').readLines;
const dec2bin = require('../../utils').dec2bin;
const bin2dec = require('../../utils').dec2bin;

const puzzleInput = readLines('./input01.txt');

const accumulatedBits = { };

for (line of puzzleInput) {

    
    for (charIndex in line) {
        accumulatedBits[charIndex] = (accumulatedBits[charIndex] || 0) + +line[charIndex];
    }
}

const resultingBits = Object.keys(accumulatedBits).map(key => (accumulatedBits[key]/puzzleInput.length) > 0.5 ? '1' : '0').reduce((acc, curr) => acc + curr, '');
const invertedResultingBits = bin2dec(dec2bin(resultingBits)^dec2bin(new Array(resultingBits.length + 1).join( '1' )));










console.log(gammaRate * epsilonRate)