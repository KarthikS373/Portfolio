import { GUI } from "dat.gui"
import * as THREE from "three"

import FloorShaderMaterial from "../../material/floor.material"
import getBufferData from "../../../utils/getBuffer.utils"

class Floor {
  gradient!: {
    tl: string
    tr: string
    bl: string
    br: string
  }
  container: THREE.Object3D<THREE.Event>
  cornerGradient!: { tl: THREE.Color; tr: THREE.Color; bl: THREE.Color; br: THREE.Color }
  debug!: GUI
  folder!: GUI
  geometry: THREE.PlaneGeometry
  material: THREE.RawShaderMaterial
  mesh: THREE.Mesh<THREE.PlaneGeometry, any>

  constructor(params: { debug?: GUI }) {
    this.container = new THREE.Object3D()
    this.container.name = "Floor"
    this.container.matrixAutoUpdate = false

    this.gradient = {
      tl: "#4a3cf0",
      tr: "#5c63f0",
      bl: "#4cb1f1",
      br: "#4cb1f1",
    }

    if (params?.debug) this.debug = params.debug

    // Geometry
    this.geometry = new THREE.PlaneGeometry(4, 4, 64, 64)

    // Material
    this.material = FloorShaderMaterial()
    this.setMaterialGradient.bind(this)()

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.updateMeshProperty()

    this.container.add(this.mesh)

    this.setDebug()
  }

  setMaterialGradient() {
    this.cornerGradient = {
      tl: new THREE.Color(this.gradient.tl),
      tr: new THREE.Color(this.gradient.tr),
      bl: new THREE.Color(this.gradient.bl),
      br: new THREE.Color(this.gradient.br),
    }

    const bufferData = getBufferData(this.cornerGradient)

    const uniformBackground = new THREE.DataTexture(bufferData, 2, 2)
    uniformBackground.magFilter = THREE.LinearFilter
    uniformBackground.needsUpdate = true

    this.material.uniforms.uniformBackground.value = uniformBackground
  }

  setDebug() {
    if (this.debug) {
      this.folder = this.debug.addFolder("Floor")

      if (this.gradient) {
        this.folder.addColor(this.gradient, "tl").name("Top left Gradient").onChange(this.setMaterialGradient.bind(this))
        this.folder.addColor(this.gradient, "tr").name("Top Right Gradient").onChange(this.setMaterialGradient.bind(this))
        this.folder.addColor(this.gradient, "bl").name("Bottom left Gradient").onChange(this.setMaterialGradient.bind(this))
        this.folder.addColor(this.gradient, "br").name("Bottom Right Gradient").onChange(this.setMaterialGradient.bind(this))
      }
    }
  }

  updateMeshProperty() {
    this.mesh.frustumCulled = false
    this.mesh.matrixAutoUpdate = false
    this.mesh.position.set(0, 0, 0)
    this.mesh.updateMatrix()
  }
}

export default Floor
