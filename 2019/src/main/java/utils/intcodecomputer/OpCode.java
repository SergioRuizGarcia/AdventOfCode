package utils.intcodecomputer;

import utils.intcodecomputer.OpCode;

public enum OpCode {
	
	ADDITION(1),
	MULTIPLICATION(2),
	INPUT(3),
	OUTPUT(4),
	JUMP_IF_TRUE(5),
	JUMP_IF_FALSE(6),
	LESS_THAN(7),
	EQUALS(8),
	HALT(99);
	
	private int code;
	
	private OpCode(final int code) {
		this.code = code;
	}
	
	public static OpCode fromCode(int code) {
		for (OpCode opCode : values()) {
			if (opCode.code == code) {
				return opCode;
			}
		}
		throw new IllegalArgumentException("The code provided isn't recognized. Something went wrong");	
	}
}