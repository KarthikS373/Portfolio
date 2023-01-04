import { EventEmitter } from "events"

import Loader from "../environment/Loaders"
import assets from "../../../assets/assets"

class LoadManager extends EventEmitter {
  loader: Loader
  items: {}

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
      console.log(`${asset.name} Loaded`)
    })
  }
}

export default LoadManager
