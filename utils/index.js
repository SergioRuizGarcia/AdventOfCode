const fs = require('fs');

const readLines = (fileName, separator='\n') => {
	return fs.readFileSync(fileName).toString().split(separator).filter(line => line !== '');
};

const dec2bin = (decimal) => {
	return (decimal>>0).toString(2);
};

const bin2dec = (binary) => {
	return parseInt(binary, 2);
};

const binarySearch = (wholeArray, searchedElement, tracedIndex = 0) => {
	if (wholeArray.length === 0) {
		return -1;
	} else if (wholeArray.length === 1) {
		return wholeArray[0] === searchedElement ? tracedIndex : -1;
	}
	
	const midPoint = Math.floor(wholeArray.length / 2);
	
	if (searchedElement < wholeArray[midPoint]) {
		return binarySearch(wholeArray.slice(0, midPoint), searchedElement, tracedIndex);
	} else if (searchedElement > wholeArray[midPoint]) {
		return binarySearch(wholeArray.slice(midPoint, wholeArray.length), searchedElement, tracedIndex + midPoint);
	} else {
		return wholeArray[midPoint] === searchedElement ? tracedIndex + midPoint : -1;
	}
};

class PrefixNode {
	constructor(value = '') {
		this.value = value;
		this.children = [];
	}

	findParent(value, parentsPrefix = '') {
		if (this.children.length === 0) {
			return this;
		}
		const suitableChildren = this.children
			.map(prefixNode => prefixNode.value)
			.filter(prefix => value.startsWith(parentsPrefix + this.value + prefix));
		if (suitableChildren.length === 0) {
			throw new Error(`Value ${value} must start with ${parentsPrefix + this.value}`);
		}
	}

	insertChild(value) {
		this.children = new PrefixNode(value);
	}
}

class PrefixTree {
	constructor(rootPrefix = '') {
		this.root = new PrefixNode(rootPrefix);
	}

	insertElement(element) {
		const immediateParent = root.findParent(element);
		immediateParent.insertChild(element);
	}
};

exports.readLines = readLines;
exports.binarySearch = binarySearch;
exports.dec2bin = dec2bin;
exports.bin2dec = bin2dec;
exports.PrefixTree = PrefixTree;