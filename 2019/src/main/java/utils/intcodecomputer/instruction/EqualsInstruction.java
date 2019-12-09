package utils.intcodecomputer.instruction;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Optional;

import utils.intcodecomputer.MemoryManager;
import utils.intcodecomputer.OpCode;
import utils.intcodecomputer.ParameterMode;

public class EqualsInstruction implements Instruction {
	
	private static final int NUMBER_OF_PARAMETERS = 3;

	private final Deque<ParameterMode> parameterModes = new ArrayDeque<>();
	private MemoryManager memoryManager;
	
	@Override
	public Instruction using(Deque<ParameterMode> parameterModes) {
		this.parameterModes.addAll(parameterModes);
		return this;
	}
	
	@Override
	public Instruction using(MemoryManager memoryManager) {
		this.memoryManager = memoryManager;
		return this;
	}
	
	@Override
	public void operate(Deque<Integer> input) {
		
		int[] parameters = memoryManager.getNextNElements(NUMBER_OF_PARAMETERS);
		for (int i = 0; i < NUMBER_OF_PARAMETERS - 1; i++) {
			if (ParameterMode.POSITION_MODE.equals(Optional.ofNullable(parameterModes.poll()).orElse(ParameterMode.POSITION_MODE))) {
				parameters[i] = memoryManager.getValueAtAddress(parameters[i]);
			}
		}

		if (parameters[0] == parameters[1]) {
			memoryManager.writeToAddress(parameters[2], 1);
		} else {
			memoryManager.writeToAddress(parameters[2], 0);
		}
	}

	@Override
	public OpCode getOpCode() {
		return OpCode.EQUALS;
	}

}
