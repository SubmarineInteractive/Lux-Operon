import Cannon from 'cannon';
import PointLight from '../lights/PointLight';
import { randomInt } from 'utils';

import Emitter from 'helpers/Emitter';

import {
  EXP_LUX_TOGGLE,
  EXP_LUX_END_GAME,
  EXP_FLASH_MSG,
  EXP_GET_LUX_VALUE,
  EXP_LUX_VALUE_SENDED,
  EXP_LUX_VALUE_UPDATE,
  EXP_PLAYER_TOGGLE_IS_IN_DANGER
} from 'config/messages';

/**
 * Player class
 * @param {Configuration} Configuration Configuration
 * @param {World} World instance
 */
class Player extends THREE.Object3D {

  /**
   * constructor function
   * @param {World}  World         World instance
   * @param {Object} playerConfig  Player Configuration
   * @param {Object} cameraConfig  Camera Configuration
   */
  constructor( World, playerConfig, cameraConfig ) {

    super();

    this.world = World;

    this.luxEnabled = false;

    this.playerConfig = playerConfig.pointLights;
    this.cameraConfig = cameraConfig;
    this.lights = [];

    this.luxVal = 0.9;
    this.previousluxVal = 0.2;
    this.decreaseLuxVal = 1 / 100000000;

    this.nbLights = this.playerConfig.number;

    this.isInDanger = false;
    this.dangerThreshold = 0.5;

    this.createSphere();
    this.initLights();

    this.bind();

    this.addListeners();
  }

  bind() {

    [ 'toggleLux', 'getLuxVal', 'updateLuxVal', 'updateLuxVal', 'checkDangerState' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addListeners() {

    Emitter.on( EXP_LUX_TOGGLE, this.toggleLux );
    Emitter.on( EXP_GET_LUX_VALUE, this.getLuxVal );
    Emitter.on( EXP_LUX_VALUE_UPDATE, this.updateLuxVal );
  }

  toggleLux( toggleVal ) {

    this.luxEnabled = toggleVal;
  }

  /**
   * createSphere function
   */
  createSphere() {

    // Create a sphere
    const sphereShape = new Cannon.Sphere( 10 );
    this.sphereBody = new Cannon.Body({ mass: 300 });
    this.sphereBody.addShape( sphereShape );
    this.sphereBody.linearDamping = 0.9;
    this.sphereBody.position.copy( this.cameraConfig.position );
    this.world.add( this.sphereBody );

    const geometry = new THREE.SphereGeometry( 10, 10, 10 );
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true });
    this.sphere = new THREE.Mesh( geometry, material );
    // this.add( this.sphere );
  }

  /**
   * initLights function
   */
  initLights() {

    for ( let i = 0; i < this.nbLights; i++ ) {

      const plight = new PointLight({
        hex: parseInt( this.playerConfig.colors[ randomInt( 0, this.playerConfig.colors.length - 1 ) ], 16 ),
        intensity: this.playerConfig.intensity,
        distance: this.playerConfig.distance,
        decay: this.playerConfig.decay
      });

      plight.addSphere();

      this.lights.push( plight );

      this.add( plight );
    }
  }

  /**
   * move function
   * Move the player where the camera is
   * @param {object} newPos Position vector of the camera
   */
  move( newPos ) {

    this.position.copy( newPos );
  }

  /**
   * rotate function
   * Rotate the player where the camera is
   * @param {object} newRotation Rotation vector of the camera
   */
  rotate( newRotation ) {

    this.sphere.quaternion.setFromEuler( newRotation );
  }


  updateLuxVal( newVal ) {

    this.luxVal = newVal;
  }

  getLuxVal() {

    Emitter.emit( EXP_LUX_VALUE_SENDED , this.luxVal );

  }

  checkDangerState() {

    if( this.luxVal < this.dangerThreshold && !this.isInDanger ) {

      this.isInDanger = true;

      Emitter.emit( EXP_PLAYER_TOGGLE_IS_IN_DANGER, true );
      Emitter.emit( EXP_FLASH_MSG, 'danger', "You better hurry up, you'll soon have more light !" );

    } else if ( this.previousluxVal < this.pluxVal && this.isInDanger ) {

      Emitter.emit( EXP_PLAYER_TOGGLE_IS_IN_DANGER, false );
    }
  }

  updateLuxVal() {

    if( this.luxVal > 0 && this.luxEnabled ) {
      this.previousluxVal = this.luxVal;
      this.luxVal -= this.decreaseLuxVal;
    } else if( this.luxEnabled ) {

      this.luxEnabled = false;
      Emitter.emit( EXP_LUX_END_GAME );
      Emitter.emit( EXP_FLASH_MSG, 'danger', 'You have no light, you loose. Try again !' );
    }
  }

  /**
   * update function
   * @param {number} time  Elapsed time from three global clock
   * @param {number} delta Delta time from three global clock
   */
  update( time, delta ) {

    this.updateLuxVal();

    this.checkDangerState();

    for ( let i = 0; i < this.nbLights; i++ ) {
      this.updateLight( this.lights[ i ], time, delta );
    }
  }

  /**
   * updateLight function
   * @param {Light} light Light to update
   * @param {time} time   Elapsed time from three global clock
   */
  updateLight( light, time ) {

    const gOption = light.gravitationOptions;
    light.position.x = Math.sin( gOption.x.velocity * time + gOption.x.offset ) * gOption.x.distance;
    light.position.y = Math.sin( gOption.y.velocity * time + gOption.y.offset ) * gOption.y.distance;
    light.position.z = Math.cos( gOption.z.velocity * time + gOption.z.offset ) * gOption.z.distance;

    light.intensity = this.luxVal * this.playerConfig.intensity;
  }
}

export default Player;
