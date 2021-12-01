const readLines = require('../../utils').readLines;

const puzzleInput = readLines('./input01.txt');

let nbIncrements = 0;

for (let i = 1; i < puzzleInput.length; i++) {
    if (+puzzleInput[i] > +puzzleInput[i-1]) {
        nbIncrements++;
    }
}

console.log(nbIncrements);