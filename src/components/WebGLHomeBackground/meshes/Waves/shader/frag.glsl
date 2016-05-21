uniform float time;

uniform vec3 diffuse;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

varying vec3 vViewPosition;
varying vec3 vNormal;

// chunk(common);
// chunk(bsdfs);
// chunk(ambient_pars);
// chunk(lights_pars);

void main() {

  vec3 outgoingLight = vec3( 0.0 );
  vec4 diffuseColor = vec4( diffuse, opacity );

  vec3 viewPosition = normalize( vViewPosition );

  vec3 totalDiffuseLight = vec3( 0.0 );
  vec3 totalSpecularLight = vec3( 0.0 );

  #if NUM_POINT_LIGHTS > 0

    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

      vec3 lVector = pointLights[ i ].position + vViewPosition.xyz;

      float attenuation = calcLightAttenuation( length( lVector ), pointLights[ i ].distance, pointLights[ i ].decay );

      lVector = normalize( lVector );

      vec3 pointHalfVector = normalize( lVector + viewPosition );

      float pointDotNormalHalf = max( dot( vNormal, pointHalfVector ), 0.0 );
      float pointDiffuseWeight = max( dot( vNormal, lVector ), 0.0 );

      float pointSpecularWeight = max( pow( pointDotNormalHalf, shininess ), 0.0 );

      totalDiffuseLight += attenuation * pointLights[ i ].color * pointDiffuseWeight;
      totalSpecularLight += attenuation * pointLights[ i ].color * specular * pointSpecularWeight * pointDiffuseWeight;

    }

  #endif

  outgoingLight += diffuseColor.xyz * ( totalDiffuseLight + ambientLightColor + totalSpecularLight );

  gl_FragColor = vec4( outgoingLight, diffuseColor.a );

}