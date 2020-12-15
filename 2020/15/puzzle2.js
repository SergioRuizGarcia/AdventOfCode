const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', ',');

let initialNumbers = lines.map(number => +number);
const lastSpoken = lines.reduce((agg, curr, index) => {
    agg[+curr] = { previouslySpoken: index + 1 };
    return agg;
}, {});

let nCount = initialNumbers.length;
let previousSpokenNumber = initialNumbers[nCount - 1];

while(nCount < 30000000) {
    let age = 0;
    if (lastSpoken[previousSpokenNumber]) {
        age = nCount - lastSpoken[previousSpokenNumber].previouslySpoken;
    }
    lastSpoken[previousSpokenNumber] = { previouslySpoken: nCount };
    previousSpokenNumber = age;
    nCount++;
}

console.log(previousSpokenNumber);