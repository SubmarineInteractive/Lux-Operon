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
  constructor({ count, species, luxAmount }, resources ) {
    super();

    this.bind();

    this.addListeners();

    this.position.copy( new THREE.Vector3( 500, 1500, -2000 ) );

    for ( let i = 0; i < count; i++ ) {
      const model = resources[ species ].clone();
      const fish = new Fish( model, resources.fishGradientTexture );

      fish.position.x += Math.random() * 3000;
      fish.position.y += Math.random() * 3000;
      fish.position.z += Math.random() * 3000;

      this.add( fish );
    }

    document.addEventListener( 'keydown', ( event ) => {

      switch ( event.keyCode ) {
        case 38:
          this.position.x += 10;
          break;
        case 40:
          this.position.x -= 10;
          break;
        case 37:
          this.position.z += 10;
          break;
        case 39:
          this.position.z -= 10;
          break;
      }
    });
  }

  bind() {

    this.getPosition = this.getPosition.bind( this );
  }

  addListeners() {

    Emitter.on( EXP_FISH_GET_POSITION, this.getPosition );
  }

  getPosition() {

    Emitter.emit( EXP_FISH_GROUP_POSITION_SENDED, this.position );

    return this.position;

  }

  update( time ) {
    this.traverse( child => {
      if( child instanceof THREE.Mesh ) {
        child.material.update( time );
      }
    });
  }

}

export default FishGroup;
