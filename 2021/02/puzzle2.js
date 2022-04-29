const readLines = require('../../utils').readLines;

const puzzleInput = readLines('./input01.txt');

const getInstruction = (inputLine) => {
    const splitLine = inputLine.split(' ');
    return { direction: splitLine[0], amount: +splitLine[1] };
}

const moveUp = (location, amount) => {
    const newLocation = { ...location };
    newLocation.aim = (newLocation.aim || 0) - amount;
    return newLocation;
};

const moveDown = (location, amount) => {
    const newLocation = { ...location };
    newLocation.aim = (newLocation.aim || 0) + amount;
    return newLocation;
};

const moveForward = (location, amount) => {
    const newLocation = { ...location };
    newLocation.position = (newLocation.position || 0) + amount;
    newLocation.depth = (newLocation.depth || 0) + (newLocation.aim || 0) * amount;
    return newLocation;
};

const DIRECTION_UP = 'up';
const DIRECTION_DOWN = 'down';
const DIRECTION_FORWARD = 'forward';

const move = {};
move[DIRECTION_UP] = moveUp;
move[DIRECTION_DOWN] = moveDown;
move[DIRECTION_FORWARD] = moveForward;

let currentLocation = { position: 0, depth: 0, aim: 0};

for(line of puzzleInput) {
    const instruction = getInstruction(line);
    currentLocation = move[instruction.direction](currentLocation, instruction.amount);
}

console.log(currentLocation.depth * currentLocation.position);