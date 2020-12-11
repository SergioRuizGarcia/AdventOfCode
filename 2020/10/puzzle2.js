const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n').map(line => +line).sort((lineA, lineB) => lineA - lineB);

lines.unshift(0);

// To hold the last 3 paths to the leaves. The amount of combinations from any given node to a leaf will be
// 1 if it is connected directly to the leaf + the sum of all the other paths from the nodes reachable by
// that node. There will always be just one path from the first node to the end seeing as the end is computed
// as the first node + 3
let lastPaths = [1];

// Start from the second to last => Last one already visited, at distance 1 to the leaf
for (let visitIndex = lines.length - 2; visitIndex >= 0; visitIndex--) {
	let potentiallyReachableNodes = lines.slice(visitIndex + 1, visitIndex + 4);
	let pathsToLeaf = 0;
	potentiallyReachableNodes.forEach((node, index) => {
		if (node <= lines[visitIndex] + 3) {
			pathsToLeaf += lastPaths[index];
		}
	});
	lastPaths = [pathsToLeaf].concat(lastPaths.slice(0, 2));
}

console.log(lastPaths[0]);