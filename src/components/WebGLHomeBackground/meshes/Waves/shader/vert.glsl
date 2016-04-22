#pragma glslify: cnoise2 = require(glsl-noise/classic/2d);

uniform float time;
uniform float speed;
uniform float amplitude;

varying vec3 vViewPosition;
varying vec3 vNormal;

void main() {

  vNormal = normal;

  float displacement = amplitude * cnoise2( vec2( position * 0.05 ) + time * speed );
  vec3 newPosition = position + normal * displacement;

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  vViewPosition = - mvPosition.xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}