package utils.intcodecomputer.instruction;

import java.util.Deque;

import utils.intcodecomputer.MemoryManager;
import utils.intcodecomputer.OpCode;

public class InputInstruction implements Instruction {
	
	private MemoryManager memoryManager;

	@Override
	public Instruction using(MemoryManager memoryManager) {
		this.memoryManager = memoryManager;
		return this;
	}
	
	@Override
	public void operate(Deque<Integer> input) {
		if (input.isEmpty()) {
			throw new IllegalArgumentException("An input instruction takes one argument");
		}
		
		int parameter = memoryManager.getNextElement();
		memoryManager.writeToAddress(parameter, input.poll());
	}

	@Override
	public OpCode getOpCode() {
		return OpCode.INPUT;
	}

}
