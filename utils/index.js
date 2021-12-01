const fs = require('fs');

const readLines = (fileName, separator='\n') => {
	return fs.readFileSync(fileName).toString().split(separator).filter(line => line !== '');
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

exports.readLines = readLines;
exports.binarySearch = binarySearch;
