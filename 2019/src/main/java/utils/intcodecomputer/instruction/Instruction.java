package utils.intcodecomputer.instruction;

import java.util.Deque;

import utils.intcodecomputer.MemoryManager;
import utils.intcodecomputer.OpCode;
import utils.intcodecomputer.ParameterMode;

public interface Instruction {
	void operate(Deque<Integer> input);
	
	OpCode getOpCode();
	
	default Instruction using(Deque<ParameterMode> parameterModes) {
		return this;
	}
	
	default Instruction using(MemoryManager memoryManager) {
		return this;
	}
	
}
