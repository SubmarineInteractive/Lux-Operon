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
    this.lights = true;
    this.side = THREE.DoubleSide;

    this.uniforms = {
      ...THREE.UniformsLib[ 'fog' ],
      ...THREE.UniformsLib[ 'lights' ],
      'id': {
        type: 'i',
        value: 0
      },
      'time': {
        type: 'f',
        value: 0.0
      },
      'gradientTexture': {
        type: 't',
        value: this.gradientTexture
      },
      'gradientProgress': {
        type: 'f',
        value: 0.0
      },
      'random': {
        type: 'f',
        value: 0.0
      },
      'opacity': {
        type: 'f',
        value: 1
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