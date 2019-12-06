package utils.intcodecomputer;

import utils.intcodecomputer.instruction.Instruction;
import utils.intcodecomputer.instruction.InstructionFactory;

public class IntcodeComputer {
	
	private IntcodeComputer() {
		// Not meant to be instantiated
	}
	
	public static int executeProgram(int[] initialMemory, int... args) {
		MemoryManager memoryManager = new MemoryManager(initialMemory);
		
		while(memoryManager.hasMoreToRead()) {
			InstructionFactory instructionFactory = new InstructionFactory();
			Instruction instruction = instructionFactory.getInstruction(memoryManager.getNextElement());
			if (instruction.getOpCode() == OpCode.HALT) {
				break;
			}
			if (instruction.hasArguments()) {
				instruction.operate(memoryManager, args);
			} else {
				instruction.operate(memoryManager);
			}
		}
		return memoryManager.getValueAtAddress(0);
	}
}
