package day7;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import utils.FileUtils;
import utils.Permutations;
import utils.intcodecomputer.IntcodeComputer;

public class Solution01 {
	
	public static void main(String[] args) throws IOException {
		List<String> inputLines = FileUtils.readFromFile("2019/src/main/resources/day7/input_01.txt");
		
		int[] thrusterProgram = Arrays.asList(inputLines.get(0).split(",")).stream().mapToInt(Integer::valueOf).toArray();
		int maxThrust = 0;
		for (String permutation : Permutations.permutations("01234")) {
			IntcodeComputer amp1 = new IntcodeComputer(thrusterProgram);
			IntcodeComputer amp2 = new IntcodeComputer(thrusterProgram);
			IntcodeComputer amp3 = new IntcodeComputer(thrusterProgram);
			IntcodeComputer amp4 = new IntcodeComputer(thrusterProgram);
			IntcodeComputer amp5 = new IntcodeComputer(thrusterProgram);
			int[] phases = Arrays.asList(permutation.split("")).stream().mapToInt(Integer::valueOf).toArray();
			amp1.executeProgram(phases[0], 0);
			int firstAmplificatorOutput = amp1.getProgramOutput();
			amp2.executeProgram(phases[1], firstAmplificatorOutput);
			int secondAmplificatorOutput = amp2.getProgramOutput();
			amp3.executeProgram(phases[2], secondAmplificatorOutput);
			int thirdAmplificatorOutput = amp3.getProgramOutput();
			amp4.executeProgram(phases[3], thirdAmplificatorOutput);
			int fourthAmplificatorOutput = amp4.getProgramOutput();
			amp5.executeProgram(phases[4], fourthAmplificatorOutput);
			maxThrust = Math.max(maxThrust, amp5.getProgramOutput());
		}
		
		
		FileUtils.writeToFile("2019/src/output/day7/output_01.txt", maxThrust);
	}
}
