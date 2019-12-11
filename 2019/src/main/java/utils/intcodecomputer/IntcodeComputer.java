package utils.intcodecomputer;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Optional;

import utils.intcodecomputer.instruction.Instruction;
import utils.intcodecomputer.instruction.InstructionFactory;

public class IntcodeComputer {
	
	private MemoryManager memoryManager;
	private Optional<Integer> phase = Optional.empty();
	private boolean isHalted = false;
	private boolean exitOnOutput = false;
	
	public IntcodeComputer(int[] initialMemory) {
		memoryManager = new MemoryManager(initialMemory);
	}
	
	public IntcodeComputer withPhase(int inputPhase) {
		phase = Optional.of(inputPhase);
		return this;
	}
	
	public IntcodeComputer setExitOnOutput() {
		exitOnOutput = true;
		return this;
	}
	
	public int getProgramOutput() {
		return memoryManager.hasOutputs() ? memoryManager.getOutput() : memoryManager.getValueAtAddress(0);
	}
	
	public boolean isHalted() {
		return isHalted; 
	}
	
	public void resetComputer() {
		memoryManager.resetInstructionPointer();
		isHalted = false;
	}
	
	public void executeProgram(int... args) {
		final Deque<Integer> arguments = new ArrayDeque<>();
		if (phase.isPresent()) {
			arguments.offer(phase.get());
			phase = Optional.empty();
		}
		
		for (int i = 0; i < args.length; i++) {
			arguments.offer(args[i]);
		}
		
		while(memoryManager.hasMoreToRead() && !isHalted()) {
			InstructionFactory instructionFactory = new InstructionFactory();
			Instruction instruction = instructionFactory.getNextInstruction(memoryManager.getNextElement());
			if (instruction.getOpCode() == OpCode.HALT) {
				isHalted = true;
				return;
			}
			
			instruction.using(memoryManager).operate(arguments);
			
			if (exitOnOutput && instruction.getOpCode() == OpCode.OUTPUT) {
				break;
			}
		}
	}
}
