import SmallAquaticPlant from './SmallAquaticPlant';
import BigAquaticPlant from './BigAquaticPlant';
import randomInt from 'utils/random-int';

/**
 * AquaticPlantGroup class
 */
class AquaticPlantGroup extends THREE.Object3D {

  /**
   * constructor function
   * @param {Object} options Options
   */
  constructor({ terrain, model, texture, preset }) {
    super();

    this.preset = preset;
    this.terrain = terrain;
    this.model = model;
    this.texture = texture;

    this.smallPlants = [];
    this.bigPlants = [];

    this.numberSmallPlants = {
      last: this.preset.group ? this.preset.group.numberSmallPlants : 50,
      value: this.preset.group ? this.preset.group.numberSmallPlants : 50,
      range: [ 0, 200 ]
    };

    this.numberBigPlants = {
      last: this.preset.group ? this.preset.group.numberBigPlants : 25,
      value: this.preset.group ? this.preset.group.numberBigPlants : 25,
      range: [ 0, 100 ]
    };

    // Small plants
    for ( let i = 0; i < this.numberSmallPlants.value; i++ ) {

      const plant = new SmallAquaticPlant({ model: this.model.clone(), texture: this.texture, preset: this.preset });

      this.add( plant );
      this.smallPlants.push( plant );
    }

    // Big plants
    for ( let i = 0; i < this.numberBigPlants.value; i++ ) {

      const plant = new BigAquaticPlant({ model: this.model.clone(), texture: this.texture, preset: this.preset });

      this.add( plant );
      this.bigPlants.push( plant );
    }
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    for ( let i = 0; i < this.smallPlants.length; i++ ) {
      this.smallPlants[ i ].update( time );
    }

    for ( let i = 0; i < this.bigPlants.length; i++ ) {
      this.bigPlants[ i ].update( time );
    }
  }
}

export default AquaticPlantGroup;