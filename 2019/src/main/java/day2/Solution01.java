package day2;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import utils.FileUtils;
import utils.intcodecomputer.IntcodeComputer;

public class Solution01 {
	
	public static void main(String[] args) throws IOException {
		List<String> inputLines = FileUtils.readFromFile("2019/src/main/resources/day2/input_01.txt");
		
		int[] gravityAssistProgram = Arrays.asList(inputLines.get(0).split(",")).stream().mapToInt(Integer::valueOf).toArray();
		gravityAssistProgram[1] = 12;
		gravityAssistProgram[2] = 2;
		
		FileUtils.writeToFile("2019/src/output/day2/output_01.txt", String.valueOf(IntcodeComputer.executeProgram(gravityAssistProgram)));
	}
}
