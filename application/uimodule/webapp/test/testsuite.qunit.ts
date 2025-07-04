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
	tests: {
		"unit/unitTests": {
			title: "Unit tests for uimodule"
		},
		"integration/opaTests": {
			title: "Integration tests for uimodule"
		}
	}
};
