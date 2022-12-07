import { readLines } from '../utils/index';

const input = readLines('../inputs/day-04');

class Assignment {
    lowerBound: number;
    upperBound: number;

    constructor(lowerBound: number, upperBound: number) {
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }

    fullyContains(another: Assignment): boolean {
        return this.upperBound >= another.upperBound && this.lowerBound <= another.lowerBound;
    }

    overlaps(another: Assignment): boolean {
        return (this.lowerBound >= another.lowerBound && this.lowerBound <= another.upperBound) ||
            (this.upperBound >= another.lowerBound && this.upperBound <= another.upperBound) || 
            this.fullyContains(another) ||
            another.fullyContains(this);
    }
};

const fullyContained = input.map(pair => {
    const firstElf = pair.split(',')[0];
    const secondElf = pair.split(',')[1];

    const firstAssignment = new Assignment(+firstElf.split('-')[0], +firstElf.split('-')[1]);
    const secondAssignment = new Assignment(+secondElf.split('-')[0], +secondElf.split('-')[1]);

    return firstAssignment.fullyContains(secondAssignment) || secondAssignment.fullyContains(firstAssignment);
}).filter(fullyContained => fullyContained);

console.log(`Day 04 puzzle 1: ${fullyContained.length} fully contained assignments`);

const overlapped = input.map(pair => {
    const firstElf = pair.split(',')[0];
    const secondElf = pair.split(',')[1];

    const firstAssignment = new Assignment(+firstElf.split('-')[0], +firstElf.split('-')[1]);
    const secondAssignment = new Assignment(+secondElf.split('-')[0], +secondElf.split('-')[1]);

    return firstAssignment.overlaps(secondAssignment);
}).filter(overlapped => overlapped);

console.log(`Day 04 puzzle 2: ${overlapped.length} overlapped assignments`);