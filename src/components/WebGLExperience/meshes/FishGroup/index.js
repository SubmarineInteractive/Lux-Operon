import Emitter from 'helpers/Emitter';
import Fish from './Fish';
import findIndex from 'lodash.findindex';
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
  constructor({ count, species, name, position, luxAmount }, resources, curve ) {
    super();

    this.bind();

    this.addListeners();

    this.fishes = [];

    this.curve = curve;

    this.pathPosition = position;

    for ( let i = 0; i < count; i++ ) {
      const model = resources[ species ].clone();
      const fish = new Fish( this, model, name, resources.fishGradientTexture, curve );

      this.fishes.push( fish );
      this.add( fish );
    }
  }

  bind() {

    this.getPosition = this.getPosition.bind( this );
    this.removeFish = this.removeFish.bind( this );
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

  removeFish( fish ) {

    console.log('group', this);
    console.log('fishes', this.fishes);

    if( this.children.length > 0 ) {

      console.log( 'fish.id', fish.id );

      const index = findIndex( this.fishes, { id: fish.id });

      console.log('index', index )


      if( index > -1 ) {
        this.fishes.splice( index, 1 );

        console.log('======', 'index', '====', this.fishes);
        this.remove( fish );
      }


    }
  }

  update( time ) {
    for ( let i = 0; i < this.fishes.length; i++ ) {
      this.fishes[ i ].update( time );
    }
  }
}

export default FishGroup;
