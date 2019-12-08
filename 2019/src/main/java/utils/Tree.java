package utils;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class Tree<O extends Object> {
	
	private List<Tree<O>> children = new ArrayList<>();
	private final O node;
	
	public Tree(O root) {
		this.node = root;
	}
	
	/**
	 * @param treeDescriptor A descriptor of the tree, where the key
	 * 						is the parent node and the value is a list 
	 * 						of all of its children
	 * @return the resulting tree
	 */
	public Tree<O> buildTree(Map<O, List<O>> treeDescriptor) {
		List<O> nodeChildren = treeDescriptor.get(node);
		if (nodeChildren == null || nodeChildren.isEmpty()) {
			return this;
		}
		for (O child : nodeChildren) {
			Tree<O> childTree = new Tree<O>(child);
			appendBranch(childTree.buildTree(treeDescriptor));
		}
		
		return this;
	}
	
	private void appendBranch(Tree<O> t) {
		children.add(t);
	}
	
	public O getNode() {
		return node;
	}
	
	/**
	 * @return the cumulative depth of all children nodes to this one
	 */
	public int getCumulativeDepth() {
		return getCumulativeDepth(0);
	}
	
	private int getCumulativeDepth(int nodesDepth) {
		if (children.isEmpty()) {
			return nodesDepth;
		}
		int cumulativeDepth = nodesDepth;
		for (Tree<O> child : children) {
			cumulativeDepth += child.getCumulativeDepth(nodesDepth + 1);
		}
		return cumulativeDepth;
	}
	
	/**
	 * @param targetNode the node to which we search the path
	 * @return linked list representing the path to the target 
	 * 			node from this one
	 */
	public LinkedList<O> getPathToNode(O targetNode) {
		if (node.equals(targetNode)) {
			LinkedList<O> path = new LinkedList<>();
			path.add(node);
			return path;
		}
		for (Tree<O> child : children) {
			LinkedList<O> path = child.getPathToNode(targetNode);
			if (!path.isEmpty()) {
				path.addFirst(this.getNode());
				return path;
			}
		}
		
		return new LinkedList<>();
	}
}
