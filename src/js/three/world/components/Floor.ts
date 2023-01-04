import * as THREE from "three"

class Floor {
  colors!: {
    topLeft: string
    topRight: string
    bottomRight: string
    bottomLeft: string
  }
  container: THREE.Object3D<THREE.Event>
  geometry: THREE.PlaneGeometry
  material: THREE.MeshBasicMaterial
  mesh: THREE.Mesh<THREE.PlaneGeometry, any>

  constructor() {
    this.container = new THREE.Object3D()
    this.container.name = "Floor"
    this.container.matrixAutoUpdate = false

    // Geometry
    this.geometry = new THREE.PlaneGeometry(25, 25, 10, 10)

    // Material
    this.material = new THREE.MeshBasicMaterial({
      color: "red",
      side: THREE.DoubleSide,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.frustumCulled = false
    this.mesh.matrixAutoUpdate = false
    this.mesh.updateMatrix()

    this.container.add(this.mesh)
  }
}

export default Floor
