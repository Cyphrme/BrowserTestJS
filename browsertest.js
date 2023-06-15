"use strict";

export {
	Run,
}
import * as Unit from '../test_unit.js';

// Test will call .trim() on string's golden and returned values.  

/**
 * -----------------------------------------------------------------------------
 *
 * Test defines a test to be run.
 *
 * - name:   Name of the test to display to the user.
 * - func:   Test function to execute.
 * - golden: Correct return value for the test.
 *
 * @typedef  {object}      Test
 * @property {string}      name
 * @property {Function}    func
 * @property {string}      golden
 *
 * -----------------------------------------------------------------------------
 *
 * Tests defines an array of `Test` objects to be run.
 * @typedef  {Array<Test>} Tests
 *
 * -----------------------------------------------------------------------------
 *
 * TestsToRun defines the tests that will be ran on the Browser Test JS page.
 * @typedef  {Tests} TestsToRun
 *
 * -----------------------------------------------------------------------------
 *
 * Stylesheet is the object for displaying CSS/stylesheets on the test page.
 *
 * - href:        The link to the stylesheet. Required.
 * - rel:         The relationship between the linked source and current
 *                document. Defaults to "stylesheet"
 * - integrity:   The digest/checksum for the given source/stylesheet.
 * - crossorigin: Sets the crossorigin for requests to the resource.
 *
 * @typedef  {object}  Stylesheet
 * @property {string}  href
 * @property {string}  [rel]
 * @property {string}  [integrity]
 * @property {string}  [crossorigin]
 *
 * -----------------------------------------------------------------------------
 *
 * TestGUIOptions defines options for the Browser Test JS Testing page. All
 * options are optional, and will use the default if not proivded.
 *
 * Currently supported options:
 *
 * For 'header', 'footer', and any other Custom HTML elements:
 * These options must be written as HTML, but encapsulated in a string. If set,
 * the string will be used as the inner HTML and appended to the custom portion
 * of the page.
 * 
 * 'header' and 'stylesheet' are mutually exclusive, with 'header' taking
 * precedence. If they are both set, `header` will be used. If just wanting
 * to use a custom stylesheet, `stylesheet` must be set, and `header` must not.
 * If wanting a custom header and stylesheet, the custom stylesheet must go in
 * the `header`, and header must be set.
 * 
 * - header:          Custom header.
 * - stylesheet:      Custom stylesheet.
 * - footer:          Custom footer.
 * - main_image:      Custom main image.
 * - html_test_area:  Custom HTML for testing and page customization.
 *
 * @typedef  {object}             TestGUIOptions
 * @property {Stylesheet}         [header]
 * @property {Stylesheet}         [stylesheet]
 * @property {String=Element}     [footer]
 * @property {String=Image}       [main_image]
 * @property {Stylesheet}         [html_test_area]
 *
 * -----------------------------------------------------------------------------
 *
 * TestBrowserJS defines an object for projects/packages to interact with the
 * browsertestjs library.
 *
 * When Browser Test JS page is loaded, it will attempt to retrieve the
 * TestBrowserJS object from the `unit_test.js` file. It will use this object to
 * 1.) Run the tests 2.) Make modifications to the GUI.
 *
 * - TestsToRun:  Holds the tests to be ran for the given application/package.
 * - TestOptions: Holds the options to be used for the GUI.
 *
 * @typedef  {object}           TestBrowserJS
 * @property {TestsToRun}       TestsToRun
 * @property {TestGUIOptions}   TestGUIOptions
 *
 * -----------------------------------------------------------------------------
 */

let totalTestsToRun = 0;
let totalTestsRan = 0;
let testPastCount = 0;
let testFailCount = 0;

// Template for displaying test results in the GUI. Must be cloned.
const jsResultTemplate = document.getElementById('js_test_results');

/**
 * Calls tests to be ran, after the DOM has been loaded.
 * See README for structuring your directory and `test_unit.js` file.
 **/
document.addEventListener('DOMContentLoaded', () => {
	// If imported, don't run onload as determined by existence of #NoModuleFound.
	let noMod = document.getElementById('NoModuleFound');
	if (noMod == null) {
		return;
	}

	document.getElementById('NoModuleFound').hidden = true;
	document.getElementById('testsResultsMeta').hidden = false;
	let tbjs = Unit.TestBrowserJS;
	if (tbjs === null || tbjs == undefined || typeof tbjs !== "object" || Object.keys(tbjs).length <= 0) {
		console.error("TestBrowserJS: The TestBrowserJS object is not properly defined, please see README.", tbjs);
	} else {
		if (tbjs.TestGUIOptions === null || tbjs.TestGUIOptions === undefined || typeof tbjs.TestGUIOptions !== "object") {
			tbjs.TestGUIOptions = {};
		}
		setGUI(tbjs);

		if (Array.isArray(tbjs.TestsToRun) && tbjs.TestsToRun.length > 0) {
			Run(tbjs.TestsToRun);
			return;
		}
	}

	document.getElementById('testsResultsMeta').innerHTML = "";
	document.getElementById('noTestsToRun').hidden = false;
});

