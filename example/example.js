"use strict"

// Example module in an application that exports a function `Add`.

export {
	Add
}

/**
 * Add will add the two given numbers and return the sum.
 * @param   {number} num1  Number. First number to add. 
 * @param   {number} num2  Number. Second number to add.
 * @returns {number} sum   Number. Sum of the first and second number.
 * @throws  {Error}  err   Error.  Fails if one of the given numbers is not of type "number"
 */
function Add(num1, num2) {
	if (typeof num1 !== "number" || typeof num2 !== "number") {
		throw new Error("Error: One of the given numbers was not of type number.");
	}
	let sum = num1 + num2;
	return sum;
}