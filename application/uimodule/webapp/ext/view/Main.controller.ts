import Controller from "sap/fe/core/PageController";
import { SearchField$LiveChangeEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import HBox from "sap/m/HBox";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import { SegmentedButton$SelectionChangeEvent } from "sap/m/SegmentedButton";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import { RatingIndicator$ChangeEvent } from "sap/m/RatingIndicator";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";
import Label from "sap/m/Label";
import CompositeBinding from "sap/ui/model/CompositeBinding";
import ODataPropertyBinding from "sap/ui/model/odata/v4/ODataPropertyBinding";
import { Button$PressEvent } from "sap/m/Button";
import { Table$RowPressEvent } from "sap/fe/macros/Table";
import Context from "sap/ui/model/odata/v4/Context";
import Supermarket from "../control/Supermarket";

/**
 * @namespace uimodule.ext.view
 */
export default class Main extends Controller {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf uimodule.ext.view.Main
	 */
	public onInit(): void {
		super.onInit(); // needs to be called to properly initialize the page controller
		// local view model to control whether the products are shown as a tile list or an FPM table
		this.getView()?.setModel(new JSONModel({ mode: "list" }), "view");
	}

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf uimodule.ext.view.Main
	 */
	// public  onBeforeRendering(): void {
	//
	//  }

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf uimodule.ext.view.Main
	 */
	// public  onAfterRendering(): void {
	//
	//  }

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf uimodule.ext.view.Main
	 */
	// public onExit(): void {
	//
	//  }
	public onSearchProducts(event: SearchField$LiveChangeEvent): void {
		const filter = [];
		const query = event.getParameter("newValue");
		if (query) {
			filter.push(new Filter({
				path: "title",
				operator: FilterOperator.Contains,
				value1: query,
				caseSensitive: false
			}));
		}
		const list = this.getView()?.byId("products") as HBox;
		const binding = list.getBinding("items") as ODataListBinding;
		binding.filter(filter);
	}

	public onToggleView(event: SegmentedButton$SelectionChangeEvent): void {
		// the "view" model's "mode" is two-way bound to the SegmentedButton, which in turn
		// drives the visibility of the tile list and the FPM table via expression binding.
		// This handler is a hook for any additional logic when switching views.
		const mode = event.getParameter("selectedKey");
		MessageToast.show(`Switched to ${mode} view.`);
	}

  public onCreateRating(event: RatingIndicator$ChangeEvent) {
      const ratingIndicator = event.getSource();
      const operation = ratingIndicator.getObjectBinding() as ODataContextBinding;
      operation.invoke().then(() => {
          console.log("logging the result...", operation.getBoundContext().getObject());
          MessageToast.show("Rating submitted.");
          const label = this.getView()?.byId("avgRating") as Label;
          const compositeBindings = label.getBinding("text") as CompositeBinding;
          (compositeBindings.getBindings()[0] as ODataPropertyBinding).refresh();
          ratingIndicator.setEnabled(false);
      }).catch((error: Error) => {
          MessageToast.show(error.message);
      });
  }

		public onTilePress(event: Button$PressEvent): void {
		const context = event.getSource().getBindingContext() as Context;
		this.flyToProduct(context);
	}

	public onRowPress(event: Table$RowPressEvent): void {
		// the FPM table's rowPress event exposes the pressed row's context via the "bindingContext" parameter.
		// Its event parameters are not statically typed, so we read it via a typed cast of getParameters().
		const { bindingContext } = event.getParameters() as unknown as { bindingContext: Context };
		this.flyToProduct(bindingContext);
	}

	private flyToProduct(context?: Context): void {
		if (!context) {
			return;
		}
		const supermarket = this.getView()?.byId("supermarket") as Supermarket;
		// "position" is not part of the table's selected columns, so request it as a late property
		context.requestProperty("position").then((position: string) => {
			supermarket.expand({ stayExpanded: true });
			supermarket.setCameraPosition(JSON.parse(position), { backToStart: true });
		});
	}
}
