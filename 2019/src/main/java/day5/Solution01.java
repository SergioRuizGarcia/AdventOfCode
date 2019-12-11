package day5;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import utils.FileUtils;
import utils.intcodecomputer.IntcodeComputer;

public class Solution01 {
	
	public static void main(String[] args) throws IOException {
		List<String> inputLines = FileUtils.readFromFile("2019/src/main/resources/day5/input_01.txt");
		
		int[] initialMemory = Arrays.asList(inputLines.get(0).split(",")).stream().mapToInt(Integer::valueOf).toArray();
		int argument = 1;
		IntcodeComputer intcodeComputer = new IntcodeComputer(initialMemory);
		intcodeComputer.executeProgram(argument);
		for (int output : intcodeComputer.getOutputs()) {
			System.out.println(output);
		}
		
	}
}
