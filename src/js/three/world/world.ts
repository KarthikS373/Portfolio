import * as THREE from "three"

import Experience from ".."
import Camera from "../environment/Camera"
import Sizes from "../utils/Sizes"

class World {
  components: Experience
  sizes: Sizes
  scene: any
  canvas: Element
  camera: Camera

  constructor() {
    this.components = new Experience()

    this.sizes = this.components.sizes
    this.scene = this.components.scene
    this.canvas = this.components.canvas
    this.camera = this.components.camera

    this.initScene()
  }

  initScene() {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 10),
      new THREE.MeshBasicMaterial({ color: "red" })
    )
    mesh.name = "Cube"

    this.scene.add(mesh)
  }
}

export default World
