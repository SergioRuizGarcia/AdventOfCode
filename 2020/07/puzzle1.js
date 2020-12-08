const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n');

let rules = {};

lines.forEach(line => {
	const type = line.split(' contain ')[0].split(' bag')[0];
	const contents = line.split(' contain ')[1].split(', ').map(content => content.split(' '));

	rules[type] = contents.reduce((agg, curr) => {
		const contentKey = curr.slice(1, curr.length - 1).join(' ').trim();
		agg[contentKey] = +curr[0];
		return agg;
	}, {});
});

let containedBags = {};

Object.keys(rules).forEach(rule => {
	Object.keys(rules[rule]).forEach(contentKey => {
		containedBags[contentKey] = (containedBags[contentKey] || []).concat(rule);
	});
});

let result = new Set();
result.add('shiny gold');
let sizeBeforeAddition;

while(true) {
	sizeBeforeAddition = result.size;
	let currentBags = Array.from(result);
	currentBags.forEach(bag => {
		containedBags[bag] && containedBags[bag].forEach(containedBag => {
			result.add(containedBag);
		});
	});
	if (sizeBeforeAddition === result.size) {
		break;
	}
}

console.log(result.size - 1);