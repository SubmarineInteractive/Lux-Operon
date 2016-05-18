uniform int id;
uniform int useLights;

uniform sampler2D gradientTexture;
uniform float gradientProgress;
uniform float opacity;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying mat4 vModelMatrix;
varying vec3 vI;

// chunk(common);
// chunk(bsdfs);
// chunk(lights_pars);
// chunk(fog_pars_fragment);

void main() {

  // Compute world normal
  vec3 worldNormal = normalize( mat3( vModelMatrix[0].xyz, vModelMatrix[1].xyz, vModelMatrix[2].xyz ) * vNormal );

  // Compute fresnel reflection factor
  float reflectionFactor = abs( dot( normalize( vI ), worldNormal ) );

  // Mix gradients for hover effect
  vec4 gradientColor1 = texture2D( gradientTexture, vec2( reflectionFactor, 1 ) );
  vec4 gradientColor2 = texture2D( gradientTexture, vec2( reflectionFactor, 0.99 ) );

  // Final gradient color and alpha
  vec4 gradientColor = mix( gradientColor1, gradientColor2, gradientProgress );
  float gradientOpacity = clamp( opacity + ( 1.0 - reflectionFactor ), 0.0, 1.0 );

  // Point lights
  vec3 outgoingLight = vec3( 0.0 );
  vec4 diffuseColor = vec4( gradientColor.rgb, gradientOpacity );

  vec3 viewPosition = normalize( vViewPosition );

  vec3 totalDiffuseLight = vec3( 1.0 );

  #if NUM_POINT_LIGHTS > 0

    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

      if( i == id && useLights == 1 ) {

        vec3 lVector = pointLights[ i ].position + vViewPosition.xyz;

        float attenuation = punctualLightIntensityToIrradianceFactor( length( lVector ), pointLights[ i ].distance, pointLights[ i ].decay );

        lVector = normalize( lVector );

        vec3 pointHalfVector = normalize( lVector + viewPosition );

        float pointDotNormalHalf = max( dot( vNormal, pointHalfVector ), 0.0 );
        float pointDiffuseWeight = max( dot( vNormal, lVector ), 0.0 );

        totalDiffuseLight = attenuation * pointLights[ i ].color * pointDiffuseWeight;

      }

    }

  #endif

  outgoingLight += diffuseColor.xyz * totalDiffuseLight;

  gl_FragColor = vec4( outgoingLight.rgb, gradientOpacity );

  // chunk(fog_fragment);

}