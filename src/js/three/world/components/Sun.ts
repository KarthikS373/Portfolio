import { GUI } from "dat.gui"
import * as THREE from "three"

class Sun {
  container: THREE.Object3D<THREE.Event>
  debug!: GUI
  folder!: GUI
  sun: {
    position?: THREE.Vector3
    vector?: THREE.Vector3
    helper?: THREE.ArrowHelper
  } 

  constructor(params: { debug?: GUI }) {
    this.container = new THREE.Object3D()
    this.container.name = "Floor"
    this.container.matrixAutoUpdate = false

    if (params?.debug) this.debug = params.debug

    this.sun = {}
    this.sun.position = new THREE.Vector3(-2.5, -2.65, 3.75)
    this.sun.vector = new THREE.Vector3()
    this.sun.helper = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 3), new THREE.Vector3(0, 0, 0), 10, 0xffffff, 1, 0.5)
    this.container.add(this.sun.helper)

    this.setDebug()
  }

  setDebug() {}
}

export default Sun
