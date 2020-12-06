const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n\n');

class Passport {
	constructor(strSeed) {
		const splitStrSeed = strSeed.split(' ');
		splitStrSeed.forEach(attr => {
			const splitAttr = attr.split(':');
			this[splitAttr[0]] = splitAttr[1];
		});
	}
	
	isValid() {
		return this.byr && this.iyr && this.eyr && this.hgt && this.hcl && this.ecl && this.pid;
	}
}

console.log(lines.map(line => line.replace(/\n/g, ' ')).filter(line => new Passport(line).isValid()).length);