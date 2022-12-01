import * as fs from 'fs';
import * as path from 'path';

const readLines = (fileName, separator='\n') => {
    return fs.readFileSync(path.join(__dirname, fileName)).toString().split(separator).filter(line => line !== '');
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

export { readLines, binarySearch, dec2bin, bin2dec };