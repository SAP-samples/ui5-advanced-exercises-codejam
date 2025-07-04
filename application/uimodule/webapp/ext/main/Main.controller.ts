/* eslint-disable no-console */
import Controller from "sap/fe/core/PageController";
import { Button$PressEvent } from "sap/m/Button";
import Supermarket from "../control/Supermarket";
import HBox from "sap/m/HBox";
import { SearchField$LiveChangeEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import { RatingIndicator$ChangeEvent } from "sap/m/RatingIndicator";
import MessageToast from "sap/m/MessageToast";
import Label from "sap/m/Label";
import CompositeBinding from "sap/ui/model/CompositeBinding";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";

/**
 * @namespace uimodule.ext.main
 */
export default class Main extends Controller {
  /**
   * Called when a controller is instantiated and its View controls (if available) are already created.
   * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
   * @memberOf uimodule.ext.main.Main
   */
  // public onInit(): void {
  //
  //}

  /**
   * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
   * (NOT before the first rendering! onInit() is used for that one!).
   * @memberOf uimodule.ext.main.Main
   */
  // public  onBeforeRendering(): void {
  //
  //  }

  /**
   * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
   * This hook is the same one that SAPUI5 controls get after being rendered.
   * @memberOf uimodule.ext.main.Main
   */
  // public  onAfterRendering(): void {
  //
  //  }

  /**
   * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
   * @memberOf uimodule.ext.main.Main
   */
  // public onExit(): void {
  //
  //  }
  //
  public onFlyToProduct(event: Button$PressEvent): void {
    const source = event.getSource();
    const context = source.getBindingContext();
    const position = context?.getProperty("position");
    const supermarket = this.getView()?.byId("supermarket") as Supermarket;
    supermarket.expand({ stayExpanded: true });
    supermarket.setCameraPosition(JSON.parse(position), { backToStart: true });
  }

  public onSearchProducts(event: SearchField$LiveChangeEvent): void {
    const filter = [];
    const query = event.getParameter("newValue");
    if (query) {
      filter.push(
        new Filter({
          path: "title",
          operator: FilterOperator.Contains,
          value1: query,
          caseSensitive: false
        })
      );
    }
    const list = this.getView()?.byId("products") as HBox;
    const binding = list.getBinding("items") as ODataListBinding;
    binding.filter(filter);
  }

  public onCreateRating(event: RatingIndicator$ChangeEvent) {
    const ratingIndicator = event.getSource();
    const operation = ratingIndicator.getObjectBinding() as ODataContextBinding;
    operation
      .invoke()
      .then(() => {
        console.log(
          "logging the result...",
          operation.getBoundContext().getObject()
        );
        MessageToast.show("Rating submitted.");
        const label = this.getView()?.byId("avgRating") as Label;
        const compositeBindings = label.getBinding("text") as CompositeBinding;
        compositeBindings.getBindings()[0].refresh();
        ratingIndicator.setEnabled(false);
      })
      .catch((error: Error) => {
        MessageToast.show(error.message);
      });
  }
}
