const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n');

const targetNumber = 105950735;

const queue = [];
let nextIndex = 0;

const sumQueue = (queue) => queue.reduce((agg, curr) => agg + curr, 0);
do {
	if (sumQueue(queue) < targetNumber) {
		queue.push(+lines[nextIndex]);
		nextIndex++;
	} else {
		queue.shift();
	}
}
while (sumQueue(queue) !== targetNumber);

queue.sort();

console.log(queue[0] + queue[queue.length - 1]);