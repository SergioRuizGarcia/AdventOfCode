package day2;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import utils.FileUtils;
import utils.IntcodeComputer;

public class Solution01 {
	
	public static void main(String[] args) throws IOException {
		List<String> inputLines = FileUtils.readFromFile("src/main/resources/day2/input_01.txt");
		
		int[] gravityAssistProgram = Arrays.asList(inputLines.get(0).split(",")).stream().mapToInt(Integer::valueOf).toArray();
		
		FileUtils.writeToFile("src/output/day2/output_01.txt", String.valueOf(IntcodeComputer.executeProgram(gravityAssistProgram, 12, 2)));
	}
}
