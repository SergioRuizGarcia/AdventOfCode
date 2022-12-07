import { readLines } from '../utils/index';

const input = readLines('../inputs/day-06')[0]; // just one line

let slidingWindowSize4: string[] = input.split('').slice(0, 4);
let slidingWindowSize14: string[] = input.split('').slice(0, 14);

let nbProcessedCharacters = 4;
let startOfPacket = -1;
let startOfMessage = -1;
for (; nbProcessedCharacters < input.length; nbProcessedCharacters++) {

    if (new Set(slidingWindowSize4).size === 4 && startOfPacket < 0) {
        startOfPacket = nbProcessedCharacters;
    }
    if (new Set(slidingWindowSize14).size === 14) {
        startOfMessage = nbProcessedCharacters;
    }
    if (startOfMessage > 0 && startOfPacket > 0) {
        break;
    }
    slidingWindowSize4.push(input[nbProcessedCharacters]);
    slidingWindowSize4 = slidingWindowSize4.slice(Math.max(0, slidingWindowSize4.length - 4));
    slidingWindowSize14.push(input[nbProcessedCharacters]);
    slidingWindowSize14 = slidingWindowSize14.slice(Math.max(0, slidingWindowSize14.length - 14));
}

console.log(`Day 06 puzzle 1: ${startOfPacket} processed characters for start-of-packet`)
console.log(`Day 06 puzzle 1: ${startOfMessage} processed characters for start-of-message`)

