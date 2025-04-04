sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("myui5app.controller.MainView", {
            onInit: function () {

            },

			onFly: function() {
				const supermarket = this.getView().byId("supermarket")
				supermarket.setCameraPosition([
					{ x: 9.9, y: 1.99, z: -5.92 },
					{ x: 9.27, y: 0.73, z: -0.31 }
				])
			}
        });
    });
