package day3;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import utils.FileUtils;

public class Solution {
	
	public static void main(String[] args) throws IOException {
		List<String> inputLines = FileUtils.readFromFile("src/main/resources/day3/input_01.txt");
		String[] wire1Movements = inputLines.get(0).split(",");
		String[] wire2Movements = inputLines.get(1).split(",");
		Point centralPort = new Point(0, 0);
		
		List<SimpleSegment> segmentsWire1 = getSegmentFromPointWithMovements(centralPort, wire1Movements);
		List<SimpleSegment> segmentsWire2 = getSegmentFromPointWithMovements(centralPort, wire2Movements);
		
		List<Point> intersectionPoints = new ArrayList<>();
		int minStepsFromCentralPort = Integer.MAX_VALUE;
		
		int runningDistanceWire1 = 0;
		for (int i = 0; i < segmentsWire1.size(); i++) {
			int runningDistanceWire2 = 0;
			for (int j = 0; j < segmentsWire2.size(); j++) {
				if (i == 0 && j == 0) {
					// The starting point shouldn't count towards the intersections
					runningDistanceWire2 += segmentsWire2.get(j).length();
					continue;
				}
				if (segmentsWire1.get(i).intersects(segmentsWire2.get(j))) {
					Point intersectionPoint = segmentsWire1.get(i).getIntersectionPointWith(segmentsWire2.get(j));
					intersectionPoints.add(intersectionPoint);
					int stepsFromCentralPort = runningDistanceWire1 + 
											   runningDistanceWire2 + 
											   segmentsWire1.get(i).manhattanDistanceFromStartingPointTo(intersectionPoint) + 
											   segmentsWire2.get(j).manhattanDistanceFromStartingPointTo(intersectionPoint);
					if (stepsFromCentralPort < minStepsFromCentralPort) {
						minStepsFromCentralPort = stepsFromCentralPort;
					}
				}
				runningDistanceWire2 += segmentsWire2.get(j).length();
			}
			runningDistanceWire1 += segmentsWire1.get(i).length();
		}
		
		int minDistanceToCentralPort = Integer.MAX_VALUE;
		for (Point intersectionPoint : intersectionPoints) {
			if (intersectionPoint.manhattanDistanceTo(centralPort) < minDistanceToCentralPort) {
				minDistanceToCentralPort = intersectionPoint.manhattanDistanceTo(centralPort);
			}
			
		}
		
		FileUtils.writeToFile("src/output/day3/output_01.txt", String.valueOf(minDistanceToCentralPort));
		FileUtils.writeToFile("src/output/day3/output_02.txt", String.valueOf(minStepsFromCentralPort));
	}
	
	private static List<SimpleSegment> getSegmentFromPointWithMovements(final Point startingPoint, final String[] movements) {
		List<SimpleSegment> segments = new ArrayList<>();
		Point firstPointSegment = Point.from(startingPoint);
		for (String movement : movements) {
			Point secondPointSegment = firstPointSegment.moving(movement);
			SimpleSegment segment = new SimpleSegment(firstPointSegment, secondPointSegment);
			segments.add(segment);
			firstPointSegment = secondPointSegment; 
		}
		return segments;
	}
}
