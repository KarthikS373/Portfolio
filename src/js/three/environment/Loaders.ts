import { EventEmitter } from "events"

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"

import { AssetType } from "../../../assets/assets"
import getExtension from "../../utils/getExtension.utils"

interface LoaderInterface {
  extensions: Array<string>
  name: string
  load: (asset: AssetType) => void
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
    this.loaders.push({
      name: "Image Loader",
      extensions: ["jpeg", "jpg", "png"],
      load: (asset: AssetType) => {
        const image = new Image()

        image.onload = () => {
          this.initializeAsset(asset, image)
        }

        image.onerror = () => {
          this.initializeAsset(asset, image)
        }

        image.src = asset.path
      },
    })

    // Draco - Models (DRC)
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderConfig({ type: "js" })
    dracoLoader.setDecoderPath("/draco/")

    this.loaders.push({
      name: "Draco Loader",
      extensions: ["drc"],
      load: (asset: AssetType) => {
        dracoLoader.load(
          asset.path,
          (file) => {
            this.initializeAsset(asset, file)
          },
          (xhr: ProgressEvent<EventTarget>) => {
            console.log(`${xhr.loaded} / ${xhr.total} loaded`)
          },
          (err: ErrorEvent) => {
            console.warn(`There was an error loading Draco model : ${asset.name} - ${err.message}`)
          }
        )
      },
    })

    // GLTF - Models (GLTF, GLB, GLTF-Embedded, GLTF-Draco compressed)
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    this.loaders.push({
      name: "GLTF Loader",
      extensions: ["gltf", "glb"],
      load: (asset: AssetType) => {
        gltfLoader.load(
          asset.path,
          (file) => {
            this.initializeAsset(asset, file)
          },
          (xhr: ProgressEvent<EventTarget>) => {
            console.log(`${xhr.loaded} / ${xhr.total} loaded`)
          },
          (err: ErrorEvent) => {
            console.warn(`There was an error loading GLTF model : ${asset.name} - ${err.message}`)
          }
        )
      },
    })

    // FBX - Models (FBX)
    const fbxLoader = new FBXLoader()

    this.loaders.push({
      name: "FBX Loader",
      extensions: ["fbx"],
      load: (asset: AssetType) => {
        fbxLoader.load(asset.path, (file) => {
          this.initializeAsset(asset, file)
        }),
          (xhr: ProgressEvent<EventTarget>) => {
            console.log(`${xhr.loaded} / ${xhr.total} loaded`)
          },
          (err: ErrorEvent) => {
            console.warn(`There was an error loading FBX model : ${asset.name} - ${err.message}`)
          }
      },
    })
  }

  load(assets: Array<AssetType>) {
    for (const asset of assets) {
      this.queue++
      const ext = getExtension(asset.path).extension
      // console.log(ext)

      if (typeof ext === "undefined") {
        console.warn(`Invalid file type: ${asset.name}`)
        continue
      }

      const loader = this.loaders.find((match) => match.extensions.find((_ext) => ext === _ext))
      if (!loader) {
        console.warn(`No loader found: ${asset.name}`)
        continue
      }

      loader.load(asset)
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
