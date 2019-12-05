package utils.intcodecomputer;

public class MemoryManager {
	private final int[] memory;
	private int instructionPointer;
	
	public MemoryManager(final int[] memory) {
		this.memory = new int[memory.length];
		System.arraycopy(memory, 0, this.memory, 0, memory.length);
		instructionPointer = 0;
	}
	
	public int getValueAtAddress(int address) {
		checkValidAddress(address);
		return memory[address];
	}
	
	public void advancePointer(int amount) {
		checkValidAddress(instructionPointer + amount);
		instructionPointer += amount;
	}
	
	public int getNextElement() {
		checkValidAddress(instructionPointer);
		return memory[instructionPointer++];
	}
	
	private void checkValidAddress(int address) {
		if (address > memory.length-1 || address < 0) {
			throw new IllegalArgumentException(String.format("The value requested is out of the maximum range permitted (0 - %d)", memory.length-1));
		}
	}
}
