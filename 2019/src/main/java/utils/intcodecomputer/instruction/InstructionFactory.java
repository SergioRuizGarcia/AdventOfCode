package utils.intcodecomputer.instruction;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

import utils.intcodecomputer.OpCode;
import utils.intcodecomputer.ParameterMode;

public class InstructionFactory {
	
	private final Map<OpCode, Instruction> instructions = new HashMap<>();
	{
		instructions.put(OpCode.ADDITION, new AdditionInstruction());
		instructions.put(OpCode.MULTIPLICATION, new MultiplicationInstruction());
		instructions.put(OpCode.HALT, new HaltInstruction());
		instructions.put(OpCode.INPUT, new InputInstruction());
		instructions.put(OpCode.OUTPUT, new OutputInstruction());
		instructions.put(OpCode.JUMP_IF_TRUE, new JumpIfTrueInstruction());
		instructions.put(OpCode.JUMP_IF_FALSE, new JumpIfFalseInstruction());
		instructions.put(OpCode.LESS_THAN, new LessThanInstruction());
		instructions.put(OpCode.EQUALS, new EqualsInstruction());
	}
	
	public InstructionFactory() {
		// 
	}
	
	public Instruction getInstruction(int instruction) {
		return getInstruction(String.valueOf(instruction));
	}
	
	public Instruction getInstruction(String instruction) {
		final boolean hasParameterModes = instruction.length() > 2;
		OpCode opCode = OpCode.fromCode(
							Integer.parseInt(
								hasParameterModes 
									? instruction.substring(instruction.length() - 2)
									: instruction));

		if (!instructions.containsKey(opCode)) {
			throw new UnsupportedOperationException(String.format(
					"The instruction of OpCode %s is not yet "
							+ "implemented", opCode.name()));
			
		}
		
		final Deque<ParameterMode> parameterModes = new ArrayDeque<>();
		if (hasParameterModes) {
			String[] splitInstruction = instruction.substring(0, instruction.length()-2).split("");
			for (int i = 0; i < splitInstruction.length; i++) {
				parameterModes.push(ParameterMode.fromCode(splitInstruction[i]));
			}
		}
		
		return instructions.get(opCode).using(parameterModes);
		
	}
}
