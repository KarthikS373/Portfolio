precision mediump float;

uniform sampler2D uniformBackground;

varying vec2 varyingUv;
varying vec3 varyingColor;
varying vec3 varyingPosition;

void main() {
    vec4 backgroundColor = texture2D(uniformBackground, varyingUv);

    gl_FragColor = vec4(backgroundColor.xyz, 1.0);
}
