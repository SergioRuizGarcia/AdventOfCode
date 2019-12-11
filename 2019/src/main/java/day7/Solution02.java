package day7;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import utils.FileUtils;
import utils.Permutations;
import utils.intcodecomputer.IntcodeComputer;

public class Solution02 {
	
	public static void main(String[] args) throws IOException {
		List<String> inputLines = FileUtils.readFromFile("2019/src/main/resources/day7/input_02.txt");
		
		int[] thrusterProgram = Arrays.asList(inputLines.get(0).split(",")).stream().mapToInt(Integer::valueOf).toArray();
		int maxThrust = 0;
		for (String permutation : Permutations.permutations("56789")) {
			int[] phases = Arrays.asList(permutation.split("")).stream().mapToInt(Integer::valueOf).toArray();
			IntcodeComputer amp1 = new IntcodeComputer(thrusterProgram).withPhase(phases[0]).setExitOnOutput();
			IntcodeComputer amp2 = new IntcodeComputer(thrusterProgram).withPhase(phases[1]).setExitOnOutput();
			IntcodeComputer amp3 = new IntcodeComputer(thrusterProgram).withPhase(phases[2]).setExitOnOutput();
			IntcodeComputer amp4 = new IntcodeComputer(thrusterProgram).withPhase(phases[3]).setExitOnOutput();
			IntcodeComputer amp5 = new IntcodeComputer(thrusterProgram).withPhase(phases[4]).setExitOnOutput();
			boolean isAmp1Halted = false;
			boolean isAmp2Halted = false;
			boolean isAmp3Halted = false;
			boolean isAmp4Halted = false;
			boolean isAmp5Halted = false;
			int inputAmp1 = 0;
			while (!isAmp1Halted && !isAmp2Halted && !isAmp3Halted && !isAmp4Halted && !isAmp5Halted) {
				amp1.executeProgram(inputAmp1);
				isAmp1Halted = amp1.isHalted();
				int inputAmp2 = amp1.getProgramOutput();
				amp2.executeProgram(inputAmp2);
				isAmp2Halted = amp2.isHalted();
				int inputAmp3 = amp2.getProgramOutput();
				amp3.executeProgram(inputAmp3);
				isAmp3Halted = amp3.isHalted();
				int inputAmp4 = amp3.getProgramOutput();
				amp4.executeProgram(inputAmp4);
				isAmp4Halted = amp4.isHalted();
				int inputAmp5 = amp4.getProgramOutput();
				amp5.executeProgram(inputAmp5);
				isAmp5Halted = amp5.isHalted();
				inputAmp1 = amp5.getProgramOutput();
			}
			
			maxThrust = Math.max(maxThrust, amp5.getProgramOutput());
		}
		
		
		FileUtils.writeToFile("2019/src/output/day7/output_02.txt", maxThrust);
	}

}
