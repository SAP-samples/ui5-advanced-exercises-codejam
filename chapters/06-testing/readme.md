# Chapter 06 - Testing

After working through this chapter, you'll know how to write QUnit, OPA and WDI5 tests for your UI5 application and how you can automate them.

## Background

*QUnit* tests are used for functional testing, allowing you to directly test your application code. *OPA* tests serve as integration tests, enabling you to simulate user interactions within your application. *WDI5* tests are end-to-end (E2E) tests that let you validate your application in a broader context, including navigation between different applications.

*QUnit* or *OPA* tests are included in UI5 and can be simply executed in the browser. You can either open them directly in the browser or you can use a test runner to automate the execution.

## Generated test structure

The project generator initially creates test files in your project. It comes with a basic *QUnit* test and *WDI5* test incl. configuration. The structure looks as follows:

```text
webapp
\_ test
   \_ e2e
      \_ sample.test.ts
      \_ tsconfig.json
      \_ wdio.conf.ts
   \_ unit
      \_ FirstTest.js
   \_ locate-reuse-libs.js   
```

### QUnit tests

➡️ The *QUnit* test can be executed by calling the following command in the `uimodule` folder:

```sh
npm run qunit
```

This will launch the Fiori tools which already comes with some built-in boilerplate files to finally serve and run all available *QUnit* test (`*Test.js` or `*Test.ts` in the `unit` and nested folders) in your browser.

⚠ Although, we generated a TypeScript project, the generated QUnit test is currently using JavaScript. But you can safely change the file extension to TypeScript, remove the UI5 AMD-like code (`sap.ui.define`) as the code is trivial and also works in TypeScript. Now the code looks like that:

```ts
QUnit.module("First Test", {});

QUnit.test("It's just true", (assert) => {
	assert.strictEqual(true, true);
});
```

ℹ️ To fix the issue that `QUnit` is unknown, go into your `tsconfig.json` and add `@types/qunit` into the `types` section.

### WDI5 tests

➡️ The *WDI5* test can be executed by running the following commands in the `uimodule` folder:

```sh
# first start the development server
npm start 

# second run the wdi5 tests against it
npm run wdi5
```

⚠ When you see issue running `npm start` related to TypeScript, please ensure to exclude the `./webapp/test/e2e/**/*` folder in your root `tsconfig.json`. The E2E tests come with an own `tsconfig.json`.

## Prepare your project for adding QUnit or OPA tests

