import { GUI } from "dat.gui"
import * as THREE from "three"

import Experience from "../index"
import Sizes from "../utils/Sizes"
import Camera from "./Camera"

class Renderer {
  camera: Camera
  canvas: Element
  components: Experience
  debug: GUI
  folder!: GUI
  orthographicCamera: THREE.OrthographicCamera
  perspectiveCamera: THREE.PerspectiveCamera
  renderer!: THREE.WebGLRenderer
  scene: THREE.Scene
  sizes: Sizes
  showScissor!: boolean

  constructor() {
    this.components = new Experience()

    this.sizes = this.components.sizes
    this.scene = this.components.scene
    this.canvas = this.components.canvas
    this.debug = this.components.debug

    this.camera = this.components.camera
    this.perspectiveCamera = this.camera.camera.perspectiveCamera
    this.orthographicCamera = this.camera.camera.orthographicCamera

    this.showScissor = false

    this.initRenderer()
    this.setdebug()
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    })

    // Renderer settings
    this.renderer.autoClear = false
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.physicallyCorrectLights = true
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.toneMapping = THREE.CineonToneMapping
    this.renderer.toneMappingExposure = 1.5
    this.renderer.setClearColor(0x000000, 1)

    this.resize()

    if (this.debug) {
      this.folder = this.debug.addFolder("Renderer")
      this.folder.add(this, "showScissor").name("Show Side Viewport")
    }
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(this.sizes.devicePixelRatio)
  }

  update() {
    if (!this.debug) this.renderer.render(this.scene, this.perspectiveCamera)

    //! DEBUG
    this.setdebug()
  }

  setdebug() {
    if (this.debug) {
      this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height)
      this.renderer.render(this.scene, this.perspectiveCamera)

      if (this.showScissor) {
        this.renderer.setScissorTest(true)
        this.renderer.setViewport(this.sizes.width - this.sizes.width / 3, this.sizes.height / 16, this.sizes.width / 3, this.sizes.height / 3)
        this.renderer.setScissor(this.sizes.width - this.sizes.width / 3, this.sizes.height / 16, this.sizes.width / 3, this.sizes.height / 3)

        this.renderer.render(this.scene, this.orthographicCamera)
        this.renderer.setScissorTest(false)
      }
    }
  }
}

export default Renderer
