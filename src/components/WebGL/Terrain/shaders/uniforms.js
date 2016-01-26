export default THREE.UniformsUtils.merge([
  THREE.UniformsLib[ "fog" ],
  THREE.UniformsLib[ "lights" ],
  THREE.UniformsLib[ "shadowmap" ],
  {
    "enableDiffuse1"    : { type: "i", value: 0 },
    "enableDiffuse2"    : { type: "i", value: 0 },
    "enableSpecular"    : { type: "i", value: 0 },
    "enableReflection"  : { type: "i", value: 0 },

    "tDiffuse1"         : { type: "t", value: null },
    "tDiffuse2"         : { type: "t", value: null },
    "tDetail"           : { type: "t", value: null },
    "tNormal"           : { type: "t", value: null },
    "tSpecular"         : { type: "t", value: null },
    "tDisplacement"     : { type: "t", value: null },

    "uNormalScale"      : { type: "f", value: 1.0 },

    "uDisplacementBias" : { type: "f", value: 0.0 },
    "uDisplacementScale": { type: "f", value: 1.0 },

    "diffuse"           : { type: "c", value: new THREE.Color( 0xeeeeee ) },
    "specular"          : { type: "c", value: new THREE.Color( 0x111111 ) },
    "shininess"         : { type: "f", value: 30 },
    "opacity"           : { type: "f", value: 1 },

    "uRepeatBase"       : { type: "v2", value: new THREE.Vector2( 1, 1 ) },
    "uRepeatOverlay"    : { type: "v2", value: new THREE.Vector2( 1, 1 ) },

    "uOffset"           : { type: "v2", value: new THREE.Vector2( 0, 0 ) }
  }
]);