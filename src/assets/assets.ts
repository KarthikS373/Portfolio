export type AssetType = { name: string; path: string; type: "texture" | "model" | "image" | "video" }

const assets: Array<AssetType> = []

const _assets: Array<AssetType> = [
  {
    name: "testTexture",
    path: "testTextureJpeg.jpeg",
    type: "texture",
  },
  {
    name: "testTexture",
    path: "testTextureJpg.jpg",
    type: "texture",
  },
  {
    name: "testTexturePng",
    path: "testTexture.png",
    type: "texture",
  },
  {
    name: "testModel.gltf",
    path: "testModel.gltf",
    type: "model",
  },
  {
    name: "testModel.glb",
    path: "testModel.glb",
    type: "model",
  },
  {
    name: "testModel.fbx",
    path: "testModel.fbx",
    type: "model",
  },
  {
    name: "testModel.drc",
    path: "testModel.drc",
    type: "model",
  },
  {
    name: "testModel",
    path: "testModel.blend",
    type: "model",
  },
  {
    name: "testImagePng",
    path: "testImage.png",
    type: "image",
  },
  {
    name: "testVideo.mp4",
    path: "testVideo.mp4",
    type: "video",
  },
]

export default assets
