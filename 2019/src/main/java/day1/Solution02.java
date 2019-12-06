package day1;

import java.io.IOException;
import java.util.List;

import utils.FileUtils;

public class Solution02 {
	
	private static int getFuelForLoad(final int load) {
		if (load <= 6) {
			return 0;
		}
		final int fuelForLoad = load/3-2;
		return fuelForLoad + getFuelForLoad(fuelForLoad);
	}
	
	public static void main(String[] args) throws IOException {
		List<String> inputLines = FileUtils.readFromFile("2019/src/main/resources/day1/input_02.txt");
		int fuel = 0;
		for (String line : inputLines) {
			fuel += getFuelForLoad(Integer.valueOf(line));
		}
		FileUtils.writeToFile("2019/src/output/day1/output_02.txt", String.valueOf(fuel));
	}
}
