const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n');

const arrivalTime = +lines[0];

const ids = lines[1].split(',').map(id => +id).filter(number => Number.isInteger(number));

const nextDepartureTimes = ids.map(id => Math.ceil(arrivalTime / id) * id);

const desiredDepartureTime = Math.min(...nextDepartureTimes);

console.log((desiredDepartureTime - arrivalTime) * ids[nextDepartureTimes.indexOf(desiredDepartureTime)]);