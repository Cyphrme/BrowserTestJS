# BrowserTestJS 
![BrowserTestJS](./browsertestjs.png)

Run unit tests in the browser.

## How to use BrowserTestJS

### How to structure within your repo

In this document, we will be referring to your project as `my_awesome_project`.

Import BrowserTestJS as a submodule to the project.

The following example will demonstrate cloning into the root of the project:

``` sh
git submodule add git@github.com:Cyphrme/BrowserTestJS.git
```
Which will result in the following project structure:

```dir
my_awesome_project /
 ├─ My_File.html
 ├─ My_File.js
 ├─ ...
 ├─ test_unit.js
 └─ browsertestjs /
```

The file `test_unit.js` and directory `browsertestjs` are for browsertestjs.

## To update the submodule
When changes are made to BrowserTestJS, a project can update the changes by
running the following command from the directory where the project's .gitmodules
lives:

```sh
git submodule update --remote
```

## To run tests
You must have Go installed on your local machine.

```sh
cd $my_awesome_project/browsertestjs
go run server.go
```

Then, go to `localhost:8082`.  Voila! You now have unit tests for your projects directly in the browser.

### Example `test_unit.js`

There are three parts to each test:
1. ) Writing the "schema" of the test, which includes:
    - The Name of the test, which is the name used to differ tests and shows in browser.
    - The Function of the test, which is the test function testing something in your source code.
    - The Golden results of the test, which is the expected behavior/results from running your test function.
2. ) Writing the test function that tests your source code.
3. ) Invoking the test by placing the test schema in the `TestsToRun` variable.

The `TestGUIOptions` is an optional parameter and is not required for
TestBrowserJS. `TestGUIOptions` includes stylesheet options for your project.


Example from `test_unit.js` in [Coze js](https://github.com/Cyphrme/Cozejs).


``` Javascript
"use strict";

import * as MAP from '/my_awesome_project/file_3.js';

export {
	TestBrowserJS
};

/**
 * @typedef {import('./test.js').Test} Test
 * @typedef {import('./test.js').TestsToRun} TestsToRun
 * @typedef {import('./test.js').TestGUIOptions} TestGUIOptions
 * @typedef {import('./test.js').TestBrowserJS} TestBrowserJS
 */

/**@type {Test} */
let t_Correct = {
	"name": "Correct",
	"func": test_thingIsCorrect,
	"golden": true
};

// Tests "file_3.js.IsThingCorrect()".
async function test_thingIsCorrect() {
	let thing = {"color":"blue","shape":"round"};
	if (MAP.IsThingCorrect(thing)) {
		return true;
	}
	return false;
};

/**
 * TestsToRun must be declared at the bottom of the file, as the variables
 * cannot be accessed before initialization.
 *
 * @type {TestsToRun}
 **/
let TestsToRun = [
t_Correct
];

/** @type {TestGUIOptions} **/
let TestGUIOptions = {
	footer: `<h1><a href="github.com/my_awesome_project">
	Link to the source code for My Awesome Project
	</a></h1>`,
	stylesheet: {
		href: "file_2.css"
	},
	main_image: "logo.png"

};

/** @type {TestBrowserJS} **/
let TestBrowserJS = {
	TestsToRun,
	TestGUIOptions
};

```

### Logo license
"you are free to use your logo for promotional purposes"
https://support.freelogodesign.org/hc/en-us/categories/360003253451-Copyrights