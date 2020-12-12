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

	getLineOfSight({ x, y }) {
		const rowDirection = this.layout[x].split('');
		const seatToRight = y === rowDirection.length - 1 ? undefined : this.firstChair(rowDirection.slice(y + 1));
		const seatToLeft = y === 0 ? undefined : this.firstChair(rowDirection.slice(0, y).reverse());
		const colDirection = this.layout.map(row => row[y]);
		const seatToBottom = x === colDirection.length - 1 ? undefined : this.firstChair(colDirection.slice(x + 1));
		const seatToTop = x === 0 ? undefined : this.firstChair(colDirection.slice(0, x).reverse());
		const seatToTopRight = this.firstChair(this.getUpRightLos({ x, y }));
		const seatToBottomRight = this.firstChair(this.getBottomRightLos({ x, y }));
		const seatToBottomLeft = this.firstChair(this.getBottomLeftLos({ x, y }));
		const seatToTopLeft = this.firstChair(this.getUpLeftLos({ x, y }));
		return [seatToTop, seatToTopRight, seatToRight, seatToBottomRight, seatToBottom, seatToBottomLeft, seatToLeft, seatToTopLeft];
	}

	getUpRightLos({ x, y }) {
		let elementsUpRight = [];
		let deltaX = 0;
		let deltaY = 0;
		while(x - deltaX > 0 && y + deltaY < this.layout[0].length) {
			deltaX++;
			deltaY++;
			elementsUpRight.push(this.get({ x: x - deltaX, y: y + deltaY }));
		}
		return elementsUpRight;
	}

	getBottomRightLos({ x, y }) {
		let elementsDownRight = [];
		let deltaX = 0;
		let deltaY = 0;
		while(x + deltaX < this.layout.length && y + deltaY < this.layout[0].length) {
			deltaX++;
			deltaY++;
			elementsDownRight.push(this.get({ x: x + deltaX, y: y + deltaY }));
		}
		return elementsDownRight;
	}

	getBottomLeftLos({ x, y }) {
		let elementsDownLeft = [];
		let deltaX = 0;
		let deltaY = 0;
		while(x + deltaX < this.layout.length && y - deltaY > 0) {
			deltaX++;
			deltaY++;
			elementsDownLeft.push(this.get({ x: x + deltaX, y: y - deltaY }));
		}
		return elementsDownLeft;
	}

	getUpLeftLos({ x, y }) {
		let elementsUpLeft = [];
		let deltaX = 0;
		let deltaY = 0;
		while(x - deltaX > 0 && y - deltaY > 0) {
			deltaX++;
			deltaY++;
			elementsUpLeft.push(this.get({ x: x - deltaX, y: y - deltaY }));
		}
		return elementsUpLeft;
	}

	isSameLayoutAs(otherSeatLayout) {
		for (let i = 0; i < this.layout.length; i++) {
			if (this.layout[i] !== otherSeatLayout.layout[i]) {
				return false;
			}
		}
		return true;
	}
	
	firstChair (direction) {
		return direction.find(el => el !== '.');
	}
}


const updateLayout = (seatLayout) => {
	const newSeatLayout = new SeatLayout(seatLayout.layout);
	const nRows = newSeatLayout.layout.length;
	const nCols = newSeatLayout.layout[0].length;
	for (let row = 0; row < nRows; row++) {
		for (let col = 0; col < nCols; col++) {
			const lineOfSight = seatLayout.getLineOfSight({ x: row, y: col });
			newSeatLayout.update({ x: row, y: col }, getNextState(seatLayout.get({ x: row, y: col}), lineOfSight));
		}
	}
	return newSeatLayout;
}

const getNextState = (element, lineOfSight) => {
	const occupiedSeatsAround = getNbOccupied(lineOfSight);

	if (element === '#' && occupiedSeatsAround >= 5) {
		return 'L';
	} else if (element === 'L' && occupiedSeatsAround === 0) {
		return '#';
	}

	return element;
}

const getNbOccupied = (layout) => {
	return layout.reduce((agg, curr) => {
		agg += curr === '#' ? 1 : 0;
		return agg;
	}, 0);
}

let previousSeatLayout = new SeatLayout(lines);
let nextSeatLayout = updateLayout(previousSeatLayout);

while (!previousSeatLayout.isSameLayoutAs(nextSeatLayout)) {
	previousSeatLayout = new SeatLayout(nextSeatLayout.layout);
	nextSeatLayout = updateLayout(previousSeatLayout);
}

console.log(nextSeatLayout.layout.reduce((agg, curr) => {
	agg += curr.split('').reduce((agg, curr) => {
		agg += curr === '#' ? 1 : 0;
		return agg;
	}, 0);
	return agg;
}, 0));