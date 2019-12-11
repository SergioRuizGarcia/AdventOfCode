package day8;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import utils.FileUtils;

public class Solution02 {
	
	private static int WIDTH = 25;
	private static int HEIGHT = 6;
	
	public static void main(String[] args) throws IOException {
		List<String> inputLines = FileUtils.readFromFile("2019/src/main/resources/day8/input_02.txt");
		
		int[] image = Arrays.asList(inputLines.get(0).split("")).stream().mapToInt(Integer::valueOf).toArray();
		List<ImageLayer> layers = new ArrayList<>();
		
		int[] finalImage = new int[WIDTH*HEIGHT];
		Arrays.fill(finalImage, -1);
		for (int i = 0; i < image.length; i++) {
			int pixelValue = image[i];
			if (finalImage[i%(WIDTH*HEIGHT)] != 0 && finalImage[i%(WIDTH*HEIGHT)] != 1) {
				finalImage[i%(WIDTH*HEIGHT)] = pixelValue;
			}
		}

		final StringBuilder output = new StringBuilder("");
		for (int i = WIDTH-1; i >= 0; i--) {
			for (int j = HEIGHT-1; j >= 0; j--) {
				if (finalImage[WIDTH * j + i] == 0) { 
					output.append(' ');
				} else {
					output.append('\u2588');
				}
			}
			output.append("\n");
		}
		
		FileUtils.writeToFile("2019/src/output/day8/output_02.txt", output.toString());
	}
}
