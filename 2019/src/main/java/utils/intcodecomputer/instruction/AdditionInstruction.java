package utils.intcodecomputer.instruction;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Optional;

import utils.intcodecomputer.MemoryManager;
import utils.intcodecomputer.OpCode;
import utils.intcodecomputer.ParameterMode;

public class AdditionInstruction implements Instruction {

	private static final int NUMBER_OF_PARAMETERS = 3;

	private final Deque<ParameterMode> parameterModes = new ArrayDeque<>();
	
	public AdditionInstruction(ParameterMode... parameterModes) {
		for (ParameterMode parameterMode : parameterModes) {
			this.parameterModes.push(parameterMode);
		}
	}
	
	@Override
	public void operate(MemoryManager memoryManager) {
		int[] parameters = memoryManager.getNextNElements(NUMBER_OF_PARAMETERS);
		for (int i = 0; i < NUMBER_OF_PARAMETERS - 1; i++) {
			if (ParameterMode.POSITION_MODE.equals(Optional.ofNullable(parameterModes.poll()).orElse(ParameterMode.POSITION_MODE))) {
				parameters[i] = memoryManager.getValueAtAddress(parameters[i]);
			}
		}
		int sum = 0;
		for (int i = 0; i < NUMBER_OF_PARAMETERS - 1; i++) {
			sum += parameters[i];
		}
		memoryManager.writeToAddress(parameters[NUMBER_OF_PARAMETERS-1], sum);
	}

	@Override
	public OpCode getOpCode() {
		return OpCode.ADDITION;
	}

}
