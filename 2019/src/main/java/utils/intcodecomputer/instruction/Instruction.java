package utils.intcodecomputer.instruction;

import utils.intcodecomputer.MemoryManager;
import utils.intcodecomputer.OpCode;

public interface Instruction {
	void operate(MemoryManager memoryManager);
	
	OpCode getOpCode();
}
