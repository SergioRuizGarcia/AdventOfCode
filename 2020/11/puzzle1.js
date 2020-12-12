const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n');

class SeatLayout {
	constructor(layout) {
		this.layout = layout.slice();
	}

	getLayout() {
		return this.layout;
	}

	update({ x, y }, newStatus) {
		this.layout[x] = this.layout[x].slice(0, y) + newStatus + this.layout[x].slice(y + 1);
	}

	get({ x, y }) {
		if (x < 0 || x >= this.layout.length ||
			y < 0 || y >= this.layout[0].length) {
			return undefined;
		}
		return this.layout[x][y];
	}

	isSameLayoutAs(otherSeatLayout) {
		for (let i = 0; i < this.layout.length; i++) {
			if (this.layout[i] !== otherSeatLayout.layout[i]) {
				return false;
			}
		}
		return true;
	}
}

const updateLayout = (seatLayout) => {
	const newSeatLayout = new SeatLayout(seatLayout.layout);
	const nRows = newSeatLayout.layout.length;
	const nCols = newSeatLayout.layout[0].length;
	for (let row = 0; row < nRows; row++) {
		for (let col = 0; col < nCols; col++) {
			const vicinity = [[seatLayout.get({x: row - 1, y: col - 1}),
								seatLayout.get({x: row, y: col - 1}),
								seatLayout.get({x: row + 1, y: col - 1})],
							  [seatLayout.get({x: row - 1, y: col}),
								seatLayout.get({x: row, y: col}),
								seatLayout.get({x: row + 1, y: col})],
							  [seatLayout.get({x: row - 1, y: col + 1}),
								seatLayout.get({x: row, y: col + 1}),
								seatLayout.get({x: row + 1, y: col + 1})]];
			newSeatLayout.update({ x: +row, y: +col }, getNextState(vicinity));
		}
	}
	return newSeatLayout;
}

const getNextState = (vicinity) => {
	const occupiedSeatsAround = getNbOccupied(vicinity) - (vicinity[1][1] === '#' ? 1 : 0);

	if (vicinity[1][1] === '#' && occupiedSeatsAround >= 4) {
		return 'L';
	} else if (vicinity[1][1] === 'L' && occupiedSeatsAround === 0) {
		return '#';
	}

	return vicinity[1][1];
}

const getNbOccupied = (layout) => {
	return layout.reduce((agg, curr) => {
		agg += curr.reduce((agg, curr) => {
			agg += curr === '#' ? 1 : 0;
			return agg;
		}, 0);
		return agg;
	}, 0);
}

let previousSeatLayout = new SeatLayout(lines);
let nextSeatLayout = updateLayout(previousSeatLayout);

while (!previousSeatLayout.isSameLayoutAs(nextSeatLayout)) {
	previousSeatLayout = new SeatLayout(nextSeatLayout.layout);
	nextSeatLayout = updateLayout(previousSeatLayout);
}

console.log(getNbOccupied(nextSeatLayout.layout.map(row => row.split(''))));
