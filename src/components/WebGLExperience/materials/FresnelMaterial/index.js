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

    this.gradientTexture = texture;
    this.gradientTexture.magFilter = this.gradientTexture.minFilter = THREE.LinearFilter;

    this.transparent = true;
    this.fog = true;

    this.uniforms = {
      ...THREE.UniformsLib[ 'fog' ],
      'time': {
        type: 'f',
        value: 0.0
      },
      'gradientTexture': {
        type: 't',
        value: this.gradientTexture
      },
      'alpha': {
        type: 'f',
        value: 0.5
      },
      'random': {
        type: 'f',
        value: 0.0
      }
    };
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