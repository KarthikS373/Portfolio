import { GUI } from "dat.gui"
import * as THREE from "three"

import Experience from ".."
import Renderer from "./Renderer"
import Sizes from "../utils/Sizes"
import Tick from "../utils/Tick"
import { SetupType } from "../../definitions/experienceSetup.types"

class Camera {
  setup: SetupType
  camera!: {
    perspectiveCamera: THREE.PerspectiveCamera
    orthographicCamera: THREE.OrthographicCamera
  }
  container: THREE.Object3D<THREE.Event>
  components: Experience
  debug: GUI
  easing: number
  folder!: GUI
  helper!: {
    perspectiveCameraHelper: THREE.CameraHelper
    orthographicCameraHelper: THREE.CameraHelper
  }
  renderer: Renderer
  scene: THREE.Scene
  sizes: Sizes
  target: THREE.Vector3
  targetEased: THREE.Vector3
  time: Tick

  constructor() {
    this.components = new Experience()

    this.time = this.components.time
    this.sizes = this.components.sizes
    this.scene = this.components.scene
    this.renderer = this.components.renderer
    this.debug = this.components.debug
    this.setup = this.components.setup

    this.container = new THREE.Object3D()
    this.container.matrixAutoUpdate = false

    this.target = new THREE.Vector3(0, 0, 0)
    this.targetEased = new THREE.Vector3(0, 0, 0)
    this.easing = 0.15

    this.initCamera()

    this.setDebug()
  }

  initCamera() {
    this.camera = {
      perspectiveCamera: new THREE.PerspectiveCamera(this.sizes.fov, this.sizes.aspect, this.sizes.near, this.sizes.far),
      orthographicCamera: new THREE.OrthographicCamera(this.sizes.edges.left, this.sizes.edges.right, this.sizes.edges.top, this.sizes.edges.bottom, this.sizes.edges.near, this.sizes.edges.far),
    }

    this.camera.perspectiveCamera.position.set(0, 2, -20)
    this.camera.perspectiveCamera.lookAt(new THREE.Vector3())
    this.scene.add(this.camera.perspectiveCamera)
  }

  setDebug() {
    if (this.debug) {
      this.helper = {
        orthographicCameraHelper: new THREE.CameraHelper(this.camera.orthographicCamera),
        perspectiveCameraHelper: new THREE.CameraHelper(this.camera.perspectiveCamera),
      }

      this.scene.add(this.helper.orthographicCameraHelper)

      this.scene.add(this.helper.perspectiveCameraHelper)

      this.folder = this.debug.addFolder("Camera")

      // Perspective camera
      const debugPerspectiveCamera = this.folder.addFolder("Perspective Camera")

      debugPerspectiveCamera.add(this.camera.perspectiveCamera.position, "x").min(-25).max(25).step(0.1).name("position X")
      debugPerspectiveCamera.add(this.camera.perspectiveCamera.position, "y").min(-25).max(25).step(0.1).name("position Y")
      debugPerspectiveCamera.add(this.camera.perspectiveCamera.position, "z").min(-25).max(25).step(0.1).name("position Z")

      // Orthographic camera
      const debugOrthographicCamera = this.folder.addFolder("Orthographic Camera")

      debugOrthographicCamera.add(this.camera.orthographicCamera.position, "x").min(-25).max(25).step(0.1).name("position X")
      debugOrthographicCamera.add(this.camera.orthographicCamera.position, "y").min(-25).max(25).step(0.1).name("position Y")
      debugOrthographicCamera.add(this.camera.orthographicCamera.position, "z").min(-25).max(25).step(0.1).name("position Z")
    }
  }

  control() {
    this.camera.perspectiveCamera.fov = this.sizes.fov
    this.camera.perspectiveCamera.near = this.sizes.near
    this.camera.perspectiveCamera.far = this.sizes.far

    this.camera.orthographicCamera.near = this.sizes.edges.near
    this.camera.orthographicCamera.far = this.sizes.edges.far
  }

  resize() {
    // Resizing perspective camera
    this.camera.perspectiveCamera.aspect = this.sizes.aspect
    this.camera.perspectiveCamera.updateProjectionMatrix()

    // Resizing orthographic camera
    this.camera.orthographicCamera.left = (-1 * this.sizes.aspect * this.sizes.frustrum) / 2
    this.camera.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2
    this.camera.orthographicCamera.top = this.sizes.frustrum / 2
    this.camera.orthographicCamera.bottom = (-1 * this.sizes.frustrum) / 2
    this.camera.orthographicCamera.updateProjectionMatrix()
  }

  update() {}
}

export default Camera
