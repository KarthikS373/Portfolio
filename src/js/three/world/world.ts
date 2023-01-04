import { GUI } from "dat.gui"
import * as THREE from "three"
import { Object3D } from "three"

import Experience from ".."
import Camera from "../environment/Camera"
import Sizes from "../utils/Sizes"
import Floor from "./components/Floor"
import Sun from "./components/Sun"

class World {
  canvas: Element
  camera: Camera
  components: Experience
  container!: THREE.Object3D
  debug: GUI
  floor!: Floor
  scene: THREE.Scene
  sizes: Sizes
  sun!: Sun

  constructor() {
    this.components = new Experience()

    this.sizes = this.components.sizes
    this.scene = this.components.scene
    this.canvas = this.components.canvas
    this.camera = this.components.camera

    this.debug = this.components.debug

    this.container = new Object3D()
    this.container.matrixAutoUpdate = false

    this.initScene()
  }

  initScene() {
    this.initFloor()
    this.initSun()

    this.scene.add(this.container)
  }

  initFloor() {
    this.floor = new Floor({ debug: this.debug })
    this.container.add(this.floor.container)
  }

  initSun() {
    this.sun = new Sun({ debug: this.debug })
    console.log(this.sun)
    this.container.add(this.sun.container)
  }
}

export default World
