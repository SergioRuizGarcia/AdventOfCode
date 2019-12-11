package utils.intcodecomputer;


public class MemoryManager {
	private final int[] memory;
	private int instructionPointer;
	private int output;
	
	public MemoryManager(final int[] memory) {
		this.memory = new int[memory.length * 4];
		System.arraycopy(memory, 0, this.memory, 0, memory.length);
		instructionPointer = 0;
		output = Integer.MIN_VALUE;
	}
	
	public int getValueAtAddress(int address) {
		checkValidAddress(address);
		return memory[address];
	}
	
	public void advancePointer(int amount) {
		checkValidAddress(instructionPointer + amount);
		instructionPointer += amount;
	}
	
	public void setInstructionPointer(int newAddress) {
		checkValidAddress(newAddress);
		instructionPointer = newAddress;
	}
	
	public void resetInstructionPointer() {
		setInstructionPointer(0);
	}
	
	public int getNextElement() {
		checkValidAddress(instructionPointer);
		int nextElement = memory[instructionPointer];
		advancePointer(1);
		return nextElement;
	}
	
	public int[] getNextNElements(int nElements) {
		checkValidAddress(instructionPointer + nElements);
		int[] nextNElements = new int[nElements];
		System.arraycopy(memory, instructionPointer, nextNElements, 0, nElements);
		advancePointer(nElements);
		return nextNElements;
	}
	
	public void writeToAddress(int address, int value) {
		checkValidAddress(address);
		memory[address] = value;
	}
	
	public boolean hasMoreToRead() {
		return instructionPointer < memory.length;
	}
	
	public boolean hasOutputs() {
		return output != Integer.MIN_VALUE;
	}
	
	public void writeOutput(int output) {
		this.output = output;
		System.out.println(output);
	}
	
	public int getOutput() {
		return output;
	}
	
	private void checkValidAddress(int address) {
		if (address > memory.length-1 || address < 0) {
			throw new IllegalArgumentException(String.format("The value requested (%d) is out of the maximum range permitted (0 - %d)", address, memory.length-1));
		}
	}
}
