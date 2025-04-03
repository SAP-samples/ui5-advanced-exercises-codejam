sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/matchers/I18NText"
],
	function(Opa5, I18NText) {
		"use strict";

		Opa5.createPageObjects({
			onTheMainViewPage: {
				actions: {},
				assertions: {
					theTitleShouldBeCorrect: function() {
						return this.waitFor({
							id: "page",
							viewName: "MainView",
							matchers: new I18NText({
								key: "title",
								propertyName: "title",
								parameters: "myui5app"
							}),
							success: function() {
								Opa5.assert.ok(true, "The page has the correct title");
							},
							errorMessage: "The page does not have the correct title"
						});
					}
				}
			}
		});

	});
