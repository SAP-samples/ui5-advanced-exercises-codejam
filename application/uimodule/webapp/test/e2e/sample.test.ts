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
