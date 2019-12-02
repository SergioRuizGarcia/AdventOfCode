package utils;

import java.util.List;
import java.util.ArrayList;
import java.io.File;
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.FileNotFoundException;


public class FileUtils {

	private FileUtils() {	
		// Not meant to be instantiated
	}

	public static List<String> readFromFile(final String inputPath) throws IOException {
		final File inputFile = new File(inputPath);
		if (!inputFile.exists() || !inputFile.isFile()) {
			throw new FileNotFoundException("File does not exist or is not a file");
		}
		final List<String> inputLines = new ArrayList<>();
		try (final BufferedReader br = new BufferedReader(new FileReader(inputFile))) {
			String line;
			while ((line = br.readLine()) != null) {
				inputLines.add(line);
			}
			return inputLines;
		} catch (Exception e) {
			throw new IOException("Error while reading from a stream of the file " + inputPath, e);
		}
	}
	
	public static void writeToFile(final String outputPath, final String content) throws IOException {
		final File outputFile = new File(outputPath);
		outputFile.getParentFile().mkdirs();
		try (final BufferedWriter bw = new BufferedWriter(new FileWriter(outputPath))) {
			bw.write(content, 0, content.length());
		} catch (Exception e) {
			throw new IOException("Error while writing to a stream of the file " + outputPath, e);
		}
	}
}