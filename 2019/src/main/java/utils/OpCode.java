package utils;

import utils.OpCode;

public enum OpCode {
	
	ADDITION(1) {
		@Override
		public int operate(int operator1, int operator2) {
			return operator1 + operator2;
		}
	},
	MULTIPLICATION(2) {
		@Override
		public int operate(int operator1, int operator2) {
			return operator1 * operator2;
		}
	},
	HALT(99) {
		@Override
		public int operate(int operator1, int operator2) {
			throw new UnsupportedOperationException("This operation does not operate on two memory positions");
		}
	};
	
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
	
	protected abstract int operate(int operator1, int operator2);
}