If you need a bit more control over the generated files, you can also create the boilerplate files maually. This allows you to specify e.g. the *QUnit* or *Sinon* version in the test suite and to maintain a list of tests to be executed. The tests are trigged by the [UI5 test starter](https://sdk.openui5.org/topic/032be2cb2e1d4115af20862673bedcdb). The concept of UI5 test suite is explained here in the UI5 documentation: [https://sdk.openui5.org/#/topic/22f50c0f0b104bf3ba84620880793d3f]()

As a preparation you need to add a testsuite incl. a testpage:

```text
webapp
\_ test
   \_ testsuite.qunit.html
   \_ testsuite.qunit.ts
   \_ Test.qunit.html
```

These three files are the boilerplate for the execution of *QUnit* and *OPA* tests.

### 1. Add `testsuite.qunit.html`

Add a file called `testsuite.qunit.html` in the `test` folder of your UI5 application with the following content:

```html
<!doctype html>
<html>
	<head>
		<meta http-equiv="Cache-control" content="no-cache, no-store, must-revalidate" />
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta charset="utf-8" />
		<title>QUnit test suite for the UI5 Application: uimodule</title>
		<script
			src="../resources/sap/ui/test/starter/createSuite.js"
			data-sap-ui-testsuite="test-resources/uimodule/testsuite.qunit"
			data-sap-ui-resource-roots='{
				"test-resources.uimodule": "./"
			}'
		></script>
	</head>
	<body></body>
</html>
```

### 2. Add `testsuite.qunit.ts`

The HTML page requires a testsuite which needs to be put aside. Add a file called `testsuite.qunit.ts` in the `test` folder of your UI5 application with the following content:

```js
export default {
	name: "QUnit test suite for the UI5 Application: uimodule",
	defaults: {
		page: "ui5://test-resources/uimodule/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		sinon: {
			version: 4
		},
		ui5: {
			language: "EN",
			theme: "sap_horizon"
		},
		coverage: {
			only: "uimodule/",
			never: "test-resources/uimodule/"
		},
		loader: {
			paths: {
				"uimodule": "../"
			}
		}
	},
	tests: {}
};
```

### 3. Add `Test.qunit.html`

The testsuite defines a test page to be used to execute the tests declared in that file as well. Add a `Test.qunit.html` file into the `test` folde with the following content:

```html
<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<script
			src="../resources/sap/ui/test/starter/runTest.js"
			data-sap-ui-resource-roots='{
				"test-resources.uimodule": "./"
			}'
		></script>
	</head>
	<body class="sapUiBody">
		<div id="qunit"></div>
		<div id="qunit-fixture"></div>
	</body>
</html>
```

## Add QUnit tests

The *QUnit* tests are typically put into the following structure:

```text
webapp
\_ test
   \_ unit
      \_ unitTests.qunit.ts
      \_ controller
         \_ Main.qunit.ts
```

### 1. Add `unitTests.qunit.ts`

The `unitTests.qunit.ts` file lists the individual *QUnit* test pages to be executed via the testsuite. Here you just import the modules providing *QUnit* modules and tests.

In your `test/unit` folder, please add a file called `unitTests.qunit.ts` with the following content:

```ts
// import all your QUnit tests here
import "./controller/Main.qunit";
```

### 2. Add `Main.qunit.ts`

The `Main.qunit.ts` file now defines *QUnit* modules and tests. A very basic check is to test the availability of a function in the `Main.controller` of the application. Create a `Main.qunit.ts` file with the following content in the `test/unit/controller` folder:

```ts
import Main from "uimodule/ext/main/Main.controller";

QUnit.module("Sample Main controller test");

QUnit.test("The Main controller class has a sayHello method", function (assert) {
	// as a very basic test example just check the presence of the "sayHello" method
	assert.strictEqual(typeof Main.prototype.onFlyToProduct, "function");
});
```

### 3. Register the `unitTests.qunit.ts` in the `testsuite.qunit.ts`

Open the `testsuite.qunit.ts` and in the section `tests` add the following content:

```ts
export default {
	[...]
	tests: {
		"unit/unitTests": {
			title: "Unit tests for uimodule"
		}
	}
};
```

Now, you can run your *QUnit* tests in the browser by starting the project with the command line `npm run start:uimodule` in the `application` directory. After the server is running, you can open the testsuite with the following URL: [http://localhost:8080/test/testsuite.qunit.html]() (ensure that the same port is used) and press **Run All** or click on the individual *QUnit* test to execute.

## Add OPA tests

The *OPA* tests are typically put into the following structure:

```text
webapp
\_ test
   \_ integration
      \_ opaTests.qunit.ts
      \_ HelloJourney.qunit.ts
      \_ pages
         \_ MainPage.ts
```

*OPA* tests typically consist of journeys and page objects.

### 1. Add `opaTests.qunit.ts`

The `opaTests.qunit.ts` file lists the individual *OPA* test pages to be executed via the testsuite. Here you just import the modules providing *OPA* journeys.

In your `test/integration` folder, please add a file called `opaTests.qunit.ts` with the following content:

```ts
// import all your OPA journeys here
import "./HelloJourney";
```

### 2. Add `HelloJourney.qunit.ts`

The `HelloJourney.qunit.ts` implements the test journey to simulate an interaction with the application. In our hello journey we open the application, search for "Coca" and check that a single tile is visible with "Coca-Cola" as title.

In your `test/integration` folder, please add a file called `HelloJourney.qunit.ts` with the following content:

```ts
import opaTest from "sap/ui/test/opaQunit";
import MainPage from "./pages/MainPage";

const onTheMainPage = new MainPage();

QUnit.module("Sample Journey");

opaTest("Should search for Coca-Cola", function () {
	// Arrangements
	onTheMainPage.iStartMyUIComponent({
		componentConfig: {
			name: "uimodule"
		}
	});

	// Actions
	onTheMainPage.iPressTheSearchField();
	onTheMainPage.iEnterSearchText();

	// Assertions
	onTheMainPage.iShouldOnlySeeCocaCola();

	// Cleanup
	onTheMainPage.iTeardownMyApp();
});
```

Typically, the actions and assertions calls are outsourced in so-called page object. They are related to a single view in our case to the `Main.view`.

### 3. Add `MainPage.ts`

The page object implements actions to interact and assertions to check the behavior of the UI.

In your `test/integration/pages` folder, please add a file called `MainPage.ts` with the following content:

```ts
import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";
import EnterText from "sap/ui/test/actions/EnterText";
import GenericTile from "sap/m/GenericTile";
import UI5Element from "sap/ui/core/Element";


const viewName = "uimodule.ext.main.Main";

export default class MainPage extends Opa5 {
	// Actions
	iPressTheSearchField() {
		this.waitFor({
			id: "searchField",
			viewName,
			actions: new Press(),
			errorMessage: "Did not find the search field on the Main view"
		});
	}

	iEnterSearchText() {
		this.waitFor({
			id: "searchField",
			viewName,
			actions: new EnterText({
				text: "Coca"
			}),
			errorMessage: "Did not find the search field on the Main view and could not enter text"
		});
	}

	// Assertions
	iShouldOnlySeeCocaCola() {
		this.waitFor({
			controlType: "sap.m.GenericTile",
			success: function (tiles: UI5Element[]) : void {
				Opa5.assert.equal(tiles.length, 1, "Only on tile is visible");
				Opa5.assert.equal((tiles[0] as GenericTile).getHeader(), "Coca Cola", "The correct tile is visible");
			},
			errorMessage: "Did not find the tile"
		});
	}
}
```

### 4. Register the `opaTests.qunit.ts` in the `testsuite.qunit.ts`

Open the `testsuite.qunit.ts` and in the section `tests` add the following content:

```ts
export default {
	[...]
	tests: {
		"unit/unitTests": {
			title: "Unit tests for uimodule"
		},
		"integration/opaTests": {
			title: "Integration tests for uimodule"
		}
	}
};
```

Now, you can run your *OPA* tests in the browser together with the *QUnit* tests by starting the project with the command line `npm run start:uimodule` in the `application` directory. After the server is running, you can open the testsuite with the following URL: [http://localhost:8080/test/testsuite.qunit.html]() (ensure that the same port is used) and press **Run All** or click on the individual *OPA* test to execute.

## Maintain WDI5 tests

The project template already comes with the boilerplate for *WDI5* tests. Initially, in this chapter we have seen how to adopt the project configuration to make TypeScript work properly and to trigger them manually.

```text
webapp
\_ test
   \_ e2e
      \_ sample.test.ts
      \_ tsconfig.json
      \_ wdio.conf.ts
```

### 1. Modify the `sample.test.ts`

The `sample.test.ts` is initially a very basic test which does some simple logging. Let's extend the test to do the same like the `OPA` test - checking the existence of the Page, the SearchField and searching for "Coca" to ensure that only the respective tile is displayed:

```ts
/* eslint-disable */
import { wdi5 } from "wdio-ui5-service";

describe("samples", () => {
  it("should log", () => {
    const logger = wdi5.getLogger();
    logger.log("hello world!");
  });

  // intentionally skipping this as you have to adjust things to your UI5 app :)
  it("should retrieve the Main page", async () => {
    const appLocator = {
      selector: {
        controlType: "sap.m.Page",
        viewName: "uimodule.ext.main.Main",
      },
    };

    const app = await browser.asControl(appLocator);
    await expect(app).toBeDefined();
  });

  it("should retrieve the search field and enter Coca", async () => {
    const searchLocator = {
      selector: {
        id: "searchField",
        viewName: "uimodule.ext.main.Main",
      },
    };

    const search = await browser.asControl(searchLocator);
    await expect(search).toBeDefined();
    await (browser.asControl(searchLocator) as any).focus().enterText("Coca");
    await expect(search).toHaveValue("Coca");
  });

  it("should display only the Coca Cola tile", async () => {
    const tilesLocator = {
      selector: {
        controlType: "sap.m.GenericTile",
        viewName: "uimodule.ext.main.Main",
      },
    };

    const tiles = await browser.allControls(tilesLocator);
    await expect(tiles.length).toBe(1);
    await expect(await tiles[0].getHeader()).toBe("Coca Cola");
  });
});
```

To finally run the *WDI5* tests you need to start the CAP server and the UI5 server first and then you can execute the test above by running the following command line in the `ui5module` folder:

```sh
npm run wdi5
```

## Test automation

For the automated execution of *QUnit* and/or *OPA* tests *Karma* was used in the past. As *Karma* had been deprecated there are two alternatives available right now:

* [UI5 Test Runner](https://arnaudbuchholz.github.io/ui5-test-runner/)
* [wdio-qunit-service](https://webdriver.io/docs/wdio-qunit-service/)

Both can be seen as drop-in replacement to *Karma* but *wdio-qunit-service* makes most sense, if *WDI5* is already in use. The [openui5-sample-app](https://github.com/SAP/openui5-sample-app) is using the UI5 Test Runner, therfore we also use it here.

### Use `ui5-test-runner`

As the UI5 Test Runner is a drop-in replacement, there is not much configuration to do. Install the dependency and run it.

➡️ Install the UI5 Test Runner as a dev-dependency in the `uimodule` folder:

```sh
npm install -D ui5-test-runner
```

➡️ In your `package.json`, add the following script:

```json
{
    [...]
    "scripts": {
        "test-runner": "ui5-test-runner --url http://localhost:8080/test/testsuite.qunit.html"
    }
    [...]
}
```

This line tells the UI5 Test Runner to opens the test suite. Similar like for *WDI5* you need to start the CAP server and the UI5 server first and then you can execute the test above by running the following command line in the `ui5module` folder:

```sh
npm run test-runner
```
