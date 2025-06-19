import Control from "sap/ui/core/Control"
import RenderManager from "sap/ui/core/RenderManager"
import { MetadataOptions } from "sap/ui/core/Element"
import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	AmbientLight
} from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from "gsap"
import BusyIndicator from "sap/m/BusyIndicator"
import Button from "sap/m/Button"

/**
 * @namespace uimodule.ext.control
 */
export default class Supermarket extends Control {

	static readonly metadata: MetadataOptions = {
		properties: {
			x: { type: "float", defaultValue: 20.69 },
			y: { type: "float", defaultValue: 10.12 },
			z: { type: "float", defaultValue: -28.03 },
			growFactor: { type: "float", defaultValue: 2 }
		},
		aggregations: {
			_busyIndicator: {
				type: "sap.m.BusyIndicator",
				multiple: false
			},
			_expand: {
				type: "sap.m.Button",
				multiple: false
			}
		}
	}

	private scene: Scene
	private camera: PerspectiveCamera
	private threeRenderer: WebGLRenderer
	private controls: OrbitControls
	private animationSpeed = 3000
	private height: Number // = 200
	private width: Number //= this.height * 2

	init(): void {
		this.setAggregation("_busyIndicator", new BusyIndicator({
			visible: true
		}))
		this.setAggregation("_expand", new Button({
			icon: "sap-icon://full-screen",
			press: this.expand.bind(this, {})
		}))
	}

	onAfterRendering(): void {
		const canvas = this.getDomRef() as HTMLCanvasElement;
		const { width, height } = canvas.getBoundingClientRect()

		this.height = height
		this.width = width

		this.threeRenderer = new WebGLRenderer({
			canvas: canvas,
		})
		this.threeRenderer.setSize(width, height)

		this.scene = new Scene()
		this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000)

		const ambientLight = new AmbientLight(0xffffff)
		this.scene.add(ambientLight)

		const loader = new GLTFLoader()
		loader.load("supermarket.glb", gltf => {
			this.scene.add(gltf.scene)
			this.setCameraPosition([{ x: 18.88, y: 2.44, z: -5.2 }], {})
			const busyIndicator = this.getAggregation("_busyIndicator") as BusyIndicator
			busyIndicator.setVisible(false)
		})

		this.controls = new OrbitControls(this.camera, this.threeRenderer.domElement)

		this.animate()

		this.camera.position.set(this.getX(), this.getY(), this.getZ())
	}

	private animate(): void {
		this.threeRenderer.render(this.scene, this.camera)
		this.controls.update()
		requestAnimationFrame(this.animate.bind(this))
	}

	public setCameraPosition(coordinates: Array<Object>, { backToStart = false }: { backToStart?: Boolean }): void {
		if (backToStart) {
			this.camera.position.set(18.88, 2.44, -5.2)
		}
		gsap.to(this.camera.position, { ...coordinates[0], duration: this.animationSpeed / 1000 })
		for (let i = 1; i < coordinates.length; i++) {
			window.setTimeout(() => {
				gsap.to(this.camera.position, { ...coordinates[i], duration: this.animationSpeed / 1000 })
			}, this.animationSpeed)
		}
	}

	public expand({ stayExpanded = false }: { stayExpanded?: Boolean }): void {
		const expand = this.getAggregation("_expand") as Button
		const growFactor = this.getGrowFactor()
		const icon = expand.getIcon()
		const factor = icon === "sap-icon://full-screen" || stayExpanded ? growFactor : 1
		// @ts-ignore
		this.getParent().getDomRef().style.height = `${this.height * factor}px`
		// @ts-ignore
		this.getParent().getDomRef().style.width = `${this.width * factor}px`
		// @ts-ignore
		this.threeRenderer.setSize(this.width * factor, this.height * factor)
		expand.setIcon(`sap-icon://${factor === growFactor ? "exit-" : ""}full-screen`)
	}

	static renderer = {
		apiVersion: 4,
		render: (rm: RenderManager, control: Supermarket) => {
			rm.openStart("canvas", control)
			rm.style("height", "100%")
			rm.style("width", "100%")
			rm.openEnd()
			rm.close("canvas")
			rm.openStart("div")
			rm.style("position", "absolute")
			rm.style("top", "0")
			rm.style("width", "100%")
			rm.style("height", "100%")
			rm.style("display", "flex")
			rm.style("align-items", "center")
			rm.style("justify-content", "center")
			rm.style("pointer-events", "none")
			rm.openEnd()
			rm.renderControl(control.getAggregation("_busyIndicator") as Control)
			rm.close("div")
			rm.openStart("div")
			rm.style("position", "absolute")
			rm.style("top", "0.5rem")
			rm.style("left", "0.5rem")
			rm.openEnd()
			rm.renderControl(control.getAggregation("_expand") as Control)
			rm.close("div")
		}
	}
}
