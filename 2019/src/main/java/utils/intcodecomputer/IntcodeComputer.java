package utils.intcodecomputer;

import java.util.ArrayDeque;
import java.util.Deque;

import utils.intcodecomputer.instruction.Instruction;
import utils.intcodecomputer.instruction.InstructionFactory;

public class IntcodeComputer {
	
	private MemoryManager memoryManager;
	
	public IntcodeComputer(int[] initialMemory) {
		memoryManager = new MemoryManager(initialMemory);
	}

	public int getProgramOutput() {
		return memoryManager.hasOutputs() ? memoryManager.getLastOutput() : memoryManager.getValueAtAddress(0);
	}
	
	public int[] getOutputs() {
		return memoryManager.getOutputs();
	}
	
	public void executeProgram(int... args) {
		final Deque<Integer> arguments = new ArrayDeque<>();
		for (int i = 0; i < args.length; i++) {
			arguments.offer(args[i]);
		}
		
		while(memoryManager.hasMoreToRead()) {
			InstructionFactory instructionFactory = new InstructionFactory();
			Instruction instruction = instructionFactory.getNextInstruction(memoryManager.getNextElement());
			if (instruction.getOpCode() == OpCode.HALT) {
				break;
			}
			
			instruction.using(memoryManager).operate(arguments);
		}
	}
}
