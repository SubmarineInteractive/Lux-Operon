uniform float time;
uniform float random;

uniform float fishLength;
uniform float fishWaveLength;
uniform float fishWaveSpeed;
uniform float fishBendAmount;
uniform float fishOffset;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying mat4 vModelMatrix;
varying vec3 vI;

void main() {

  vNormal = normalize( normal );
  vModelMatrix = modelMatrix;

  float mult = -position.z / fishLength * 2.0 - fishOffset;
  float s = sin( ( time + random * 10.0 ) * fishWaveSpeed + mult * fishWaveLength );
  float offset = pow( mult, 2.0 ) * s * ( fishBendAmount * random );

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 ) + vec4( offset, 0.0, 0.0, 0.0 );
  vViewPosition = - mvPosition.xyz;

  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );

  vec3 I = ( worldPosition.xyz ) - cameraPosition;
  vI = I;

  gl_Position = projectionMatrix * mvPosition;

}