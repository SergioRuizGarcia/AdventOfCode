import { readLines } from '../utils/index';

const input: string[]= readLines('../inputs/day-09');

class Position {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class UniquePositions {
    
    positions: Position[];
    constructor() {
        this.positions = [] as Position[];
    }

    add = (newPosition: Position) => {
        if (this.positions.filter(position => (position.x === newPosition.x) && (position.y === newPosition.y)).length === 0) {
            const toPush = new Position(newPosition.x, newPosition.y);
            this.positions.push(toPush);
        }
    }

    size = () => {
        return this.positions.length;
    }
}

abstract class Knot {
    currentPosition: Position;
    nextKnot: Knot;

    visitedPositions: UniquePositions;

    constructor(x: number, y: number) {
        this.currentPosition = new Position(x, y);
        this.visitedPositions = new UniquePositions();
        this.visitedPositions.add(this.currentPosition);
    }

    move: (direction: string, amount: number) => void;
    moveTowards: (position: Position) => void;

    pullsAKnot = () => {
        return this.nextKnot && (Math.abs(this.nextKnot.currentPosition.x - this.currentPosition.x) > 1 || Math.abs(this.nextKnot.currentPosition.y - this.currentPosition.y) > 1);
    }
}

class Head extends Knot {
    move = (direction: string, amount: number) => {
        for (let i = 0; i < amount; i++) {
            if ('U' === direction) {
                this.currentPosition.y++;
            } else if ('D' === direction) {
                this.currentPosition.y--;
            } else if ('R' === direction) {
                this.currentPosition.x++;
            } else {
                this.currentPosition.x--;
            }

            this.visitedPositions.add(this.currentPosition);

            if (this.pullsAKnot()) {
                this.nextKnot.moveTowards(this.currentPosition);
            }
        }
    }
}

class Tail extends Knot {

    moveTowards = (position: Position) => {
        if (position.x > this.currentPosition.x) {
            this.currentPosition.x++;
        } else if (position.x < this.currentPosition.x) {
            this.currentPosition.x--;
        }

        if (position.y > this.currentPosition.y) {
            this.currentPosition.y++;
        } else if (position.y < this.currentPosition.y) {
            this.currentPosition.y--;
        }

        this.visitedPositions.add(this.currentPosition);

        if (this.pullsAKnot()) {
            this.nextKnot.moveTowards(this.currentPosition);
        }
    }
}

class IntermediateKnot extends Tail {

}

const head = new Head(0, 0);
const tail = new Tail(0, 0);
head.nextKnot = tail;
const startingPosition = new Position(0, 0);

input.map(movement => {
    const [ direction, amount ] = movement.split(' ');

    head.move(direction, +amount);
});

console.log(`Day 09 puzzle 1: the tail visited ${tail.visitedPositions.size()} positions`);

const head2 = new Head(0, 0);
const intermediateKnot1 = new IntermediateKnot(0, 0);
const intermediateKnot2 = new IntermediateKnot(0, 0);
const intermediateKnot3 = new IntermediateKnot(0, 0);
const intermediateKnot4 = new IntermediateKnot(0, 0);
const intermediateKnot5 = new IntermediateKnot(0, 0);
const intermediateKnot6 = new IntermediateKnot(0, 0);
const intermediateKnot7 = new IntermediateKnot(0, 0);
const intermediateKnot8 = new IntermediateKnot(0, 0);
const tail2 = new Tail(0, 0);
head2.nextKnot = intermediateKnot1;
intermediateKnot1.nextKnot = intermediateKnot2;
intermediateKnot2.nextKnot = intermediateKnot3;
intermediateKnot3.nextKnot = intermediateKnot4;
intermediateKnot4.nextKnot = intermediateKnot5;
intermediateKnot5.nextKnot = intermediateKnot6;
intermediateKnot6.nextKnot = intermediateKnot7;
intermediateKnot7.nextKnot = intermediateKnot8;
intermediateKnot8.nextKnot = tail2;

input.map(movement => {
    const [ direction, amount ] = movement.split(' ');

    head2.move(direction, +amount);
});
console.log(`Day 09 puzzle 2: the tail visited ${tail2.visitedPositions.size()} positions`);