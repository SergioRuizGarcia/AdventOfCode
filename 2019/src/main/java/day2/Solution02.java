package day2;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import utils.FileUtils;
import utils.IntcodeComputer;

public class Solution02 {
	
	public static void main(String[] args) throws IOException {
		List<String> inputLines = FileUtils.readFromFile("src/main/resources/day2/input_02.txt");
		int noun = 0;
		int verb = 0;
		
		int[] initialMemoryState = Arrays.asList(inputLines.get(0).split(",")).stream().mapToInt(Integer::valueOf).toArray();
		int targetValue = 19690720;
		
		for (int i = 0; i < 100; i++) {
			for (int j = 0; j < 100; j++) {
				if (IntcodeComputer.executeProgram(initialMemoryState, i, j) == targetValue) {
					noun = i;
					verb = j;
					break;
				}
			}
		}
		
		FileUtils.writeToFile("src/output/day2/output_02.txt", String.valueOf(noun * 100 + verb));
	}
}
