import Emitter from 'helpers/Emitter';
import SoundManager from 'helpers/SoundManager';
import FishGroup from '../FishGroup';
import Path from '../Path';
import paths from '../Path/paths';
import FresnelMaterial from '../../materials/FresnelMaterial';
import { levels, anemones } from 'config/webgl/experience';
import BubbleParticleSystem from '../ParticleSystem/BubbleParticleSystem';
import AquaticPlantGroup from '../AquaticPlantGroup';

import { loopIndex, degreeToRadian, randomFloat, randomInt } from 'utils';

import {
  EXP_INTRO_ENDED,
  EXP_RAYCAST_TOGGLE,
  EXP_INTERSECTING_FISH,
  EXP_NOT_INTERSECTING_FISH,
  EXP_SHOW_FISH_NAME,
  EXP_FISH_GET_COUNT,
  EXP_FISH_COUNT_SENDED,
  EXP_LUX_VALUE_UPDATE,
  EXP_GOAL_ACHIEVE,
  EXP_FLASH_MSG,
  EXP_FISH_COUNT_UPDATE,
  EXP_TOGGLE_PAUSE_GAME
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
    this.fishes = [];
    this.fishModels = [];
    this.anemones = [];
    this.intersects = [];

    this.fishGoal = levels.level1Config.goal;
    this.fishCounter = 0;

    this.raycastEnabled = false;
    this.wasIntersecting = false;
    this.isIntersecting = false;

    this.normalizedTick = 0;

    this.intersectingTimeout = null;
    this.intersectingDebounce = false;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.bubbleParticleSystem = new BubbleParticleSystem( this.terrain, this.resources );
    this.terrain.add( this.bubbleParticleSystem.group.mesh );

    fishGroupConfig.map( config => {

      const path = new Path( paths[ `path_${config.pathId}` ] );
      path.position.copy( config.position );
      path.rotation.y = degreeToRadian( 90 );

      const fishGroup = new FishGroup( config, this.resources, path.curve );
      this.fishes.push( fishGroup );

      for ( let i = 0; i < fishGroup.fishes.length; i++ ) {
        this.fishModels.push( fishGroup.fishes[ i ].modelObject );
      }

      this.add( path );
      path.add( fishGroup );
    });

    const anemonesNumber = ( __PREZ__ ) ? anemones.positions.length : 4;

    for ( let i = 0; i < anemonesNumber; i++ ) {
      const anemone = new AquaticPlantGroup({ terrain: this.terrain, model: this.resources.anemoneModel, texture: this.resources.anemoneGradientTexture, preset: anemones });
      anemone.position.copy( anemones.positions[ i ] );
      if( anemones.rotations[ i ] ) {
        anemone.rotation.copy( anemones.rotations[ i ] );
      }

      this.terrain.add( anemone );
      this.anemones.push( anemone );
    }

    this.add( this.terrain );
    this.add( this.player );

    this.bind();

    this.debug();

    Emitter.once( EXP_INTRO_ENDED , this.onIntroEnded );
    Emitter.once( EXP_RAYCAST_TOGGLE , this.toggleRaycast );
    Emitter.once( EXP_FISH_GET_COUNT , this.getFishCount );

  }

  /**
   * bind function
   */
  bind() {

    [ 'update', 'onIntroEnded', 'handleClickOnFish', 'onMouseMove', 'raycast', 'toggleRaycast', 'getFishCount' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  debug() {

    const onKeyUp = ( ev )=> {

      if( ev.keyCode === 50 ) { // 2

        this.fishCounter++;

        Emitter.emit( EXP_FISH_COUNT_UPDATE, this.fishCounter );
      }

    };

    document.addEventListener( 'keyup', onKeyUp, false );
  }

  /**
   * addEventListeners function
   */
  addEventListeners() {

    document.addEventListener( 'click', this.handleClickOnFish, false );
    document.addEventListener( 'mousemove', this.onMouseMove, false );
  }

  /**
   * removeEventListeners function
   */
  removeEventListeners() {

    document.removeEventListener( 'click', this.handleClickOnFish, false );
    document.removeEventListener( 'mousemove', this.onMouseMove, false );
  }

  /**
   * onIntroEnded function
   */
  onIntroEnded() {

    this.raycastEnabled = true;

    this.addEventListeners();
  }

  /**
   * toggleRaycast function
   * @param {boolean} toggle Toggle
   */
  toggleRaycast( toggle ) {
    this.raycastEnabled = toggle;
  }

  /**
   * onMouseMove function
   * @param {Object} ev Event
   */
  onMouseMove( ev ) {

    this.mouse.x = ( ev.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( ev.clientY / window.innerHeight ) * 2 + 1;
  }

  /**
   * handleClickOnFish function
   */
  handleClickOnFish() {

    if( this.intersects.length <= 0 ) return;

    const model = this.intersects[ 0 ].object;
    const fish = model.parent.parent;

    const luxGain = randomFloat( 0.05, 0.1 );

    const tl = new TimelineMax({
      paused: true,
      onStart: () => {

        Emitter.emit( EXP_LUX_VALUE_UPDATE, luxGain );

        Emitter.emit( EXP_FLASH_MSG, 'good', `You win + ${luxGain * 1000} lux` );

        this.fishCounter++;

        Emitter.emit( EXP_FISH_COUNT_UPDATE, this.fishCounter );

        // Win :tada:
        if( this.fishCounter >= this.fishGoal ) {

          Emitter.emit( EXP_GOAL_ACHIEVE );
          Emitter.emit( EXP_TOGGLE_PAUSE_GAME );
        }
      },
      onComplete: () => {
        model.parent.remove( sphere );
        model.removeFish( fish );
      }
    });

    const geometry = new THREE.SphereGeometry( randomInt( 220, 280 ), 45, 45 );
    const material = new FresnelMaterial({
      transparent: true,
      opacity: 0.8
    }, this.resources.fishGradientTexture );

    material.uniforms.useDisplacement.value = false;

    const sphere = new THREE.Mesh( geometry, material );
    model.parent.add( sphere );

    tl
      .fromTo( sphere.scale, 0.5, { x: 0.00001, y: 0.00001, z: 0.00001 }, { x: 1, y: 1, z: 1, ease: Expo.easeOut }, 'start' )
      .to( model.scale, 0.4, { x: 0.00001, y: 0.00001, z: 0.00001, ease: Expo.easeOut }, "=-0.2" )
      .to( sphere.scale, 0.5, { x: 0.00001, y: 0.00001, z: 0.00001, ease: Expo.easeOut }, 0.4 )
      .to( [ sphere.position, model.position ], 0.5, { y: 1000, ease: Expo.easeOut }, "-=0.2" );

    tl.play();
  }

  /**
   * updateWindowCursorPointer function
   */
  updateWindowCursorPointer() {

    if( this.isIntersecting ) {

      document.body.classList.add( 'is-intersecting' );
    } else {

      document.body.classList.remove( 'is-intersecting' );
    }

  }

  /**
   * getFishCount function
   */
  getFishCount() {

    Emitter.emit( EXP_FISH_COUNT_SENDED, this.fishCounter );
  }

  /**
   * raycast function
   */
  raycast() {

    if( this.raycastEnabled ) {

      this.raycaster.setFromCamera( this.mouse, this.camera );

      // Calculate objects intersecting the picking ray
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

  /**
   * update function
   * @param {number} time  Time
   * @param {number} delta Delta
   */
  update( time, delta ) {

    this.normalizedTick = loopIndex( this.normalizedTick + 0.001, 1 );

    this.bubbleParticleSystem.group.tick( delta );

    this.raycast();

    this.anemones.map( anemone => {
      anemone.update( time );
    });

    this.fishes.map( group => {
      group.update( time );
    });
  }
}

export default Level;
