import { readLines } from '../utils/index';

const caloriesByElf = readLines('../inputs/day-01', '\n\n').map(calories => calories.split('\n').map(calorie => +calorie));

const mostTotalCalories = caloriesByElf.map(totalCaloriesByElf => totalCaloriesByElf.reduce((aggregated, current) => aggregated + current)).sort();

const numberOfElves = mostTotalCalories.length;
console.log(`Day 01 puzzle 1. Most total calories: ${mostTotalCalories[numberOfElves - 1]}`);

console.log(`Day 01 puzzle 2. Calories carried by top 3 elves : ${mostTotalCalories[numberOfElves - 1] + mostTotalCalories[numberOfElves - 2] + mostTotalCalories[numberOfElves - 3]}`);