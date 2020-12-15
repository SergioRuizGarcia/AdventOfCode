const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', ',');

let spokenNumbers = lines.map(number => +number);
const lastSpoken = lines.reduce((agg, curr, index) => {
    agg[+curr] = { previouslySpoken: index + 1 };
    return agg;
}, {});

while(spokenNumbers.length < 2020) {
    let previousSpokenNumber = spokenNumbers[spokenNumbers.length - 1];
    let age = 0;
    if (lastSpoken[previousSpokenNumber]) {
        age = spokenNumbers.length - lastSpoken[previousSpokenNumber].previouslySpoken;
    }
    lastSpoken[previousSpokenNumber] = { previouslySpoken: spokenNumbers.length };
    spokenNumbers = spokenNumbers.concat(age);
}

console.log(spokenNumbers[2019]);