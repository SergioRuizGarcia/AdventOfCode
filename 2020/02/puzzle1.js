const readLines = require('../utils').readLines;

const inputLines = readLines('./input.txt');

class PasswordPolicy {
	
	constructor(dbEntryPolicy) {
		const splitDbEntryPolicy = dbEntryPolicy.split(' ');
		this.checkedChar = splitDbEntryPolicy[1];
		this.lowerBound = splitDbEntryPolicy[0].split('-')[0];
		this.upperBound = splitDbEntryPolicy[0].split('-')[1];
	} 
	
	isValid(password) {
		const numberOfRequiredChars = password.split('').filter(character => character === this.checkedChar).length;
		return numberOfRequiredChars >= this.lowerBound && numberOfRequiredChars <= this.upperBound;
	}
}

class PasswordPolicyChecker {
	
	constructor(dbEntry) {
		const splitDbEntry = dbEntry.split(':');
		this.password = splitDbEntry[1].trim();
		this.passwordPolicy = new PasswordPolicy(splitDbEntry[0]);
	}
	
	isPasswordValid() {
		return this.passwordPolicy.isValid(this.password);
	}
}

console.log(inputLines.filter(line => new PasswordPolicyChecker(line).isPasswordValid()).length);