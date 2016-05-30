uniform float time;
uniform float random;

uniform float useWave;
uniform float modelLength;
uniform float waveLength;
uniform float waveSpeed;
uniform float waveBendAmount;
uniform float waveOffset;

varying vec2 vUv;

void main() {

  vUv = uv;

  float mult = - position.y / modelLength * 2.0 - waveOffset;
  float s = sin( ( time + random * 10.0 ) * waveSpeed + mult * waveLength );
  float offset = pow( mult, 2.0 ) * s * ( waveBendAmount * random );

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 ) + vec4( offset, 0.0, 0.0, 0.0 ) * step( 1.0, useWave );

  gl_Position = projectionMatrix * mvPosition;
}