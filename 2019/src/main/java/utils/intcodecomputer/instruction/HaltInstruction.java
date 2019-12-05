package utils.intcodecomputer.instruction;

import utils.intcodecomputer.MemoryManager;
import utils.intcodecomputer.OpCode;

public class HaltInstruction implements Instruction {

	public HaltInstruction() {
	}
	
	@Override
	public void operate(MemoryManager memoryManager) {
		throw new UnsupportedOperationException("This instruction does not operate on memory");
	}

	@Override
	public OpCode getOpCode() {
		return OpCode.HALT;
	}

}
