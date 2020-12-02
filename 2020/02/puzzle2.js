const readLines = require('../utils').readLines;

const inputLines = readLines('./input.txt');

class PasswordPolicy {
	
	constructor(dbEntryPolicy) {
		const splitDbEntryPolicy = dbEntryPolicy.split(' ');
		this.checkedChar = splitDbEntryPolicy[1];
		this.firstPosition = +splitDbEntryPolicy[0].split('-')[0] - 1;
		this.secondPosition = +splitDbEntryPolicy[0].split('-')[1] - 1;
	} 
	
	isValid(password) {
		if (password.length < this.firstPosition || password.length < this.secondPosition) {
			return false;
		}
		return password[this.firstPosition] === this.checkedChar ^ password[this.secondPosition] === this.checkedChar;
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