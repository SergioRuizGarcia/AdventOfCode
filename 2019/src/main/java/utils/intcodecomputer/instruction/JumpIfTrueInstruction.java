package utils.intcodecomputer.instruction;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Optional;

import utils.intcodecomputer.MemoryManager;
import utils.intcodecomputer.OpCode;
import utils.intcodecomputer.ParameterMode;

public class JumpIfTrueInstruction implements Instruction {
	
	private static final int NUMBER_OF_PARAMETERS = 2;
	private MemoryManager memoryManager;

	private final Deque<ParameterMode> parameterModes = new ArrayDeque<>();
	
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
		for (int i = 0; i < NUMBER_OF_PARAMETERS; i++) {
			if (ParameterMode.POSITION_MODE.equals(Optional.ofNullable(parameterModes.poll()).orElse(ParameterMode.POSITION_MODE))) {
				parameters[i] = memoryManager.getValueAtAddress(parameters[i]);
			}
		}

		if (parameters[0] != 0) {
			memoryManager.setInstructionPointer(parameters[1]);
		}
	}

	@Override
	public OpCode getOpCode() {
		return OpCode.JUMP_IF_TRUE;
	}

}
