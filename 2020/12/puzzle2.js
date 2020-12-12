const { truncate } = require('fs');

const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n');

const directionsRight = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const directionsLeft = ['NORTH', 'WEST', 'SOUTH', 'EAST'];

class ShipNavigation {
	constructor() {
		this.wayPointPosition = { x: 10, y: 1 };
		this.currentPosition = { x: 0, y: 0 };
	}

	turn90(instruction) {
		let newWayPointX;
		let newWayPointY;
		if (instruction === 'L') {
			newWayPointX = -1 * this.wayPointPosition.y;
			newWayPointY = this.wayPointPosition.x;
		} else {
			newWayPointX = this.wayPointPosition.y;
			newWayPointY = -1 * this.wayPointPosition.x;
		}
		this.wayPointPosition = { x: newWayPointX, y: newWayPointY };
	}

	turn(instruction, amount) {
		for(let i = 0; i < amount/90; i++) {
			this.turn90(instruction);
		}
	}

	goForward(amount) {
		this.currentPosition.x += amount * this.wayPointPosition.x;
		this.currentPosition.y += amount * this.wayPointPosition.y;
	}
	
	move(instruction, amount) {
		switch (instruction) {
			case 'N':
				this.wayPointPosition.y += amount;
				break;
			case 'E':
				this.wayPointPosition.x += amount;
				break;
			case 'S':
				this.wayPointPosition.y -= amount;
				break;
			case 'W':
				this.wayPointPosition.x -= amount;
				break;
			case 'F':
				this.goForward(amount);
				break;
			default:
				break;
		}
	}

	handle({ instruction, amount }) {
		if (['R', 'L'].includes(instruction)) {
			this.turn(instruction, amount);
		} else {
			this.move(instruction, amount);
		}
	}

}

const shipNavigation = new ShipNavigation();

lines.forEach(line => shipNavigation.handle({ instruction: line[0], amount: +line.slice(1) }));

console.log(Math.abs(shipNavigation.currentPosition.x) + Math.abs(shipNavigation.currentPosition.y));