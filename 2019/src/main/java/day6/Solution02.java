package day6;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import utils.FileUtils;
import utils.Tree;

public class Solution02 {
	
	public static void main(String[] args) throws IOException {
		List<String[]> inputLines = FileUtils.readFromFile("2019/src/main/resources/day6/input_02.txt") //
				.stream() //
				.map(line -> line.split("\\)")) //
				.collect(Collectors.toList());
		
		Map<String, List<String>> orbitHierarchy = new HashMap<>();
		for (String[] line : inputLines) {
			orbitHierarchy.putIfAbsent(line[0], new ArrayList<>());
			orbitHierarchy.get(line[0]).add(line[1]);
		}
		Tree<String> tree = new Tree<String>("COM").buildTree(orbitHierarchy);
		LinkedList<String> pathToYou = tree.getPathToNode("YOU");
		LinkedList<String> pathToSanta = tree.getPathToNode("SAN");
		
		int i = 0;
		for (; i < Math.min(pathToYou.size(), pathToSanta.size()); i++) {
			// We assume both of them will be present
			if (!pathToYou.get(i).equals(pathToSanta.get(i))) {
				break;
			}
		}
		// we remove two times the common path plus the two last jumps
		// (from YOU to the parent node, and from SAN to the parent node)
		FileUtils.writeToFile("2019/src/output/day6/output_02.txt", pathToYou.size() + pathToSanta.size() - 2 * i - 2);
	}
}
