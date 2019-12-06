package utils.intcodecomputer.instruction;

import java.util.Deque;

import utils.intcodecomputer.MemoryManager;
import utils.intcodecomputer.OpCode;
import utils.intcodecomputer.ParameterMode;

public interface Instruction {
	void operate(MemoryManager memoryManager, int... input);
	
	OpCode getOpCode();
	
	default Instruction using(Deque<ParameterMode> parameterModes) {
		return this;
	}
	
	default boolean hasArguments() {
		return false;
	}
	
	default void checkArguments(int... input) {
		if (input.length != 0) {
			throw new IllegalArgumentException("This instruction does not take any argument");
		}
	}
}
