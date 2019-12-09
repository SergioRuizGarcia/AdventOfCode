package day7;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import utils.FileUtils;
import utils.intcodecomputer.IntcodeComputer;

public class Solution01 {
	
	public static void main(String[] args) throws IOException {
		List<String> inputLines = FileUtils.readFromFile("2019/src/main/resources/day7/input_01.txt");
		
		int[] thrusterProgram = Arrays.asList(inputLines.get(0).split(",")).stream().mapToInt(Integer::valueOf).toArray();
		int maxThrust = 0;
		for (String permutation : permutations("01234")) {
			int[] phases = Arrays.asList(permutation.split("")).stream().mapToInt(Integer::valueOf).toArray();
			int firstAmplificatorOutput = IntcodeComputer.executeProgram(thrusterProgram, phases[0], 0);
			int secondAmplificatorOutput = IntcodeComputer.executeProgram(thrusterProgram, phases[1], firstAmplificatorOutput);
			int thirdAmplificatorOutput = IntcodeComputer.executeProgram(thrusterProgram, phases[2], secondAmplificatorOutput);
			int fourthAmplificatorOutput = IntcodeComputer.executeProgram(thrusterProgram, phases[3], thirdAmplificatorOutput);
			int fifthAmplificatorOutput = IntcodeComputer.executeProgram(thrusterProgram, phases[4], fourthAmplificatorOutput);
			maxThrust = Math.max(maxThrust, fifthAmplificatorOutput);
		}
		
		
		FileUtils.writeToFile("2019/src/output/day7/output_01.txt", maxThrust);
	}
	
	// see https://stackoverflow.com/questions/4240080/generating-all-permutations-of-a-given-string
	public static List<String> permutations(String s) {
	    // The result
	    List<String> res = new ArrayList<String>();
	    // If input string's length is 1, return {s}
	    if (s.length() == 1) {
	        res.add(s);
	    } else if (s.length() > 1) {
	        int lastIndex = s.length() - 1;
	        // Find out the last character
	        String last = s.substring(lastIndex);
	        // Rest of the string
	        String rest = s.substring(0, lastIndex);
	        // Perform permutation on the rest string and
	        // merge with the last character
	        res = merge(permutations(rest), last);
	    }
	    return res;
	}

	/**
	 * @param list a result of permutation, e.g. {"ab", "ba"}
	 * @param c    the last character
	 * @return     a merged new list, e.g. {"cab", "acb" ... }
	 */
	public static List<String> merge(List<String> list, String c) {
	    List<String> res = new ArrayList<>();
	    // Loop through all the string in the list
	    for (String s : list) {
	        // For each string, insert the last character to all possible positions
	        // and add them to the new list
	        for (int i = 0; i <= s.length(); ++i) {
	            String ps = new StringBuffer(s).insert(i, c).toString();
	            res.add(ps);
	        }
	    }
	    return res;
	}
}
