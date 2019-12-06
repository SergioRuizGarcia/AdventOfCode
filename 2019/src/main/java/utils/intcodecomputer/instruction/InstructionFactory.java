package utils.intcodecomputer.instruction;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

import utils.intcodecomputer.OpCode;
import utils.intcodecomputer.ParameterMode;

public class InstructionFactory {
	
	private InstructionFactory() {
		// 
	}
	
	public static Instruction getInstruction(int instruction) {
		return getInstruction(String.valueOf(instruction));
	}
	
	public static Instruction getInstruction(String instruction) {
		final boolean hasParameterModes = instruction.length() > 2;
		OpCode opCode = OpCode.fromCode(
							Integer.parseInt(
								hasParameterModes 
									? instruction.substring(instruction.length() - 2)
									: instruction));

		final Deque<ParameterMode> parameterModesDeque = new ArrayDeque<>();
		if (hasParameterModes) {
			String[] splitInstruction = instruction.substring(0, instruction.length()-2).split("");
			for (int i = 0; i < splitInstruction.length; i++) {
				parameterModesDeque.push(ParameterMode.fromCode(splitInstruction[i]));
			}
		}
		
		if (OpCode.ADDITION == opCode) {
			return new AdditionInstruction(parameterModesDeque);
		} else if (OpCode.MULTIPLICATION == opCode) {
			return new MultiplicationInstruction(parameterModesDeque);
		} else if (OpCode.HALT == opCode) {
			return new HaltInstruction();
		} else if (OpCode.INPUT == opCode) {
			return new InputInstruction();
		} else if (OpCode.OUTPUT == opCode) {
			return new OutputInstruction(parameterModesDeque);
		} else if (OpCode.JUMP_IF_TRUE == opCode) {
			return new JumpIfTrueInstruction(parameterModesDeque);
		} else if (OpCode.JUMP_IF_FALSE == opCode) {
			return new JumpIfFalseInstruction(parameterModesDeque);
		} else if (OpCode.LESS_THAN == opCode) {
			return new LessThanInstruction(parameterModesDeque);
		} else if (OpCode.EQUALS == opCode) {
			return new EqualsInstruction(parameterModesDeque);
		}  
		throw new UnsupportedOperationException(String.format(
				"The instruction of OpCode %s is not yet "
				+ "implemented", opCode.name()));
	}
}
