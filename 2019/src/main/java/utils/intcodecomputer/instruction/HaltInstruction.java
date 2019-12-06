package utils.intcodecomputer.instruction;

import utils.intcodecomputer.MemoryManager;
import utils.intcodecomputer.OpCode;

public class HaltInstruction implements Instruction {

	public HaltInstruction() {
		// Nothing to initialize, we create an objet just to keep consistency between implementations
	}
	
	@Override
	public void operate(MemoryManager memoryManager, int... input) {
		throw new UnsupportedOperationException("This instruction does not operate on memory");
	}

	@Override
	public OpCode getOpCode() {
		return OpCode.HALT;
	}

}
