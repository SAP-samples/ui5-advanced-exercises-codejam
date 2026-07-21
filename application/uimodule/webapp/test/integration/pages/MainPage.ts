import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";
import EnterText from "sap/ui/test/actions/EnterText";
import GenericTile from "sap/m/GenericTile";
import UI5Element from "sap/ui/core/Element";


const viewName = "uimodule.ext.view.Main";

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
				text: "no sugar",
				clearTextFirst: false
			}),
			errorMessage: "Did not find the search field on the Main view and could not enter text"
		});
	}

	// Assertions
	iShouldOnlySeeSodaNoSugar() {
		this.waitFor({
			controlType: "sap.m.GenericTile",
			success: function (tiles: UI5Element[]) : void {
				Opa5.assert.equal(tiles.length, 1, "Only one tile is visible");
				Opa5.assert.equal((tiles[0] as GenericTile).getHeader(), "Soda no sugar", "The correct tile is visible");
			},
			errorMessage: "Did not find the tile"
		});
	}
}
