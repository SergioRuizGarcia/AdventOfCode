package utils.intcodecomputer.instruction;

import java.util.Deque;

import utils.intcodecomputer.OpCode;

public class HaltInstruction implements Instruction {

	public HaltInstruction() {
		// Nothing to initialize, we create an objet just to keep consistency between implementations
	}
	
	@Override
	public void operate(Deque<Integer> input) {
		throw new UnsupportedOperationException("This instruction does not operate on memory");
	}

	@Override
	public OpCode getOpCode() {
		return OpCode.HALT;
	}

}
