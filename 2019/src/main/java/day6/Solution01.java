package day6;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import utils.FileUtils;
import utils.Tree;

public class Solution01 {
	
	public static void main(String[] args) throws IOException {
		List<String[]> inputLines = FileUtils.readFromFile("2019/src/main/resources/day6/input_01.txt") //
				.stream() //
				.map(line -> line.split("\\)")) //
				.collect(Collectors.toList());
		
		Map<String, List<String>> orbitHierarchy = new HashMap<>();
		for (String[] line : inputLines) {
			orbitHierarchy.putIfAbsent(line[0], new ArrayList<>());
			orbitHierarchy.get(line[0]).add(line[1]);
		}
		Tree<String> tree = new Tree<String>("COM").buildTree(orbitHierarchy);
		FileUtils.writeToFile("2019/src/output/day6/output_01.txt", tree.getCumulativeDepth());
	}
}
