const { truncate } = require('fs');

const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n');

const directionsRight = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const directionsLeft = ['NORTH', 'WEST', 'SOUTH', 'EAST'];

class ShipNavigation {
	constructor() {
		this.currentPosition = { x: 0, y: 0 };
		this.viewDirection = 'EAST';
	}

	turn(instruction, amount) {
		if (instruction === 'L') {
			this.viewDirection = directionsLeft[(directionsLeft.indexOf(this.viewDirection) + amount/90) % 4];
		} else {
			this.viewDirection = directionsRight[(directionsRight.indexOf(this.viewDirection) + amount/90) % 4];
		}
	}

	goForward(amount) {
		switch(this.viewDirection) {
			case 'NORTH':
				this.currentPosition.y += amount;
				break;
			case 'EAST':
				this.currentPosition.x += amount;
				break;
			case 'SOUTH':
				this.currentPosition.y -= amount;
				break;
			case 'WEST':
				this.currentPosition.x -= amount;
				break;
			default:
				break;	
		}
	}
	
	move(instruction, amount) {
		switch (instruction) {
			case 'N':
				this.currentPosition.y += amount;
				break;
			case 'E':
				this.currentPosition.x += amount;
				break;
			case 'S':
				this.currentPosition.y -= amount;
				break;
			case 'W':
				this.currentPosition.x -= amount;
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