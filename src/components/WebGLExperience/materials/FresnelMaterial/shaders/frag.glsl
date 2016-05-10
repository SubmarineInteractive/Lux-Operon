uniform sampler2D gradientTexture;
uniform float alpha;

varying vec3 vNormal;
varying mat4 vModelMatrix;
varying vec3 vI;

// chunk(common);
// chunk(fog_pars_fragment);

void main() {

  // Compute world normal
  vec3 worldNormal = normalize( mat3( vModelMatrix[0].xyz, vModelMatrix[1].xyz, vModelMatrix[2].xyz ) * vNormal );

  // Compute fresnel reflection factor
  float reflectionFactor = abs( dot( normalize( vI ), worldNormal ) );

  vec4 gradientColor = texture2D( gradientTexture, vec2( reflectionFactor, 1.0 ) );
  float gradientAlpha = clamp( alpha + ( 1.0 - reflectionFactor ), 0.0, 1.0 );

  gl_FragColor = vec4( gradientColor.rgb, gradientAlpha );

  // chunk(fog_fragment);
}