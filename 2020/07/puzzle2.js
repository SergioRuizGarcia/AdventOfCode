const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n');

let rules = {};

lines.forEach(line => {
	const type = line.split(' contain ')[0].split(' bag')[0];
	const contents = line.split(' contain ')[1].split(', ').map(content => content.split(' '));

	rules[type] = contents.reduce((agg, curr) => {
		const contentKey = curr.slice(1, curr.length - 1).join(' ').trim();
		if (contentKey !== 'other')
		agg[contentKey] = +curr[0];
		return agg;
	}, {});
});

const walkTree = (nodeKey, multiplier = 1) => {
	let children = rules[nodeKey];
	let nb = 1;
	children && Object.keys(children).forEach(childKey => {
			nb += walkTree(childKey, children[childKey]);
	});
	return nb * multiplier;
}

console.log(walkTree('shiny gold') - 1);