import { readLines } from '../utils/index';

const lines = readLines('../inputs/day-02');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';

const p1MovementsDict = { A: ROCK, B: PAPER, C: SCISSORS };
const p2MovementsDict = { X: ROCK, Y: PAPER, Z: SCISSORS };

const pointsPerShapeDict = {};
pointsPerShapeDict[ROCK] = 1;
pointsPerShapeDict[PAPER] = 2;
pointsPerShapeDict[SCISSORS] = 3;

const winsAgainst = { ROCK: SCISSORS, PAPER: ROCK, SCISSORS: PAPER };

// 0 if player one wins, 1 if draw, 2 if player 2 wins
const whoWins = (p1Movement, p2Movement) => {
    if (winsAgainst[p1Movement] === p2Movement) {
        return 0;
    } else if (winsAgainst[p2Movement] === p1Movement) {
        return 2;
    } else {
        return 1;
    }
}

const totalPoints = lines.map(line => {
    const movements = line.split(' ');
    return whoWins(p1MovementsDict[movements[0]], p2MovementsDict[movements[1]]) * 3 + pointsPerShapeDict[p2MovementsDict[movements[1]]]
}).reduce((aggregated, current) => aggregated + current);

console.log(`Day 02 puzzle 1: ${totalPoints} in total`)

const losesAgainstDict = { PAPER: SCISSORS, SCISSORS: ROCK, ROCK: PAPER };

const WIN = 'WIN';
const LOSE = 'LOSE';
const DRAW = 'DRAW';

const expectedResultsDict = { X: LOSE, Y: DRAW, Z: WIN }

const getPlayer2Movement = (player1Movement: string, expectedResult: string): string => {
    if (expectedResultsDict[expectedResult] === WIN) {
        return losesAgainstDict[player1Movement];
    } else if (expectedResultsDict[expectedResult] === LOSE) {
        return winsAgainst[player1Movement];
    } else {
        return player1Movement;
    }
}

const pointsWithStrategy = lines.map(line => {
    const movements = line.split(' ');
    const player1Movement = p1MovementsDict[movements[0]];
    const player2Movement = getPlayer2Movement(player1Movement, movements[1]);
    return whoWins(player1Movement, player2Movement) * 3 + pointsPerShapeDict[player2Movement];
}).reduce((aggregated, current) => aggregated + current);

console.log(`Day 02 puzzle 2: ${pointsWithStrategy} in total`)