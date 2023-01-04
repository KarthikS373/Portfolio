export type AssetType = { name: string; path: string; type: "texture" | "model" | "image" | "video" }

const assets: Array<AssetType> = [
  {
    name: "testTexture",
    path: "",
    type: "texture",
  },
  {
    name: "testModel.gltf",
    path: "",
    type: "model",
  },
  {
    name: "testModel.glb",
    path: "",
    type: "model",
  },
  {
    name: "testModel.fbx",
    path: "",
    type: "model",
  },
  {
    name: "testModel.drc",
    path: "",
    type: "model",
  },
  {
    name: "testModel",
    path: "",
    type: "model",
  },
  {
    name: "testImage",
    path: "",
    type: "image",
  },
  {
    name: "testVideo",
    path: "",
    type: "video",
  },
]

export default assets
