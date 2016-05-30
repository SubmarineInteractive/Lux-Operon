import AquaticPlant from './AquaticPlant';
import randomInt from 'utils/random-int';
import randomFloat from 'utils/random-float';

/**
 * SmallAquaticPlant class
 */
class SmallAquaticPlant extends AquaticPlant {

  /**
   * constructor function
   * @param {Object} options Options
   */
  constructor( options ) {
    super( options );

    if( options.preset.material && options.preset.material.smallPlants ) {
      this.modelObject.material.uniforms = {
        ...this.modelObject.material.uniforms,
        ...options.preset.material.smallPlants.uniforms
      };
    }

    const defaultRandomPosition = { min: -300, max: 300 };
    const randomPosition = options.preset.mesh ? options.preset.mesh.randomPosition : defaultRandomPosition;

    this.position.x = randomInt( randomPosition.min, randomPosition.max );
    this.position.z = randomInt( randomPosition.min, randomPosition.max );

    const defaultRandomScale = { min: 0.4, max: 0.8 };
    const randomScale = options.preset.mesh ? options.preset.mesh.smallPlants.scale : defaultRandomScale;

    const scale = randomFloat( randomScale.min, randomScale.max );
    this.scale.copy( new THREE.Vector3( scale, scale, scale ) );
  }
}

export default SmallAquaticPlant;