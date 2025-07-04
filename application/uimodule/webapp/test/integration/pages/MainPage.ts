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

	/*
	iShouldNotSeeTheHelloDialog() {
		this.waitFor({
			controlType: "sap.m.App", // dummy, I just want a check function, where I can search the DOM. Probably there is a better way for a NEGATIVE test (NO dialog).
			check: function () {
				return document.querySelectorAll(".sapMDialog").length === 0;
			},
			success: function () {
				Opa5.assert.ok(true, "No dialog is open");
			}
		});
	}
	*/
}
