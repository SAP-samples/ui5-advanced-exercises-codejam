import Main from "uimodule/ext/view/Main.controller";

QUnit.module("Sample Main controller test");

QUnit.test("The Main controller class has a onTilePress method", function (assert) {
	assert.strictEqual(typeof Main.prototype.onTilePress, "function");
});
