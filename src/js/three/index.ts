/* Dependency */
import { GUI } from "dat.gui"
import * as THREE from "three"

/* Definitions */
import { SetupType } from "../definitions/experienceSetup.types"

/* Modules */
import Sizes from "./utils/Sizes"
import scene from "./environment/Scene"
import Tick from "./utils/Tick"
import Camera from "./environment/Camera"
import Renderer from "./environment/Renderer"
import World from "./world/world"

class Experience {
  camera!: Camera
  canvas!: Element
  debug!: GUI
  renderer!: Renderer
  scene!: THREE.Scene
  setup!: SetupType
  sizes!: Sizes
  time!: Tick
  world!: World

  static instance: Experience

  constructor(_canvas?: Element) {
    if (Experience.instance) {
      return Experience.instance
    }

    Experience.instance = this

    this.scene = scene

    this.init()
    this.setDebug()

    if (_canvas) this.canvas = _canvas

    this.sizes = new Sizes()
    this.time = new Tick()

    this.camera = new Camera()
    this.renderer = new Renderer()

    this.world = new World()

    // Events
    this.time.on("update", (args: { elapsed: number; delta: number }) => {
      this.update(args.elapsed, args.delta)
    })

    this.sizes.on("resize", () => {
      this.resize()
    })

    this.sizes.on("control", () => {
      this.camera.control()
      this.resize()
    })
  }

  init() {
    if (!this.setup)
      this.setup = {
        debug: window.location.hash === "#debug",
        touch: false,
      }

    this.detectTouch()
  }

  detectTouch() {
    window.addEventListener(
      "touchstart",
      () => {
        this.setup.touch = true
      },
      { once: true }
    )
  }

  setDebug() {
    if (this.setup.debug) {
      this.debug = new GUI({
        width: 360,
        closed: true,
        hideable: false,
        name: "Debug Panel",
        autoPlace: true,
      })

      this.initHelpers()
    }
  }

  update(elapsed: number, delta: number) {
    this.camera.update()
    this.renderer.update()
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  initHelpers() {
    const gridHelper = new THREE.GridHelper(50, 50)
    this.scene.add(gridHelper)

    const axesHelper = new THREE.AxesHelper(5)
    this.scene.add(axesHelper)
  }
}

export default Experience
