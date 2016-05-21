import { shaderParse } from 'utils';
import vertexShader from './shader/vert.glsl';
import fragmentShader from './shader/frag.glsl';

/**
 * WavesMaterial class
 */
class WavesMaterial extends THREE.ShaderMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor({ uniforms, ...options }) {
    super({
      vertexShader: shaderParse( vertexShader ),
      fragmentShader: shaderParse( fragmentShader ),
      ...options
    });

    this.uniforms = THREE.UniformsUtils.merge( [
      THREE.UniformsLib[ 'fog' ],
      THREE.UniformsLib[ 'lights' ],
      THREE.UniformsLib[ 'ambient' ],
      uniforms
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

export default WavesMaterial;