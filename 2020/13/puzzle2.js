const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n');

const idsWithIndexes = lines[1].split(',')
	.map(id => +id)
	.map((number, index) => {
		return { frequency: Number.isInteger(number) ? number : undefined, offset: index }
	})
	.filter(bus => bus.frequency !== undefined);

console.log(idsWithIndexes);

// Chinese remainder theorem, thanks reddit!
// -> https://www.reddit.com/r/adventofcode/comments/kc60ri/2020_day_13_can_anyone_give_me_a_hint_for_part_2/gfnnfm3/?utm_source=reddit&utm_medium=web2x&context=3

let firstOccurrence = idsWithIndexes[0].frequency;
let increment = idsWithIndexes[0].frequency;
let ncount = 0;

for (let i = 1; i < idsWithIndexes.length; i++) {
	while ((firstOccurrence + idsWithIndexes[i].offset) % idsWithIndexes[i].frequency) {
		firstOccurrence += increment;
		ncount++;
	}
	increment *= idsWithIndexes[i].frequency;
}

console.log(firstOccurrence)