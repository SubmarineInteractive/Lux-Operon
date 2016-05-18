uniform float time;
uniform float random;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying mat4 vModelMatrix;
varying vec3 vI;

void main() {

  vNormal = normalize( normal );
  vModelMatrix = modelMatrix;

  float fishLength = 730.0;
  float fishWaveLength = 2.0;
  float fishWaveSpeed = 3.0;
  float fishBendAmount = 10.0;
  float fishOffset = 1.5;

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