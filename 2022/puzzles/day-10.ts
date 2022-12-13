import { readLines } from '../utils/index';

const input: string[]= readLines('../inputs/day-10');

interface CPUInstruction {
    cpuCycles: number;
    execute: (xRegister: number) => number;
}

class NoOpInstruction {
    cpuCycles: number;
    
    constructor() {
        this.cpuCycles = 1;
    }
    
    execute = (xRegister: number): number => {
        return xRegister;
    };
}

class AddXInstruction {
    cpuCycles: number;
    arg: number;
    
    constructor(arg: number) {
        this.cpuCycles = 2;
        this.arg = arg;
    }
    
    execute = (xRegister: number): number => {
        return xRegister + this.arg;
    };
}

class CPU {
    instructionQueue: CPUInstruction[];
    maxCPUCycles: number;
    currentCPUCycle: number;
    currentCPUInstruction: CPUInstruction;
    xRegister: number;
    signalStrength: number = 0;
    crt: string[] = new Array(240).fill('.');

    constructor() {
        this.maxCPUCycles = 240;
        this.currentCPUCycle = 0;
        this.xRegister = 1;
        this.instructionQueue = [];
    }

    readInstructions = (instructions: CPUInstruction[]) => {
        this.instructionQueue.push(...instructions);
    }

    executeInstructions = () => {
        while (this.currentCPUCycle <= this.maxCPUCycles) {
            this.cycle();
            this.readInstruction();
            
            this.increaseSignalStrength();
            this.updateCrt();

            this.executeInstruction();
        }

    }

    private cycle = (): void => {
        this.currentCPUCycle++;
    }

    private readInstruction = (): void => {
        if (!this.currentCPUInstruction) {
            this.currentCPUInstruction = this.instructionQueue.shift();
        }
    }

    private executeInstruction = (): void => {
        if (this.currentCPUInstruction) {
            this.currentCPUInstruction.cpuCycles--;
            if (this.currentCPUInstruction.cpuCycles === 0) {
                this.xRegister = this.currentCPUInstruction.execute(this.xRegister);
                this.currentCPUInstruction = undefined;
            }
        }
    }

    private increaseSignalStrength = () => {
        const signalStrengthBreakpoints = [20, 60, 100, 140, 180, 220];
        if (signalStrengthBreakpoints.includes(this.currentCPUCycle)) {
            this.signalStrength += this.xRegister * this.currentCPUCycle;
        }
    }

    private getMaskedPositions = () => {
        return [this.xRegister - 1, this.xRegister, this.xRegister + 1];
    }

    private updateCrt = () => {
        if (this.getMaskedPositions().includes((this.currentCPUCycle - 1) % 40)) {
            this.crt[this.currentCPUCycle] = '#';
        }
    }

    printCrt = () => {
        console.log(this.crt.slice(0, 40).join(''));
        console.log(this.crt.slice(40, 80).join(''));
        console.log(this.crt.slice(80, 120).join(''));
        console.log(this.crt.slice(120, 160).join(''));
        console.log(this.crt.slice(160, 200).join(''));
        console.log(this.crt.slice(200, 240).join(''));
    }
}

const cpu = new CPU();

const inputInstructions = input.map(line => {
    if ('noop' === line) {
        return new NoOpInstruction();
    } else {
        return new AddXInstruction(+line.split(' ')[1]);
    }
}).reduce((agg, curr) => agg.concat(curr), [] as CPUInstruction[]);

cpu.readInstructions(inputInstructions);

cpu.executeInstructions();

console.log(`Day 10 puzzle 1: signal strength is ${cpu.signalStrength}`);

console.log('Day 10 puzzle 2:');
cpu.printCrt();