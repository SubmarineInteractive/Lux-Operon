import Emitter from 'helpers/Emitter';
import Fish from './Fish';

import {
  EXP_FISH_GET_POSITION,
  EXP_FISH_GROUP_POSITION_SENDED
} from 'config/messages';

/**
 * FishGroup class
 */
class FishGroup extends THREE.Group {

  /**
   * constructor function
   * @param {Object} configuration Configuration
   * @param {Object} resources     Resources
   */
  constructor({ count, species, position, luxAmount }, resources, curve ) {
    super();

    this.bind();

    this.addListeners();

    this.fishes = [];

    this.curve = curve;

    this.pathPosition = position;

    for ( let i = 0; i < count; i++ ) {
      const model = resources[ species ].clone();
      const fish = new Fish( model, resources.fishGradientTexture, curve );

      this.fishes.push( fish );
      this.add( fish );
    }
  }

  bind() {

    this.getPosition = this.getPosition.bind( this );
  }

  addListeners() {

    Emitter.on( EXP_FISH_GET_POSITION, this.getPosition );
  }

  getPosition() {

    const positions = [];

    for ( let i = 0; i < this.fishes.length; i++ ) {

      positions.push( this.fishes[ i ].position.clone().add( this.pathPosition ) );

    }

    Emitter.emit( EXP_FISH_GROUP_POSITION_SENDED, positions );

    return positions;

  }

  update( time ) {
    for ( let i = 0; i < this.fishes.length; i++ ) {
      this.fishes[ i ].update( time );
    }
  }
}

export default FishGroup;
