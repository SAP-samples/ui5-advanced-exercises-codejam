sap.ui.define([
	"sap/ui/core/Control",
	"three",
	"three/addons/controls/OrbitControls",
	"three/addons/loaders/GLTFLoader"
], function(SuperControl, THREE, OrbitControls, GLTFLoader) {
	"use strict";

	return SuperControl.extend("myui5app.control.Supermarket", {
		metadata: {
			properties: {},
			aggregations: {},
		},

		onAfterRendering: function() {
			const canvas = this.getDomRef()

			const loader = new GLTFLoader.GLTFLoader();

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

			const renderer = new THREE.WebGLRenderer({
				canvas: canvas,
			});

			const { width, height } = canvas.getBoundingClientRect();
			renderer.setSize(width, height);
			renderer.setAnimationLoop(animate);

			const ambientLight = new THREE.AmbientLight(0xffffff);
			scene.add(ambientLight);

			loader.load('supermarket.glb', function(gltf) {
				scene.add(gltf.scene);
			}, undefined, function(error) {
				console.error(error);
			});

			camera.position.z = 5;

			const controls = new OrbitControls.OrbitControls(camera, renderer.domElement);

			function animate() {
				// console.log(camera.position)
				renderer.render(scene, camera);
			}
		},

		renderer(oRm, oControl) {
			oRm.openStart("canvas", oControl)
			oRm.class("myCanvas")
			oRm.openEnd()
			oRm.close("canvas")
		}

	})
})
