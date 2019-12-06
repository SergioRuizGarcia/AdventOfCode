package utils.intcodecomputer.instruction;

import utils.intcodecomputer.MemoryManager;
import utils.intcodecomputer.OpCode;

public interface Instruction {
	void operate(MemoryManager memoryManager, int... input);
	
	OpCode getOpCode();
	
	default boolean hasArguments() {
		return false;
	}
	
	default void checkArguments(int... input) {
		if (input.length != 0) {
			throw new IllegalArgumentException("This instruction does not take any argument");
		}
	}
}
