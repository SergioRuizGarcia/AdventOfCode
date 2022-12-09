import { readLines } from '../utils/index';

const input: number[][]= readLines('../inputs/day-08').map(line => line.split('').map(treeHeight => +treeHeight));


const nbRows = input.length;
const nbColumns = input[0].length;

const treesInPerimeter = 2 * nbRows + 2 * nbColumns - 4;

let visibleTrees: number[][] = new Array(nbRows).fill(0).map(row => new Array(nbColumns).fill(0));
visibleTrees = visibleTrees.map((row, rowIndex) => {
    return row.map((column, columnIndex) => {
        if ((rowIndex === 0) || (rowIndex === nbRows - 1) || (columnIndex === 0) || (columnIndex === nbColumns - 1)) {
            return 1;
        }
        return 0;
    });
});

let maxInColumn: number[] = [];
for (let column = 1; column < nbColumns - 1; column++) {
    for (let row = 1; row < nbRows - 1; row++) {
        if (!maxInColumn[column]) {
            maxInColumn[column] = input[row - 1][column];
        }
        if (maxInColumn[column] === 9) {
            continue;
        }
        if (input[row][column] > maxInColumn[column]) {
            visibleTrees[row][column] = 1;
            maxInColumn[column] = input[row][column];
        }
    }
}
maxInColumn = [];

let maxInRow: number[] = [];
for (let row = 1; row < nbRows - 1; row++) {
    for (let column = 1; column < nbColumns - 1; column++) {
        if (!maxInRow[row]) {
            maxInRow[row] = input[row][column - 1];
        }
        if (maxInRow[row] === 9) {
            continue;
        }
        if (input[row][column] > maxInRow[row]) {
            visibleTrees[row][column] = 1;
            maxInRow[row] = input[row][column];
        }
    }
}
maxInRow = [];

for (let column = nbColumns - 2; column > 0; column--) {
    for (let row = nbRows - 2; row >= 0; row--) {
        if (!maxInColumn[column]) {
            maxInColumn[column] = input[row + 1][column];
        }
        if (maxInColumn[column] === 9) {
            continue;
        }
        if (input[row][column] > maxInColumn[column]) {
            visibleTrees[row][column] = 1;
            maxInColumn[column] = input[row][column];
        }
    }
}

for (let row = nbRows - 2; row > 0; row--) {
    for (let column = nbColumns - 2; column > 0; column--) {
        if (!maxInRow[row]) {
            maxInRow[row] = input[row][column + 1];
        }
        if (maxInRow[row] === 9) {
            continue;
        }
        if (input[row][column] > maxInRow[row]) {
            visibleTrees[row][column] = 1;
            maxInRow[row] = input[row][column];
        }
    }
}

console.log(`Day 08 puzzle 1: ${visibleTrees.reduce((agg, row) => {
    agg = agg + row.filter(column => column > 0).length;
    return agg;
}, 0)} visible trees`);


const treesSeenAbove = (rowIndex: number, columnIndex:number): number => {
    let nbTrees = 0;
    let visibleMaxHeight = 0;
    for (let i = rowIndex - 1; i >= 0; i--) {
        if (input[i][columnIndex] >= input[rowIndex][columnIndex]) {
            nbTrees++;
            break;
        }
 
        nbTrees++;
    }

    return nbTrees;
};

const treesSeenBelow = (rowIndex: number, columnIndex:number): number => {
    let nbTrees = 0;
    let visibleMaxHeight = 0;
    for (let i = rowIndex + 1; i < nbRows; i++) {
        if (input[i][columnIndex] >= input[rowIndex][columnIndex]) {
            nbTrees++;
            break;
        }

        nbTrees++;
    }

    return nbTrees;
};

const treesSeenRight = (rowIndex: number, columnIndex:number): number => {
    let nbTrees = 0;
    let visibleMaxHeight = 0;
    for (let i = columnIndex + 1; i < nbColumns; i++) {
        if (input[rowIndex][i] >= input[rowIndex][columnIndex]) {
            nbTrees++;
            break;
        }

        nbTrees++;
    }

    return nbTrees;
};

const treesSeenLeft = (rowIndex: number, columnIndex:number): number => {
    let nbTrees = 0;
    let visibleMaxHeight = 0;
    for (let i = columnIndex - 1; i >= 0; i--) {
        if (input[rowIndex][i] >= input[rowIndex][columnIndex]) {
            nbTrees++;
            break;
        }

        nbTrees++;
    }

    return nbTrees;
};

let scenicScores: number[][] = new Array(nbRows).fill(0).map(row => new Array(nbColumns).fill(0));

for (let column = 0; column < nbColumns; column++) {
    for (let row = 0; row < nbRows; row++) {
        scenicScores[row][column] = treesSeenAbove(row, column) * treesSeenBelow(row, column) * treesSeenLeft(row, column) * treesSeenRight(row, column);
    }
}

console.log(`Day 08 puzzle 2: ${scenicScores.reduce((agg, curr) => Math.max(agg, curr.reduce((agg, cur) => Math.max(agg, cur))), 0)} is the max scenic score`);