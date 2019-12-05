package utils.intcodecomputer;

import utils.intcodecomputer.instruction.Instruction;
import utils.intcodecomputer.instruction.InstructionFactory;

public class IntcodeComputer {
	public static int executeProgram(int[] initialMemory, int... args) {
		int[] memory = new int[initialMemory.length];
		
		System.arraycopy(initialMemory, 0, memory, 0, initialMemory.length);
		
		MemoryManager memoryManager = new MemoryManager(memory);
		
		while(memoryManager.hasMoreToRead()) {
			Instruction instruction = InstructionFactory.getInstruction(memoryManager.getNextElement());
			if (instruction.getOpCode() == OpCode.HALT) {
				break;
			}
			instruction.operate(memoryManager);
		}
		return memoryManager.getValueAtAddress(0);
	}
}
