package day3;

import java.lang.Math;

public class Point {
	private int x;
	private int y;
	
	public Point(final int x, final int y) {
		this.x = x;
		this.y = y;
	}
	
	public static Point from(Point p) {
		return new Point(p.x, p.y);
	}
	
	public Point moving(final String movement) {
		final String direction = movement.substring(0, 1);
		final int amount = Integer.parseInt(movement.substring(1));
		Point newPoint;
		switch (direction) {
			case "U" :
				newPoint = new Point(x, y + amount);
				break;
			case "D" :
				newPoint = new Point(x, y - amount);
				break;
			case "R" :
				newPoint = new Point(x + amount, y);
				break;
			case "L" :
				newPoint = new Point(x - amount, y);
				break;
			default:
				throw new IllegalArgumentException("The first character of the movement must be a valid direction (U, D, R, L)");
		}
		return newPoint;
	}
	
	public int getX() {
		return x;
	}
	
	public int getY() {
		return y;
	}
	
	public int manhattanDistanceTo(Point p) {
		return Math.abs(p.getX() - getX()) + Math.abs(p.getY() - getY());
	}
	
	@Override
	public boolean equals(Object otherPoint) {
		if (!(otherPoint instanceof Point)) {
			return false;
		}
		Point casted = (Point) otherPoint;
		return x == casted.x && y == casted.y;
	}
	
	@Override
	public int hashCode() {
		return x * y;
	}
}
