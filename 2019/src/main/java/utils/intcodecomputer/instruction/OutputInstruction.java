package utils.intcodecomputer.instruction;

import java.util.ArrayDeque;
import java.util.Deque;

import utils.intcodecomputer.MemoryManager;
import utils.intcodecomputer.OpCode;
import utils.intcodecomputer.ParameterMode;

public class OutputInstruction implements Instruction {

	private final Deque<ParameterMode> parameterModes = new ArrayDeque<>();
	
	public OutputInstruction(ParameterMode... parameterModes) {
		for (ParameterMode parameterMode : parameterModes) {
			this.parameterModes.push(parameterMode);
		}
	}
	
	@Override
	public void operate(MemoryManager memoryManager, int... input) {
		checkArguments(input);
		
		int parameter = memoryManager.getNextElement();
		
		System.out.println(memoryManager.getValueAtAddress(parameter));
	}

	@Override
	public OpCode getOpCode() {
		return OpCode.OUTPUT;
	}

}
