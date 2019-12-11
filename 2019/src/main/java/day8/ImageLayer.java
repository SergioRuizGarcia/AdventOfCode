package day8;

import java.util.ArrayList;
import java.util.List;

public class ImageLayer {
	private final List<Integer> pixels = new ArrayList<>();
	
	public ImageLayer(int[] inputPixels) {
		for (int pixel : inputPixels) {
			pixels.add(pixel);
		}
	}
	
	public long getOccurrencesOfDigit(final int digit) {
		return pixels.stream().filter(pixel -> pixel == digit).count();
	}
	
	public List<Integer> getPixels() {
		return pixels;
	}
}
