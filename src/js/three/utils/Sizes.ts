import { GUI } from "dat.gui"
import { EventEmitter } from "events"
import Experience from ".."

class Sizes extends EventEmitter {
  width: number
  height: number
  aspect: number
  components: Experience
  devicePixelRatio: number
  fov: number
  near: number
  far: number
  frustrum: number
  edges: { left: number; right: number; top: number; bottom: number; near: number; far: number }
  debug!: GUI
  folder!: GUI

  constructor() {
    super()

    this.components = new Experience()

    this.width = window.innerWidth
    this.height = window.innerHeight
    this.aspect = this.width / this.height
    this.devicePixelRatio = Math.max(2, window.devicePixelRatio)

    this.debug = this.components.debug

    // Perspective camera
    this.fov = 75
    this.near = 0.1
    this.far = 1000

    // Orthographic camera
    this.frustrum = 5
    this.edges = {
      left: (-1 * this.aspect * this.frustrum) / 2,
      right: (this.aspect * this.frustrum) / 2,
      top: this.frustrum / 2,
      bottom: (-1 * this.frustrum) / 2,
      near: -50,
      far: 50,
    }

    this.resizeEvent()
    this.setDebug()
  }

  resizeEvent() {
    window.addEventListener("resize", (_) => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.aspect = this.width / this.height
      this.devicePixelRatio = Math.max(2, window.devicePixelRatio)

      this.emit("resize")
    })
  }

  setDebug() {
    if (this.debug) {
      this.folder = this.debug.addFolder("Size")

      // Perspective Camera
      const debugPerspectiveCamera = this.folder.addFolder("Perspective Camera")

      debugPerspectiveCamera.add(this, "fov").min(0).max(180).step(1).name("Field of View").onFinishChange(() => this.emit('control'))
      debugPerspectiveCamera.add(this, "near").min(0.0001).max(1000).step(0.0001).name("Near point").onFinishChange(() => this.emit('control'))
      debugPerspectiveCamera.add(this, "far").min(100).max(10000).step(10).name("Far point").onFinishChange(() => this.emit('control'))

      // Orthographic camera
      const debugOrthographicCamera = this.folder.addFolder("Orthographic Camera")

      debugOrthographicCamera.add(this, "frustrum").min(1).max(20).step(0.5).name("Frustrum").onFinishChange(() => this.emit('control'))
      debugOrthographicCamera.add(this.edges, "near").min(-1000).max(1000).step(10).name("Near point").onFinishChange(() => this.emit('control'))
      debugOrthographicCamera.add(this.edges, "far").min(-1000).max(1000).step(10).name("Far point").onFinishChange(() => this.emit('control'))
    }
  }
}

export default Sizes
