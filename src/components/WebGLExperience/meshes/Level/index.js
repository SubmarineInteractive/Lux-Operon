import Emitter from 'helpers/Emitter';
import SoundManager from 'helpers/SoundManager';
import FishGroup from '../FishGroup';
import Path from '../Path';
import paths from '../Path/paths';
import { levels } from 'config/webgl/experience';
import { loopIndex, degreeToRadian, randomFloat } from 'utils';

import {
  EXP_INTRO_ENDED,
  EXP_RAYCAST_TOGGLE,
  EXP_INTERSECTING_FISH,
  EXP_NOT_INTERSECTING_FISH,
  EXP_SHOW_FISH_NAME,
  EXP_LUX_VALUE_UPDATE,
  EXP_GOAL_ACHIEVE,
  EXP_FLASH_MSG
} from 'config/messages';

/**
 * Level class
 */
class Level extends THREE.Object3D {

  /**
   * Constructor function
   * @param {Terrain} Terrain           Terrain instance
   * @param {Camera}  Camera            Camera instance
   * @param {Player}  Player            Player instance
   * @param {Object}  boundingBoxConfig Bounding box configuration
   * @param {Object}  fishGroupConfig   Fish group configuration
   * @param {Object}  resources         Resources
   */
  constructor( Terrain, Camera, Player, boundingBoxConfig, fishGroupConfig, resources ) {

    super();

    this.terrain = Terrain;
    this.camera = Camera;
    this.player = Player;
    this.resources = resources;
    this.hoveredFish = null;
    this.fishGroups = [];
    this.fishModels = [];
    this.intersects = [];

    this.fishGoal = levels.level1Config.goal;
    this.fishCounter = 0;

    this.raycastEnabled = false;
    this.wasIntersecting = false;
    this.isIntersecting = false;

    this.intersectingTimeout = null;
    this.intersectingDebounce = false;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    fishGroupConfig.map( config => {

      const path = new Path( paths[ `path_${config.pathId}` ] );
      path.position.copy( config.position );
      path.rotation.y = degreeToRadian( 90 );

      const fishGroup = new FishGroup( config, this.resources, path.curve );
      this.fishGroups.push( fishGroup );

      for ( let i = 0; i < fishGroup.fishes.length; i++ ) {
        this.fishModels.push( fishGroup.fishes[ i ].modelObject );
      }

      this.add( path );
      path.add( fishGroup );
    });

    this.add( this.terrain );
    this.add( this.player );

    this.norm = 0;

    this.bind();

    Emitter.once( EXP_INTRO_ENDED , this.onIntroEnded );
    Emitter.once( EXP_RAYCAST_TOGGLE , this.toggleRaycast );

  }

  bind() {

    [ 'update', 'onIntroEnded', 'handleClickOnFish', 'onMouseMove', 'raycast', 'toggleRaycast' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addEventListeners() {

    document.addEventListener( 'click', this.handleClickOnFish, false );
    document.addEventListener( 'mousemove', this.onMouseMove, false );
  }

  removeEventListeners() {

    document.removeEventListener( 'click', this.handleClickOnFish, false );
    document.removeEventListener( 'mousemove', this.onMouseMove, false );
  }

  onIntroEnded() {

    this.raycastEnabled = true;

    this.addEventListeners();
  }

  toggleRaycast( toggle ) {
    this.raycastEnabled = toggle;
  }

  onMouseMove( ev ) {

    this.mouse.x = ( ev.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( ev.clientY / window.innerHeight ) * 2 + 1;
  }

  handleClickOnFish() {

    if( this.intersects.length <= 0 ) return;

    const model = this.intersects[ 0 ].object;
    const fish = model.parent.parent;

    const luxGain = randomFloat( 0.05, 0.1 );

    TweenMax.to( model.scale, 1, { x: 0.001, y: 0.001, z: 0.001, ease: Expo.easeOut, onComplete: () => {

      Emitter.emit( EXP_LUX_VALUE_UPDATE, luxGain );

      Emitter.emit( EXP_FLASH_MSG, 'good', `You win + ${luxGain} lux` );

      model.removeFish( fish );

      this.fishCounter++;

      // Win :tada:
      if( this.fishCounter >= this.fishGoal ) {

        Emitter.emit( EXP_GOAL_ACHIEVE );
      }

    } });
  }

  updateWindowCursorPointer() {

    if( this.isIntersecting ) {

      document.body.classList.add( 'is-intersecting' );
    } else {

      document.body.classList.remove( 'is-intersecting' );
    }

  }

  raycast() {

    if( this.raycastEnabled ) {

      this.raycaster.setFromCamera( this.mouse, this.camera );

      // calculate objects intersecting the picking ray
      this.intersects = this.raycaster.intersectObjects( this.fishModels );

      this.wasIntersecting = this.isIntersecting;

      if( this.intersects.length > 0 ) {

        // Check distance
        if( this.intersects[ 0 ].distance < 2000 ) {

          this.isIntersecting = true;

          if( this.wasIntersecting !== this.isIntersecting ) {

            // Debounce later system
            clearTimeout( this.intersectingTimeout );

            this.intersectingTimeout = setTimeout( () => {
              this.intersectingDebounce = false;
            }, 300 );

            // Debounce trigger only once per 300ms
            if( !this.intersectingDebounce ) {

              this.intersectingDebounce = true;

              Emitter.emit( EXP_INTERSECTING_FISH, this.intersects[ 0 ] );
              Emitter.emit( EXP_SHOW_FISH_NAME, this.intersects[ 0 ].object.name );

              // Play sound
              SoundManager.play( 'fish-hover' );

              this.hoveredFish = this.intersects[ 0 ].object.parentClass;
              this.hoveredFish.hover();
            }

          }

        }

      } else {

        this.isIntersecting = false;

        if( this.wasIntersecting !== this.isIntersecting ) {

          Emitter.emit( EXP_NOT_INTERSECTING_FISH );

          this.hoveredFish.unhover();
        }
      }

      this.updateWindowCursorPointer();

    }
  }

  update( time ) {

    this.raycast();

    this.norm = loopIndex( this.norm + 0.001, 1 );

    this.fishGroups.map( group => {
      group.update( time );
    });
  }
}

export default Level;
