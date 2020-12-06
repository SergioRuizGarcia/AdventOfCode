const readLines = require('../utils').readLines;

const lines = readLines('./input.txt', '\n\n');

class MinLengthValidator {
	constructor(minLength) {
		this.minLength = minLength;
	}
	
	isValid(field) {
		return field.length >= +this.minLength;
	}
}

class MaxLengthValidator {
	constructor(maxLength) {
		this.maxLength = maxLength;
	}
	
	isValid(field) {
		return field.length <= +this.maxLength;
	}
}

class RegexpValidator {
	constructor(regexp) {
		this.regexp = new RegExp(regexp);
	}
	
	isValid(field) {
		const match = field.match(this.regexp);
		return match && match.length !== 0;
	}
}

class MinValueValidator {
	constructor(minValue) {
		this.minValue = minValue;
	}
	
	isValid(field) {
		return field >= +this.minValue;
	}
}
class MaxValueValidator {
	constructor(maxValue) {
		this.maxValue = maxValue;
	}
	
	isValid(field) {
		return field <= +this.maxValue;
	}
}

class OneOfValidator {
	constructor(possibleValues) {
		this.possibleValues = possibleValues;
	}
	
	isValid(field) {
		return this.possibleValues.some(value => value === field);
	}
}

class CustomValidator {
	constructor(validatorFn) {
		this.validatorFn = validatorFn;
	}
	
	isValid(field) {
		return this.validatorFn(field);
	}
}

class PassportFieldValidator {
	
	constructor() {
		this.validators = [];
	};
	
	minLength(minLength) {
		this.validators = this.validators.concat(new MinLengthValidator(minLength));
		return this;
	}
	
	maxLength(maxLength) {
		this.validators = this.validators.concat(new MaxLengthValidator(maxLength));
		return this;
	}
	
	exactLength(exactLength) {
		this.validators = this.validators.concat([new MinLengthValidator(exactLength), new MaxLengthValidator(exactLength)]);
		return this;
	}
	
	matches(pattern) {
		this.validators = this.validators.concat(new RegexpValidator(pattern));
		return this;
	}
	
	minValue(minValue) {
		this.validators = this.validators.concat(new MinValueValidator(minValue));
		return this;
	}
	
	maxValue(maxValue) {
		this.validators = this.validators.concat(new MaxValueValidator(maxValue));
		return this;
	}
	
	oneOf(possibleValues) {
		this.validators = this.validators.concat(new OneOfValidator(possibleValues));
		return this;
	}
	
	customRule(validatorFn) {
		this.validators = this.validators.concat(new CustomValidator(validatorFn));
		return this;
	}
	
	isValid(field) {
		return field !== undefined && (this.validators.length ? this.validators.filter(validator => validator.isValid(field)).length === this.validators.length : true);
	}
}

class Passport {
	constructor(strSeed) {
		const splitStrSeed = strSeed.split(' ');
		splitStrSeed.forEach(attr => {
			const splitAttr = attr.split(':');
			this[splitAttr[0]] = splitAttr[1];
		});
		this.passportValidators = {};
		this.passportValidators.byr = new PassportFieldValidator().exactLength(4).minValue(1920).maxValue(2002);
		this.passportValidators.iyr = new PassportFieldValidator().exactLength(4).minValue(2010).maxValue(2020);
		this.passportValidators.eyr = new PassportFieldValidator().exactLength(4).minValue(2020).maxValue(2030);
		this.passportValidators.hgt = new PassportFieldValidator().matches('[0-9]+(cm|in)').customRule(field => {
			const height = field.substring(0, field.length - 2);
			if (field.substring(field.length - 2) === 'cm') {
				return height >= 150 && height <= 193;
			} else {
				return height >= 59 && height <= 76;
			}
		});
		this.passportValidators.hcl = new PassportFieldValidator().matches('#[0-9a-f]{6}');
		this.passportValidators.ecl = new PassportFieldValidator().oneOf(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);
		this.passportValidators.pid = new PassportFieldValidator().exactLength(9).matches('[0-9]{9}');
	}
	
	isValid() {
		return this.passportValidators.byr.isValid(this.byr) &&
			this.passportValidators.iyr.isValid(this.iyr) &&
			this.passportValidators.eyr.isValid(this.eyr) &&
			this.passportValidators.hgt.isValid(this.hgt) &&
			this.passportValidators.hcl.isValid(this.hcl) &&
			this.passportValidators.ecl.isValid(this.ecl) &&
			this.passportValidators.pid.isValid(this.pid);
	}
}

console.log(lines.map(line => line.replace(/\n/g, ' ')).filter(line => new Passport(line).isValid()).length);