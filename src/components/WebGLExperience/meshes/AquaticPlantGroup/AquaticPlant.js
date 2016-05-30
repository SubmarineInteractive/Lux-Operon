import GradientMaterial from '../../materials/GradientMaterial';
import randomFloat from 'utils/random-float';

/**
 * AquaticPlant class
 */
class AquaticPlant extends THREE.Object3D {

  /**
   * constructor function
   * @param {Object} options Options
   */
  constructor({ model, texture, preset }) {
    super();

    this.model = model;
    this.texture = texture;

    this.modelObject = this.model.children[ 0 ];
    this.modelObject.material = new GradientMaterial({ texture: this.texture, preset });
    this.modelObject.material.uniforms.random.value = randomFloat( 0.1, 1 );

    this.add( this.model );
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    this.modelObject.material.update( time );
  }
}

export default AquaticPlant;