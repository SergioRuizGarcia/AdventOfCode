package utils.intcodecomputer.instruction;

import java.util.ArrayDeque;
import java.util.Deque;

import utils.intcodecomputer.MemoryManager;
import utils.intcodecomputer.OpCode;
import utils.intcodecomputer.ParameterMode;

public class OutputInstruction implements Instruction {

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
		int parameter = memoryManager.getNextElement();
		memoryManager.writeOutput(memoryManager.getValueAtAddress(parameter));
	}

	@Override
	public OpCode getOpCode() {
		return OpCode.OUTPUT;
	}

}
