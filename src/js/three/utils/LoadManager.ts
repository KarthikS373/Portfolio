import * as THREE from "three"
import { EventEmitter } from "events"

import Loader from "../environment/Loaders"
import assets from "../../../assets/assets"

class LoadManager extends EventEmitter {
  loader: Loader
  items: { [key: string]: any }

  constructor() {
    super()

    this.loader = new Loader()
    this.items = {}

    this.initLoad()
    this.setupProgressTracker()
  }

  initLoad() {
    this.loader.load(assets)
  }

  setupProgressTracker() {
    this.loader.on("load", ({ asset, data }) => {
      this.items[asset.name] = data
      console.log(`${asset.name} Loaded`)

      if (asset.type == "texture") {
        const texture = new THREE.Texture()

        texture.image = data
        texture.needsUpdate = true

        this.items[`${asset.name}Texture`] = texture
      }

      this.emit("load", [this.loader.progress / this.loader.queue])
    })

    this.loader.on("loaded", () => {
      this.emit("ready")
    })
  }
}

export default LoadManager
