package day4;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import utils.FileUtils;

public class Solution01 {
	
	public static void main(String[] args) throws IOException {
		List<String> inputLines = FileUtils.readFromFile("2019/src/main/resources/day4/input_01.txt");
		Integer lowerBound = Integer.valueOf(inputLines.get(0));
		Integer upperBound = Integer.valueOf(inputLines.get(1));
		
		List<Integer> possiblePasswords = new ArrayList<>();
		if (fitsConditions(lowerBound, lowerBound, upperBound)) {
			possiblePasswords.add(lowerBound);
		}
		
		Integer currentNumber = lowerBound;
		while (currentNumber < upperBound) {
			if (fitsConditions(currentNumber, lowerBound, upperBound)) {
				possiblePasswords.add(lowerBound);
				currentNumber = currentNumber + 1;
			} else {
				currentNumber = repeatHighestDigitUntilOnes(currentNumber);
				if (!fitsConditions(currentNumber, lowerBound, upperBound)) {
					// To avoid numbers of the type 123456 which will never
					// get incremented
					currentNumber++;
				}
			}
		}
		
		FileUtils.writeToFile("2019/src/output/day4/output_01.txt", String.valueOf(possiblePasswords.size()));
	}
	
	private static boolean fitsConditions(final Integer number, final Integer lowerBound, final Integer upperBound) {
		boolean isSixDigit = number/1000000 == 0 && number/100000 != 0;
		boolean isWithinRange = lowerBound <= number && number <= upperBound;
		
		boolean areTwoAdjacentSame = false;
		int tmpNumber = number;
		while (tmpNumber > 0) {
			areTwoAdjacentSame |= tmpNumber%10 == tmpNumber/10%10;
			tmpNumber /= 10;
		}
		
		boolean doesNotDecrease = true;
		tmpNumber = number;
		while (tmpNumber > 0) {
			doesNotDecrease &= tmpNumber%10 >= tmpNumber/10%10;
			tmpNumber /= 10;
		}
		
		return isSixDigit && isWithinRange && areTwoAdjacentSame && doesNotDecrease;
	}
	
	private static Integer repeatHighestDigitUntilOnes(final Integer number) {
		Integer tmpNumber = number;
		
		// We're going to loop over the number from left to right using integer divisions
		int numberOfDigits = 5;
		while (numberOfDigits > 0) {
			int numberLeft = (int) (Double.valueOf(tmpNumber)/Math.pow(10, numberOfDigits))%10;
			int numberRight = (int) (Double.valueOf(tmpNumber)/Math.pow(10, numberOfDigits-1d))%10;
			if (numberLeft > numberRight) {
				tmpNumber = (int) (Double.valueOf(tmpNumber)/Math.pow(10, numberOfDigits));
				break;
			} else {
				numberOfDigits--;
			}
		}
		
		Integer lastHighestNumber = tmpNumber%10;
		
		while(numberOfDigits > 0) {
			tmpNumber = tmpNumber * 10 + lastHighestNumber;
			numberOfDigits--;
		}
		
		return tmpNumber;
	}
}
