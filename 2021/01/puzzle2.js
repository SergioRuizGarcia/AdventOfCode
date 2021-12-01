const readLines = require('../../utils').readLines;

const puzzleInput = readLines('./input01.txt');

let nbIncrements = 0;

for (let i = 1; i < puzzleInput.length-2; i++) {
    const lastSlidingWindow = +puzzleInput[i-1] + +puzzleInput[i] + +puzzleInput[i+1];
    const thisSlidingWindow = +puzzleInput[i] + +puzzleInput[i+1] + +puzzleInput[i+2];
    if (thisSlidingWindow > lastSlidingWindow) {
        nbIncrements++;
    }
}

console.log(nbIncrements);