package utils.intcodecomputer.instruction;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

import utils.intcodecomputer.MemoryManager;
import utils.intcodecomputer.OpCode;
import utils.intcodecomputer.ParameterMode;

public class InstructionFactory {
	
	private final Map<OpCode, Class<? extends Instruction>> instructions = new HashMap<>();
	{
		instructions.put(OpCode.ADDITION, AdditionInstruction.class);
		instructions.put(OpCode.MULTIPLICATION, MultiplicationInstruction.class);
		instructions.put(OpCode.HALT, HaltInstruction.class);
		instructions.put(OpCode.INPUT, InputInstruction.class);
		instructions.put(OpCode.OUTPUT, OutputInstruction.class);
		instructions.put(OpCode.JUMP_IF_TRUE, JumpIfTrueInstruction.class);
		instructions.put(OpCode.JUMP_IF_FALSE, JumpIfFalseInstruction.class);
		instructions.put(OpCode.LESS_THAN, LessThanInstruction.class);
		instructions.put(OpCode.EQUALS, EqualsInstruction.class);
	}
	
	private final MemoryManager memoryManager;
	
	public InstructionFactory(MemoryManager memoryManager) {
		this.memoryManager = memoryManager;
	}
	
	public Instruction getNextInstruction() {
		return getInstruction(String.valueOf(memoryManager.getNextElement()));
	}
	
	private Instruction getInstruction(String instructionCode) {
		final boolean hasParameterModes = instructionCode.length() > 2;
		OpCode opCode = OpCode.fromCode(
				Integer.parseInt(
						hasParameterModes 
						? instructionCode.substring(instructionCode.length() - 2)
								: instructionCode));
		
		if (!instructions.containsKey(opCode)) {
			throw new UnsupportedOperationException(String.format(
					"The instruction of OpCode %s is not yet "
							+ "implemented", opCode.name()));
			
		}
		
		final Deque<ParameterMode> parameterModes = new ArrayDeque<>();
		if (hasParameterModes) {
			String[] splitInstruction = instructionCode.substring(0, instructionCode.length()-2).split("");
			for (int i = 0; i < splitInstruction.length; i++) {
				parameterModes.push(ParameterMode.fromCode(splitInstruction[i]));
			}
		}
		
		try {
			Instruction instruction = instructions.get(opCode).newInstance();
			return instruction.using(parameterModes).using(memoryManager);
		} catch (InstantiationException | IllegalAccessException e) {
			throw new RuntimeException("Instantiating the instrution was not possible");
		}
	}
	
}
