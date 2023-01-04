uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 color;
attribute vec3 position;
attribute vec2 uv;

varying vec2 varyingUv;
varying vec3 varyingPosition;
varying vec3 varyingColor;

void main() {
    vec4 modelPosition = vec4(position, 1.0);
    modelPosition.z += 1.0;
    
    gl_Position = modelPosition;

    // Varying - Pass to Fragment shader
    varyingUv = uv;
    varyingPosition = position;
    varyingColor = color;
}
