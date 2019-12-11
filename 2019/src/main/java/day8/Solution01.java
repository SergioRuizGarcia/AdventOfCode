package day8;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import utils.FileUtils;

public class Solution01 {
	
	private static int WIDTH = 25;
	private static int HEIGHT = 6;
	
	public static void main(String[] args) throws IOException {
		List<String> inputLines = FileUtils.readFromFile("2019/src/main/resources/day8/input_01.txt");
		
		int[] image = Arrays.asList(inputLines.get(0).split("")).stream().mapToInt(Integer::valueOf).toArray();
		List<ImageLayer> layers = new ArrayList<>();
		for (int i = 0; i < image.length - WIDTH * HEIGHT; i+=WIDTH * HEIGHT) {
			layers.add(new ImageLayer(Arrays.copyOfRange(image, i, i + WIDTH * HEIGHT)));
		}
		
		ImageLayer fewest0s = layers.stream() //
								.sorted((first, second) -> {
									if (first.getOccurrencesOfDigit(0) > second.getOccurrencesOfDigit(0)) {
										return 1;
									} else if (first.getOccurrencesOfDigit(0) < second.getOccurrencesOfDigit(0)) {
										return -1;
									}
									return 0;
								}).findFirst().get();
		
		FileUtils.writeToFile("2019/src/output/day8/output_01.txt", fewest0s.getOccurrencesOfDigit(1) * fewest0s.getOccurrencesOfDigit(2));
	}
}
