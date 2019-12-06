package utils.intcodecomputer.instruction;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
		List<ParameterMode> parameterModes = new ArrayList<>();
		if (hasParameterModes) {
			String[] splitInstruction = instruction.substring(0, instruction.length()-2).split("");
			for (int i = 0; i < splitInstruction.length; i++) {
				parameterModes.add(ParameterMode.fromCode(splitInstruction[i]));
			}
		}
		
		if (OpCode.ADDITION == opCode) {
			return new AdditionInstruction(parameterModes.toArray(new ParameterMode[0]));
		} else if (OpCode.MULTIPLICATION == opCode) {
			return new MultiplicationInstruction(parameterModes.toArray(new ParameterMode[0]));
		} else if (OpCode.HALT == opCode) {
			return new HaltInstruction();
		}  else if (OpCode.INPUT == opCode) {
			return new InputInstruction();
		} else if (OpCode.OUTPUT == opCode) {
			return new OutputInstruction(parameterModes.toArray(new ParameterMode[0]));
		} else if (OpCode.JUMP_IF_TRUE == opCode) {
			return new JumpIfTrueInstruction(parameterModes.toArray(new ParameterMode[0]));
		} else if (OpCode.JUMP_IF_FALSE == opCode) {
			return new JumpIfFalseInstruction(parameterModes.toArray(new ParameterMode[0]));
		}  else if (OpCode.LESS_THAN == opCode) {
			return new LessThanInstruction(parameterModes.toArray(new ParameterMode[0]));
		}  else if (OpCode.EQUALS == opCode) {
			return new EqualsInstruction(parameterModes.toArray(new ParameterMode[0]));
		}  
		throw new UnsupportedOperationException(String.format(
				"The instruction of OpCode %s is not yet "
				+ "implemented", opCode.name()));
	}
}
