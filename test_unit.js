"use strict";

export {
	TestBrowserJS
};

// Minimum requrements for what contents of `test_unit.js` must have.

/**
 * @typedef {import('./test.js').TestsToRun} TestsToRun
 * @typedef {import('./test.js').TestBrowserJS} TestBrowserJS
 */

/** @type {TestsToRun}**/
let TestsToRun = [];

/** @type {TestBrowserJS} **/
let TestBrowserJS = {
	TestsToRun,
};