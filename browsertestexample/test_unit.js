"use strict";

import * as App from './example.js';

export {
	TestBrowserJS
};

let t_AddSucceed = {
	"name": "Add Succeed",
	"func": test_AddSuccess,
	"golden": true
}
let t_AddFail = {
	"name": "Add Fail",
	"func": test_AddFail,
	"golden": true
}

// Tests Add() for expected successful results.
function test_AddSuccess() {
	let sum = App.Add(2, 20);

	// See if expected result is what we received.
	if (sum !== 22) {
		return false;
	}
	return true;
}

// Tests Add() for expected failure results when not passing a correct type.
function test_AddFail() {
	try {
		App.Add(2, "20");
	} catch (error) {
		if (error.message !== "Error: One of the given numbers was not of type number.") {
			console.error(error);
			return false;
		}
		return true;
	}
	return false;
}

/**
 * @typedef {import('./test.js').TestsToRun} TestsToRun
 * @typedef {import('./test.js').TestBrowserJS} TestBrowserJS
 */

/** @type {TestsToRun}**/
let TestsToRun = [t_AddSucceed, t_AddFail];

/** @type {TestBrowserJS} **/
let TestBrowserJS = {
	TestsToRun,
};