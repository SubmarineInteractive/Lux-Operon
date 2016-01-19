const glslify = require('glslify')
import HMR from '../../helpers/HMR'

// Cache instance
const cacheInst = __DEV__ ? HMR.cache(__filename) : null

// Shaders
const vertexShader = glslify('./shaders/vert.glsl')
const fragmentShader = glslify('./shaders/frag.glsl')

/**
 * MeshLineMaterial class
 */
class MeshLineMaterial extends THREE.Material {

  /**
   * Constructor function
   * @param  {object} parameters Parameters
   * @return {object}            Material
   */
  constructor( parameters = {} ) {
    super()

    for ( let parameter in parameters ) {
      this[ parameter ] = parameters[ parameter ]
    }

    const material = new THREE.RawShaderMaterial({
      uniforms: {
        lineWidth:       { type: 'f',  value: this.lineWidth || 1 },
        map:             { type: 't',  value: this.map || null },
        useMap:          { type: 'f',  value: this.useMap || false },
        color:           { type: 'c',  value: this.useMap ? false : this.color || new THREE.Color( 0x0ffffff ) },
        opacity:         { type: 'f',  value: this.opacity || 1 },
        resolution:      { type: 'v2', value: this.resolution || new THREE.Vector2( 1, 1 ) },
        sizeAttenuation: { type: 'f',  value: this.sizeAttenuation || 1 },
        useDash:         { type: 'f',  value: this.useDash || false },
        speed:           { type: 'f',  value: this.speed || 1 },
        dashSize:        { type: 'f',  value: this.dashSize || 0 },
        gapSize:         { type: 'f',  value: this.gapSize || 0 },
        time:            { type: 'f',  value: 0 }
      },
      vertexShader:   vertexShader,
      fragmentShader: fragmentShader
    })

    if( __DEV__ ) {
      HMR.enable(cacheInst, material)
    }

    for( let property in material.uniforms ) {
      delete parameters[ property ]
    }

    material.type = 'MeshLineMaterial'
    material.setValues( parameters )

    return material
  }
}

// HMR
if ( module.hot && __DEV__ ) {
  module.hot.accept(err => { if( err ) throw errr })
  HMR.update(cacheInst, {
    vertexShader, fragmentShader
  })
}

export default MeshLineMaterial