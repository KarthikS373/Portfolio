import * as THREE from "three"

import FloorVertexShader from "../../../assets/shaders/floor/vertex.glsl?raw"
import FloorFragmentShader from "../../../assets/shaders/floor/fragment.glsl?raw"

const FloorShaderMaterial = () => {
  const material = new THREE.RawShaderMaterial({
    vertexShader: FloorVertexShader,
    fragmentShader: FloorFragmentShader,
    uniforms: {
      uniformBackground: { value: null },
    },
    wireframe: false,
    transparent: true,
    vertexColors: true,
  })

  return material
}

export default FloorShaderMaterial
