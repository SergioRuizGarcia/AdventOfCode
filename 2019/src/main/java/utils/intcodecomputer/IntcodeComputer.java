package utils.intcodecomputer;

import java.util.ArrayDeque;
import java.util.Deque;

import utils.intcodecomputer.instruction.Instruction;
import utils.intcodecomputer.instruction.InstructionFactory;

public class IntcodeComputer {
	
	private IntcodeComputer() {
		// Not meant to be instantiated
	}
	
	public static int executeProgram(int[] initialMemory, int... args) {
		MemoryManager memoryManager = new MemoryManager(initialMemory);
		final Deque<Integer> arguments = new ArrayDeque<>();
		for (int i = 0; i < args.length; i++) {
			arguments.offer(args[i]);
		}
		
		while(memoryManager.hasMoreToRead()) {
			InstructionFactory instructionFactory = new InstructionFactory(memoryManager);
			Instruction instruction = instructionFactory.getNextInstruction();
			if (instruction.getOpCode() == OpCode.HALT) {
				break;
			}
			
			instruction.operate(arguments);
		}
		return memoryManager.hasOutputs() ? memoryManager.getLastOutput() : memoryManager.getValueAtAddress(0);
	}
}
