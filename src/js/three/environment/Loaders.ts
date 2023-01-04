import { EventEmitter } from "events"

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"

import { AssetType } from "../../../assets/assets"

interface LoaderInterface {
  extensions: Array<string>
  name: string
  load: (asset: any) => void
}

class Loader extends EventEmitter {
  assets: any
  loaded: { [key: string]: any }
  loaders: Array<LoaderInterface>
  progress: number
  queue: number

  constructor() {
    super()

    this.loaded = {}

    this.queue = 0
    this.progress = 0

    this.loaders = []
    this.initLoaders()
  }

  initLoaders() {
    // Assets - Image (JPEG, JPG, PNG)
    const imageLoader: LoaderInterface = {
      extensions: ["jpeg", "jpg", "png"],
      name: "Image Loader",
      load: (_resource) => {
        const image = new Image()

        image.onload = () => {
          this.initializeAsset(_resource, image)
        }

        image.onerror = () => {
          this.initializeAsset(_resource, image)
        }

        image.src = _resource.source
      },
    }

    this.loaders.push(imageLoader)
  }

  load(assets: Array<AssetType>) {
    for (const asset of assets) {
      this.loaders[0].load(asset)
    }
  }

  initializeAsset(asset: AssetType, file: any) {
    this.loaded[asset.name] = file
    this.progress++

    console.log(this.loaded)

    this.emit("load", { asset: asset, data: file })

    if (this.progress == this.queue) {
      this.emit("loaded")
    }
  }
}

export default Loader
