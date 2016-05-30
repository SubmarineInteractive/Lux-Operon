uniform float opacity;
uniform sampler2D gradientTexture;

uniform int luminanceSteps;
uniform float luminanceBoost;

varying vec2 vUv;

// chunk(common);
// chunk(bsdfs);
// chunk(fog_pars_fragment);

vec4 applyLuminanceStepping( vec4 color ) {

  float sum = color.r + color.g + color.b;
  float luminance = sum / 3.0;
  vec3 ratios = vec3( color.r / luminance, color.g / luminance, color.b / luminance );

  float luminanceStep = 1.0 / float( luminanceSteps );
  float luminanceBin = ceil( luminance / luminanceStep );
  float luminanceFactor = luminanceStep * luminanceBin + luminanceBoost;

  return vec4( ratios * luminanceFactor, 1.0 );
}

void main() {

  vec3 outgoingLight = vec3( 0.0 );

  vec4 gradientColor = texture2D( gradientTexture, vUv );
  vec4 lum = applyLuminanceStepping( gradientColor );

  outgoingLight += gradientColor.rgb * lum.rgb;

  // chunk(fog_fragment);

  gl_FragColor = vec4( outgoingLight.rgb, opacity );
}