sap.ui.define([
	"sap/ui/core/Control",
	"three",
	"three/addons/controls/OrbitControls",
	"three/examples/jsm/controls/FlyControls",
	"three/addons/loaders/GLTFLoader",
	"gsap"
], function(SuperControl, THREE, OrbitControls, FlyControls, GLTFLoader, gsap) {
	"use strict"

	return SuperControl.extend("myui5app.control.Supermarket", {
		metadata: {
			properties: {
				x: { type: "float", default: 20.69 },
				y: { type: "float", default: 10.12 },
				z: { type: "float", default: -28.03}
			},
			aggregations: {},
		},

		animationSpeed: 3000,

		onAfterRendering: function() {
			const canvas = this.getDomRef()
			const { width, height } = canvas.getBoundingClientRect()

			this.renderer = new THREE.WebGLRenderer({
				canvas: canvas,
			})
			this.renderer.setSize(width, height)

			this.scene = new THREE.Scene()
			this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

			const ambientLight = new THREE.AmbientLight(0xffffff)
			this.scene.add(ambientLight)

			const loader = new GLTFLoader.GLTFLoader()
			loader.load("supermarket.glb", gltf => {
				this.scene.add(gltf.scene)
				window.setTimeout(() => {
					this.setCameraPosition([{ x: 18.88, y: 2.44, z: -5.2 }])
				}, this.aminimationSpeed)
			})

			this.controls = new OrbitControls.OrbitControls(this.camera, this.renderer.domElement);
			// this.controls.enabled = false

			this.animate()

			this.camera.position.set(this.getX(), this.getY(), this.getZ())
		},

		animate: function() {
			console.log(this.camera.position.x, this.camera.position.y, this.camera.position.z)
			this.renderer.render(this.scene, this.camera)
			this.controls.update()
			requestAnimationFrame(this.animate.bind(this))
		},

		setCameraPosition: function(aCoordinates) {
			gsap.to(this.camera.position, { ...aCoordinates[0], duration: this.animationSpeed / 1000 })
			for (let i = 1; i < aCoordinates.length; i++) {
				window.setTimeout(() => {
					gsap.to(this.camera.position, { ...aCoordinates[i], duration: this.animationSpeed / 1000 })
				}, this.animationSpeed)
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
