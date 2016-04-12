import { shaderParse } from 'utils';
import vertexShader from './shader/vert.glsl';
import fragmentShader from './shader/frag.glsl';

/**
 * PlaneMaterial class
 */
class PlaneMaterial extends THREE.ShaderMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor( options ) {
    super({ vertexShader: shaderParse( vertexShader ), fragmentShader: shaderParse( fragmentShader ), ...options });

    this.lights = true;
    this.side = THREE.DoubleSide;

    this.uniforms = THREE.UniformsUtils.merge( [
      THREE.UniformsLib[ 'fog' ],
      THREE.UniformsLib[ 'lights' ],
      {
        time: { type: 'f', value: 0.0 },
        speed: { type: 'f', value: 0.2 },
        amplitude: { type: 'f', value: 150.0 },
        diffuse: { type: 'c', value: new THREE.Color( 0x2b687e ) },
        specular: { type: 'c', value: new THREE.Color( 0x000000 ) },
        shininess: { type: 'f', value: 1000 },
        opacity: { type: 'f', value: 1 }
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

export default PlaneMaterial;