/**
 * Runs all of the tests in the 'TestsToRun' array.
 * @param   {Tests} tests
 * @returns {void}
 */
async function Run(tests) {
	totalTestsToRun = Object.entries(tests).length;
	let values = Object.values(tests);
	for (let i = 0; i < totalTestsToRun; i++) {
		var test = {};
		test.name = values[i].name;
		test.golden = values[i].golden;
		try {
			test.result = await values[i].func();
		} catch (err) {
			console.error(err);
			test.result = err;
		}
		appendResult(test);
	}
	stats();
};





/**
 * stats displays statistics about the tests that are being run, out to the
 * screen. It will show the tests that ran, and which passed and failed.
 *
 * @returns {void}          Displays the stats on the page.
 */
async function stats() {
	document.getElementById("totalTestsToRun").innerText = totalTestsToRun;
	document.getElementById("totalTestsRan").innerText = totalTestsRan;
	document.getElementById("testPastCount").innerText = testPastCount;
	document.getElementById("testFailCount").innerText = testFailCount;

	document.getElementById("testsRunning").hidden = true;
	if (testFailCount == 0) {
		document.getElementById("testsPassed").hidden = false;
	} else {
		document.getElementById("testsFailed").hidden = false;
	}
};

/**
 * appendResults appends the results to the div on the page.
 *
 * @param {object} obj            The object that holds the name of the test,
 *                                function, expected result, and actual results.
 * @returns {void}
 */
function appendResult(obj) {
	let clone = jsResultTemplate.content.cloneNode(true);
	let test = "" + obj.name + "\: ";

	if (typeof obj.golden == "string") {
		// Trim outer strings making tests easier to write.  
		var failed = (obj.result.trim() != obj.golden.trim())
	} else {
		failed = obj.result != obj.golden
	}
	if (failed) {
		console.error("❌ Failed.  Got: " + obj.result + " Expected: " + obj.golden);
		test += "❌ Failed";
		clone.querySelector('div').classList.add("text-danger")
		clone.querySelector('.result').textContent = "Got: " + obj.result;
		clone.querySelector('.expected').innerHTML = "Expected: " + obj.golden;
		testFailCount++;
	} else {
		// Test Passed
		clone.querySelector('div').classList.add("text-success")
		test += "✅ Passed";
		testPastCount++;
	}
	totalTestsRan++;

	clone.querySelector('.test').textContent = test;
	document.getElementById("testsResultsList").append(clone);
};



// Uses Bootstrap 5 CDN as default stylesheet/CSS.
const DefaultPageStylesheet = {
	href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css",
	rel: "stylesheet",
	integrity: "sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx",
	crossOrigin: "anonymous"
};

/**
 * Sets the Browser Test JS GUI. Sets values if provided, otherwise sets defaults.  
 *
 * @param   {TestBrowserJS}  tbjs   Object. Options for TestBrowserJS.
 * @returns {void}
 **/
function setGUI(tbjs) {
	let keys = Object.keys(tbjs.TestGUIOptions);
	if (keys.length <= 0) {
		setStyleSheet(DefaultPageStylesheet);
		return;
	}

	// Perform checks for what options are provided and what is default.

	// Set custom header and stylesheet if provided
	if (keys.includes("header")) {
		document.getElementById('CustomHeader').innerHTML = tbjs.TestGUIOptions.header;
	} else if (keys.includes("stylesheet")) {
		// Set stylesheet if custom provided, and custom header is not.
		setStyleSheet(tbjs.TestGUIOptions.stylesheet);
	} else {
		// If no custom header or stylesheet is given, use defaults.
		setStyleSheet(DefaultPageStylesheet);
	}

	// Set custom footer if provided
	if (keys.includes("footer")) {
		document.getElementById('CustomFooter').innerHTML = tbjs.TestGUIOptions.footer;
	}
	// Set custom main image if given.
	if (keys.includes("main_image")) {
		document.getElementById('MainImage').src = tbjs.TestGUIOptions.main_image;
	}
	// Set custom custom HTML testing area in body if given.
	if (keys.includes("html_test_area")) {
		document.getElementById('htmlTestArea').innerHTML = tbjs.TestGUIOptions.html_test_area;
	}
}

/**
 * Sets the stylesheet for the Browser Test JS page, with the given
 * Stylesheet object.
 *
 * @param   {Stylesheet}  ss   Object. Stylesheet object.
 * @returns {void}
 **/
function setStyleSheet(ss) {
	let stylesheet = document.getElementById('bootstrapCSS');
	stylesheet.href = ss.href;
	let keys = Object.keys(ss);
	if (keys.includes("crossOrigin")) {
		stylesheet.crossOrigin = ss.crossOrigin;
	} else {
		stylesheet.crossOrigin = DefaultPageStylesheet.crossOrigin;
	}
	if (keys.includes("integrity")) {
		stylesheet.integrity = ss.integrity;
	}
	if (keys.includes("rel")) {
		stylesheet.rel = ss.rel;
	} else {
		stylesheet.rel = DefaultPageStylesheet.rel;
	}

	// console.log(stylesheet); // debugging
}