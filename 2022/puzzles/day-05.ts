import { readLines } from '../utils/index';

const twoParterInput = readLines('../inputs/day-05', '\n\n');

const initialStackStates = twoParterInput[0].split('\n');
const movements = twoParterInput[1].split('\n').filter(line => line !== '');

const stacks: string[][] = [];

// +1 to account for the last column not having a space to the right
const numberOfStacks = (initialStackStates[0].length + 1) / 4;

for (let height = 0; height < initialStackStates.length - 1; height++) {
    for (let stackIndex = 0; stackIndex < numberOfStacks; stackIndex++) {
        if (!stacks[stackIndex]) {
            stacks[stackIndex] = [];
        }
        const crate = initialStackStates[height].substring(stackIndex * 4, (stackIndex * 4) + 3);
        if (crate === '   ') {
            continue;
        }
        stacks[stackIndex].push(crate.substr(1, 1));
    }
}

for (let stackIndex = 0; stackIndex < numberOfStacks; stackIndex++) {
    stacks[stackIndex] = stacks[stackIndex].reverse();
}

const puzzle1Stacks = stacks.map(stack => stack.slice());

for (const movement of movements) {
    const amountMoved = +movement.split(' ')[1];
    const originStack = +movement.split(' ')[3];
    const destinationStack = +movement.split(' ')[5];

    for (let i = 0; i < amountMoved; i++) {
        const crate = puzzle1Stacks[originStack - 1].pop();
        puzzle1Stacks[destinationStack - 1].push(crate);
    }
}

console.log(`Day 05 puzzle 1: resulting text with top crates is "${puzzle1Stacks.map(stack => stack[stack.length - 1]).reduce((agg, curr) => agg + curr)}"`);

const puzzle2Stacks = stacks.map(stack => stack.slice());

for (const movement of movements) {
    const amountMoved = +movement.split(' ')[1];
    const originStack = +movement.split(' ')[3];
    const destinationStack = +movement.split(' ')[5];

    puzzle2Stacks[destinationStack - 1] = puzzle2Stacks[destinationStack - 1].concat(puzzle2Stacks[originStack - 1].splice(puzzle2Stacks[originStack - 1].length - amountMoved));
}

console.log(`Day 05 puzzle 2: resulting text with top crates is "${puzzle2Stacks.map(stack => stack[stack.length - 1]).reduce((agg, curr) => agg + curr)}"`);