import { GUI } from "dat.gui"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as THREE from "three"

import Experience from ".."
import Sizes from "../utils/Sizes"
import Camera from "./Camera"
import Renderer from "./Renderer"

class Controls {
  camera: Camera
  canvas: HTMLElement
  components: Experience
  debug: GUI
  folder!: GUI
  orthographicCamera: THREE.OrthographicCamera
  orbitControls!: OrbitControls
  perspectiveCamera: THREE.PerspectiveCamera
  renderer: Renderer
  scene: THREE.Scene
  sizes: Sizes

  constructor() {
    this.components = new Experience()

    this.sizes = this.components.sizes
    this.scene = this.components.scene
    this.canvas = this.components.canvas
    this.debug = this.components.debug

    this.camera = this.components.camera
    this.perspectiveCamera = this.camera.camera.perspectiveCamera
    this.orthographicCamera = this.camera.camera.orthographicCamera

    this.renderer = this.components.renderer

    this.initControls()
    this.setDebug()
  }

  initControls() {
    this.orbitControls = new OrbitControls(this.camera.camera.perspectiveCamera, this.canvas)
    this.orbitControls.enabled = false
  }

  setDebug() {
    if (this.debug) {
      this.orbitControls.enabled = true
      this.orbitControls.enableDamping = true
      this.orbitControls.dampingFactor = 0.025
      this.orbitControls.zoomSpeed = 0.75

      this.folder = this.debug.addFolder("Controls")

      this.folder.add(this.orbitControls, "enabled").name("Orbit controls")
      this.folder.add(this.orbitControls, "enableDamping").name("Damping")
      this.folder.add(this.orbitControls, "dampingFactor").min(0.001).max(0.5).step(0.001).name("Damping Factor")
      this.folder.add(this.orbitControls, "zoomSpeed").min(0.01).max(10).step(0.01).name("Zoom speed")
    }
  }

  update() {
    this.orbitControls.update()
  }
}

export default Controls
