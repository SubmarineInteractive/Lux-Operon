import shaderParse from 'utils/shader-parse';

import vertexShader from './shaders/vert.glsl';
import fragmentShader from './shaders/frag.glsl';

/**
 * GradientMaterial class
 */
class GradientMaterial extends THREE.ShaderMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor({ texture, preset, ...options }) {
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
      'opacity': {
        type: 'f',
        value: 0.9
      },
      'random': {
        type: 'f',
        value: 1.0
      },
      'gradientTexture': {
        type: 't',
        value: this.gradientTexture
      },
      'luminanceSteps': {
        type: 'i',
        value: 2
      },
      'luminanceBoost': {
        type: 'f',
        value: 0.1
      },
      'useWave': {
        type: 'f',
        value: true
      },
      'modelLength': {
        type: 'f',
        value: 650.0
      },
      'waveLength': {
        type: 'f',
        value: 3.0
      },
      'waveSpeed': {
        type: 'f',
        value: 1.0
      },
      'waveBendAmount': {
        type: 'f',
        value: 10.0
      },
      'waveOffset': {
        type: 'f',
        value: 1.0
      }
    };

    if( preset.material && preset.material.uniforms ) {
      this.uniforms = {
        ...this.uniforms,
        ...preset.material.uniforms
      };
    }
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    this.uniforms.time.value = time;
  }
}

export default GradientMaterial;