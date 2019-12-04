package day3;

/**
 * This class represents only a simple segment, one that is either horizontal or vertical
 * 
 * @author sruizgarcia
 *
 */
public class SimpleSegment {

	private final Point point1;

	private final Point point2;
	
	public SimpleSegment(Point point1, Point point2) {
		if (point1.getX() != point2.getX() && point1.getY() != point2.getY()) {
			throw new IllegalArgumentException("The two points provided do not define a vertical or horizontal line");
		}
		this.point1 = point1;
		this.point2 = point2;
	}
	
	public boolean isVertical() {
		return point1.getX() == point2.getX();
	}
	
	public boolean isHorizontal() {
		return point1.getY() == point2.getY();
	}
	
	public boolean intersects(SimpleSegment otherSegment) {
		if (isVertical() && otherSegment.isVertical() || isHorizontal() && otherSegment.isHorizontal()) {
			// No colinearity admitted
			return false;
		}
		
		Point potentialIntersection = getIntersectionPointWith(otherSegment);
		
		return contains(potentialIntersection) && otherSegment.contains(potentialIntersection);
	}
	
	public Point getIntersectionPointWith(SimpleSegment otherSegment) {
		if (isVertical()) {
			return new Point(point1.getX(), otherSegment.point1.getY());
		}
		return new Point(otherSegment.point1.getX(), point1.getY());
	}
	
	public boolean contains(Point point) {
		int minX = Math.min(point1.getX(), point2.getX());
		int minY = Math.min(point1.getY(), point2.getY());
		int maxX = Math.max(point1.getX(), point2.getX());
		int maxY = Math.max(point1.getY(), point2.getY());
		return point.getX() >= minX && point.getX() <= maxX && point.getY() >= minY && point.getY() <= maxY;
	}
	
	public int length() {
		return manhattanDistanceFromStartingPointTo(point2);
	}
	
	public int manhattanDistanceFromStartingPointTo(Point point) {
		return point1.manhattanDistanceTo(point);
	}
}
