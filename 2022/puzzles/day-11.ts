import { readLines } from '../utils/index';
import { start } from 'repl';

const input: string[]= readLines('../inputs/day-11', '\n\n');

class Item {
    worryLevel: number;
    constructor(worryLevel: number) {
        this.worryLevel = worryLevel;
    }
}
class Monkey {
    tagNumber: number;
    inventory: Item[];
    receivingHand: Item[] = [];
    inspect: (Item) => Item;
    throwTo: (Item) => number;
    divisor: number

    constructor(tagNumber:number, startingInventory: Item[], inspectOperation: (Item) => Item, throwTo: (Item) => number, divisor: number) {
        this.tagNumber = tagNumber;
        this.inventory = startingInventory;
        this.inspect = inspectOperation;
        this.throwTo = throwTo;
        this.divisor = divisor;
    }

}

class Round {
    monkeys: Monkey[]
    monkeyActivity: number[];

    mcm: number;

    constructor(monkeys: Monkey[]) {
        this.monkeys = monkeys.map(monkey => new Monkey(monkey.tagNumber, monkey.inventory, monkey.inspect, monkey.throwTo, monkey.divisor));
        this.monkeyActivity = new Array(monkeys.length).fill(0);
        this.mcm = monkeys.map(monkey => monkey.divisor).reduce((agg, curr) => agg * curr, 1);
    }

    progressPart1 = () => {
        for (const monkey of this.monkeys) {
            monkey.inventory = monkey.inventory.concat(monkey.receivingHand || []);
            monkey.receivingHand = [];
            for (const item of monkey.inventory) {
                const inspectionResult = monkey.inspect(item);
                this.registerMonkeyActivity(monkey);
                inspectionResult.worryLevel = Math.floor(inspectionResult.worryLevel / 3);
                const nextMonkey = monkey.throwTo(inspectionResult);                
                this.monkeys[nextMonkey].receivingHand.push(inspectionResult);
            }
            monkey.inventory = [];
        }
    }

    progressPart2 = () => {
        for (const monkey of this.monkeys) {
            monkey.inventory = monkey.inventory.concat(monkey.receivingHand || []);
            monkey.receivingHand = [];
            for (const item of monkey.inventory) {
                const inspectionResult = monkey.inspect(item);
                this.registerMonkeyActivity(monkey);
                inspectionResult.worryLevel = inspectionResult.worryLevel % this.mcm;
                const nextMonkey = monkey.throwTo(inspectionResult);                
                this.monkeys[nextMonkey].receivingHand.push(inspectionResult);
            }
            monkey.inventory = [];
        }
    }

    private registerMonkeyActivity = (monkey: Monkey) => {
        this.monkeyActivity[monkey.tagNumber]++;
    }
}

const monkeys = input.map(monkeyInput => {
    const [ tag, 
        startingItems,
        operation,
        testCondition,
        nextMonkeyIfTrue,
        nextMonkeyIfFalse
    ] = monkeyInput.split('\n');

    const startingInventory = startingItems.split(': ')[1].split(', ').map(line => new Item(+line));
    const inspectOperation = (item: Item): Item => {
        return new Item(eval(operation.split(' = ')[1].replace(/old/g, "item.worryLevel")) as number);
    };
    const divisor = +testCondition.split(' divisible by ')[1];
    const throwTo = (item: Item): number => {
        const divisor = +testCondition.split(' divisible by ')[1];
        if (item.worryLevel % divisor === 0) {
            return +nextMonkeyIfTrue.split(' throw to monkey ')[1];
        } else {
            return +nextMonkeyIfFalse.split(' throw to monkey ')[1];
        }
    }
    return new Monkey(+tag.substring(7, 8), startingInventory, inspectOperation, throwTo, divisor);
});


const roundPart1 = new Round(monkeys);

for (let i = 0; i < 20; i++) {
    roundPart1.progressPart1();
}

console.log(`Day 11 puzzle 1: Level of monkey business is ${roundPart1.monkeyActivity.sort((a,b)=>a-b).slice(roundPart1.monkeyActivity.length - 2).reduce((agg, curr) => agg * curr, 1)}`)

const roundPart2 = new Round(monkeys);
for (let i = 0; i < 10000; i++) {
    roundPart2.progressPart2();
}

console.log(`Day 11 puzzle 2: Level of monkey business is ${roundPart2.monkeyActivity.sort((a,b)=>a-b).slice(roundPart2.monkeyActivity.length - 2).reduce((agg, curr) => agg * curr, 1)}`)