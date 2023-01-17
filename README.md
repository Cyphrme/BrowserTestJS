# BrowserTestJS 
![BrowserTestJS](./browsertestjs.png)

Run unit tests in the browser.

## [Demo](https://cyphrme.github.io/BrowserTestJS/example/browsertest/browsertest.html)

[Real use in a project](https://cyphrme.github.io/Cozejs/test/browsertestjs/test.html)  (from [Cozejs](https://github.com/Cyphrme/Cozejs)).


# How to use BrowserTestJS

Import BrowserTestJS as a submodule to the project.

``` sh
git submodule add git@github.com:Cyphrme/BrowserTestJS.git browsertest
```
Which will add `browsertest` to the following project:

```dir
my_project/
 ├─ My_File.html
 ├─ My_File.js
 ├─ ...
 └─ browsertest/
```

Write tests in `test_unit.js` (above the `browsertest` directory).
`example/test_unit.js` may be used as a starter template.

```dir
my_project/
 ├─ My_File.html
 ├─ My_File.js
 ├─ ...
 ├─ test_unit.js
 └─ browsertest/
```


## Updating BrowserTestJS
A project can update by running the following command from the directory where
`.gitmodules` exists:

```sh
git submodule update --remote
```

## Run tests locally with a local HTTP server
Go must be installed.

```sh
cd $my_project/browsertest
go run server.go
```

Then go to `localhost:8082`.  

# Parameters for `test_unit.js`

There are three parts to each test:
1. Writing the "schema" of the test, which includes:
    - The Name of the test, which is the name used to differ tests and shows in browser.
    - The Function of the test, which is the test function testing something in your source code.
    - The Golden results of the test, which is the expected behavior/results from running your test function.
2. Writing the test function that tests your source code.
3. Invoking the test by placing the test schema in the `TestsToRun` variable.
4. The `TestGUIOptions` is an optional parameter and is not required for
   TestBrowserJS. `TestGUIOptions` includes stylesheet options for your project.


## Logo license
"you are free to use your logo for promotional purposes"
https://support.freelogodesign.org/hc/en-us/categories/360003253451-Copyrights


----------------------------------------------------------------------
# Attribution, Trademark notice, and License
BrowserTestJS and ExampleBrowserTestJS is released under The 3-Clause BSD License. 

"Cyphr.me" is a trademark of Cypherpunk, LLC. The Cyphr.me logo is all rights
reserved Cypherpunk, LLC and may not be used without permission.