import { readLines } from '../utils/index';

const input = readLines('../inputs/day-03');

const getPriority = (character: string): number => {
    if (character.charCodeAt(0) > 97) {
        // Lowercase
        return character.charCodeAt(0) - 97 /* a in ASCII*/ + 1;
    }

    return character.charCodeAt(0) - 65 /* A in ASCII*/ + 27;
}

const commonItems = input.map(line => {
    const items = new Set();

    const firstCompartment = line.substring(0, line.length / 2);
    const secondCompartment = line.substring(line.length/2);

    for (const character of firstCompartment) {
        items.add(character);
    }

    for (const character of secondCompartment) {
        if (items.has(character)) {
            return character;
        }
    }
}).map(character => getPriority(character));

console.log(`Day 03 puzzle 1: ${commonItems.reduce((agg, curr) => agg + curr)} total sum`);

const badges = input.reduce((agg, curr, index) => {
    agg[Math.floor(index/3)] = agg[Math.floor(index/3)] ? agg[Math.floor(index/3)] + ' ' + curr : curr;
    return agg;
}, [] as string[])
.map((group, index) => {
    const rucksacks = group.split(' ');

    const itemsInFirst = new Set();

    for (const character of rucksacks[0]) {
        itemsInFirst.add(character);
    }

    const itemsInSecond = new Set();

    for (const character of rucksacks[1]) {
        itemsInSecond.add(character);
    }

    for (const character of rucksacks[2]) {
        if (itemsInFirst.has(character) && itemsInSecond.has(character)) {
            return character;
        }
    }
}).map((character, index) => {
    return getPriority(character)
});

console.log(`Day 03 puzzle 2: ${badges.reduce((agg, curr) => agg + curr)} total sum`);