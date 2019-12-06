package day1;

import java.io.IOException;
import java.util.List;

import utils.FileUtils;

public class Solution01 {
	
	public static void main(String[] args) throws IOException {
		List<String> inputLines = FileUtils.readFromFile("2019/src/main/resources/day1/input_01.txt");
		int fuel = 0;
		for (String line : inputLines) {
			fuel += Integer.valueOf(line)/3 - 2;
		}
		FileUtils.writeToFile("2019/src/output/day1/output_01.txt", String.valueOf(fuel));
	}
}
