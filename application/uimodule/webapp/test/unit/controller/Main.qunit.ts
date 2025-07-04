import Main from "uimodule/ext/main/Main.controller";

QUnit.module("Sample Main controller test");

QUnit.test("The Main controller class has a onFlyToProduct method", function (assert) {
	assert.strictEqual(typeof Main.prototype.onFlyToProduct, "function");
});
