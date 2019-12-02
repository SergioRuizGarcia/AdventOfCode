package utils;

public class IntcodeComputer {
	public static int executeProgram(int[] initialMemory, int noun, int verb) {
		int[] memory = new int[initialMemory.length];
		System.arraycopy(initialMemory, 0, memory, 0, initialMemory.length);
		
		memory[1] = noun;
		memory[2] = verb;
		
		int instructionPointer = 0;
		while (instructionPointer <= memory.length - 5) {
			OpCode operation = OpCode.fromCode(memory[instructionPointer]);
			if (operation == OpCode.HALT) {
				break;
			}
			int parameter1Address = memory[instructionPointer + 1];
			int parameter2Address = memory[instructionPointer + 2];
			int destinationAddress = memory[instructionPointer + 3];
			memory[destinationAddress] = operation.operate(memory[parameter1Address], memory[parameter2Address]);
			instructionPointer += 4;
		}
		return memory[0];
	}
}
