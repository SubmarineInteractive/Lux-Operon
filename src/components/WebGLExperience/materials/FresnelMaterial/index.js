import shaderParse from 'utils/shader-parse';

import vertexShader from './shaders/vert.glsl';
import fragmentShader from './shaders/frag.glsl';

/**
 * FresnelMaterial class
 */
class FresnelMaterial extends THREE.ShaderMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor( options, texture ) {
    super( options );

    this.vertexShader = shaderParse( vertexShader );
    this.fragmentShader = shaderParse( fragmentShader );

    this.gradientMap = texture;
    this.gradientMap.magFilter = this.gradientMap.minFilter = THREE.LinearFilter;

    this.transparent = true;
    this.fog = true;

    this.uniforms = THREE.UniformsUtils.merge( [
      THREE.UniformsLib[ 'fog' ],
      {
        'time': {
          type: 'f',
          value: 0.0
        },
        'gradientMap': {
          type: 't',
          value: this.gradientMap
        },
        'normalMapScale': {
          type: 'f',
          value: 1.0
        },
        'normapMapPower': {
          type: 'f',
          value: 1.0
        },
        'alpha': {
          type: 'f',
          value: 0.4
        },
        'random': {
          type: 'f',
          value: 0.0
        }
      }
    ] );
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    this.uniforms.time.value = time;
  }
}

export default FresnelMaterial;