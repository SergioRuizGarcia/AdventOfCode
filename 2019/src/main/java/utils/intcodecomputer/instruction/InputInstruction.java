package utils.intcodecomputer.instruction;

import utils.intcodecomputer.MemoryManager;
import utils.intcodecomputer.OpCode;
import utils.intcodecomputer.ParameterMode;

public class InputInstruction implements Instruction {

	public InputInstruction(ParameterMode... parameterModes) {
		if (parameterModes.length != 0) {
			throw new IllegalArgumentException("This instruction does not have a parameter mode");
		}
	}
	
	@Override
	public boolean hasArguments() {
		return true;
	}
	
	@Override
	public void checkArguments(int... input) {
		if (input.length != 1) {
			throw new IllegalArgumentException("You must use this instruction with just one parameter as input");
		}
	}
	
	@Override
	public void operate(MemoryManager memoryManager, int... input) {
		checkArguments(input);
		
		int parameter = memoryManager.getNextElement();
		memoryManager.writeToAddress(parameter, input[0]);
	}

	@Override
	public OpCode getOpCode() {
		return OpCode.INPUT;
	}

}
