#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform sampler2D map;
uniform float useMap;
uniform float useDash;
uniform float dashSize;
uniform float gapSize;
uniform float opacity;

varying vec2 vUV;
varying vec4 vColor;
varying float vLineDistance;

void main() {

  float totalSize = dashSize + gapSize;
  vec4 c = vColor;
  vec2 nUV = vUV;

  if( useMap == 1. ) {
    c = texture2D( map, nUV );
    c.a = c.a * opacity;
  }

  if( useDash == 1. && totalSize >= 1.) {
    nUV.x = mod(vLineDistance, totalSize) / dashSize;

    if( mod( vLineDistance, totalSize ) >= dashSize ) {
      discard;
    }
  }

  gl_FragColor = c;
}