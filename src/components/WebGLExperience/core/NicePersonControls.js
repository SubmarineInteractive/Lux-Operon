import { map } from 'utils';
import Emitter from 'helpers/Emitter';

import {
  EXP_GET_CAMERA_POSITION,
  EXP_CAMERA_POSITION_SENDED,
  EXP_GET_DEPTH_VALUE,
  EXP_DEPTH_VALUE_SENDED,
  EXP_INTRO_START,
  EXP_TOGGLE_CAMERA,
  EXP_INTERSECTING_FISH,
  EXP_NOT_INTERSECTING_FISH
} from 'config/messages';

/**
* NicePersonControls class
*/
class NicePersonControls {

  constructor( camera, player ) {

    this.camera = camera;
    this.cannonBody = player.sphereBody;
    this.introCamMovementTl = new TimelineMax();

    this.enabled = false;
    this.enableDamping = false;
    this.enableMouseDown = true;

    this.mousedownTimeout = null;

    this.locked = true;

    this.dampingFactor = 0.25;
    this.dampingThreshold = 0.01;

    this.movementX = 0;
    this.movementY = 0;

    this.inputVelocity = new THREE.Vector3();
    this.cannonBodyVelocity = this.cannonBody.velocity;
    this.velocityFactor = 10;

    this.euler = new THREE.Euler();
    this.quaternion = new THREE.Quaternion();

    this.pitchObject = new THREE.Object3D();
    this.pitchObject.add( camera );

    this.yawObject = new THREE.Object3D();
    this.yawObject.add( this.pitchObject );

    this.bind();
    this.addListeners();

    this.debug();

  }

  bind() {

    [ 'handleMouseMove', 'handleMouseUp', 'handleMouseDown', 'debugSetPosition', 'getPosition',
      'getDepthValue', 'toggleCamera', 'startIntroCameraMovement', 'onIntersectingFish', 'onNotIntersectingFish' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addListeners() {

    document.addEventListener( 'mousemove', this.handleMouseMove, false );
    document.addEventListener( 'mouseup', this.handleMouseUp, false );
    document.addEventListener( 'mousedown', this.handleMouseDown, false );

    Emitter.on( EXP_GET_CAMERA_POSITION, this.getPosition );
    Emitter.on( EXP_GET_DEPTH_VALUE, this.getDepthValue );
    Emitter.on( EXP_TOGGLE_CAMERA, this.toggleCamera );
    Emitter.on( EXP_INTRO_START, this.startIntroCameraMovement );
    Emitter.on( EXP_INTERSECTING_FISH, this.onIntersectingFish );
    Emitter.on( EXP_NOT_INTERSECTING_FISH, this.onNotIntersectingFish );
  }

  removeListeners() {
    document.removeEventListener( 'mousemove', this.handleMouseMove, false );
    document.removeEventListener( 'mouseup', this.handleMouseUp, false );
    document.removeEventListener( 'mousedown', this.handleMouseDown, false );

    Emitter.off( EXP_GET_CAMERA_POSITION, this.getPosition );
    Emitter.off( EXP_GET_DEPTH_VALUE, this.getDepthValue );
    Emitter.off( EXP_TOGGLE_CAMERA, this.toggleCamera );
    Emitter.off( EXP_INTRO_START, this.startIntroCameraMovement );
    Emitter.off( EXP_INTERSECTING_FISH, this.onIntersectingFish );
    Emitter.off( EXP_NOT_INTERSECTING_FISH, this.onNotIntersectingFish );
  }

  debug() {

    //Expose debugger
    window.cameraPosition = this.debugSetPosition;

    const onKeyUp = ( ev )=> {

      if( ev.keyCode === 80 ) { // l

        this.debugSetPosition( 0, 1500, -600 );
      }

    };

    document.addEventListener( 'keyup', onKeyUp, false );

  }

  startIntroCameraMovement() {
    this.introTweenValue = 10;

    this.introCamMovementTl
      .to( this, 30, { introTweenValue: 0, ease: Expo.easeOut, onUpdate: () => {
        this.inputVelocity.z = - this.introTweenValue;
        this.cannonBodyVelocity.z += this.inputVelocity.z;
        this.cannonBodyVelocity.y -= this.inputVelocity.z / 6;
        this.yawObject.position.copy( this.cannonBody.position );
      } });
  }

  handleMouseMove( event ) {

    if( !this.enabled ) return;

    this.movementX = map( event.pageX, 0, window.innerWidth, -1, 1 ) || 0;
    this.movementY = map( event.pageY, 0, window.innerHeight, -1, 1 ) || 0;

    this.pitchObject.rotation.x = Math.max( - Math.PI / 2 , Math.min( Math.PI / 2 , this.pitchObject.rotation.x ) );
  }


  handleMouseUp() {

    document.body.classList.remove( 'is-moving' );

    if( !this.enableMouseDown ) return;

    clearTimeout( this.mousedownTimeout );

    if( this.enabled ) {
      this.enabled = false;
      this.enableDamping = true;

      TweenMax.to( this.yawObject.rotation, 1, { y: this.yawObject.rotation.y - ( this.movementX / 5 ) });
      TweenMax.to( this.pitchObject.rotation, 1, { x: this.pitchObject.rotation.x - ( this.movementY / 5 ) });
    }
  }

  handleMouseDown() {

    if( !this.enableMouseDown ) return;

    clearTimeout( this.mousedownTimeout );

    this.mousedownTimeout = setTimeout( ()=> {

      TweenMax.killTweensOf( this.yawObject.rotation, { y: true });
      TweenMax.killTweensOf( this.pitchObject.rotation, { x: true });
      this.enabled = true;
      this.enableDamping = false;

      document.body.classList.add('is-moving');

    }, 200 );

  }

  get object() {

    return this.yawObject;
  }

  debugSetPosition( x, y, z ) {
    this.cannonBody.position.x = x;
    this.cannonBody.position.y = y;
    this.cannonBody.position.z = z;
    this.yawObject.position.copy( this.cannonBody.position );
  }

  getPosition() {

    Emitter.emit( EXP_CAMERA_POSITION_SENDED, this.cannonBody.position );

    return this.cannonBody.position;
  }

  getDepthValue() {

    Emitter.emit( EXP_DEPTH_VALUE_SENDED, this.cannonBody.position.y );

    return this.cannonBody.position.y;
  }

  toggleCamera( toggle ) {

    if( toggle ) {
      this.locked = false;
      this.introCamMovementTl.stop();
    } else {
      this.locked = true;
    }

  }

  onIntersectingFish() {

    this.enableMouseDown = false;
  }

  onNotIntersectingFish() {

    this.enableMouseDown = true;
  }

  update() {

    if( this.locked ) return;

    if( this.enabled || this.enableDamping ) {

      this.inputVelocity.set( 0, 0, 0 );

      // Move forward
      this.inputVelocity.z = - this.velocityFactor;

      // Movementy Y [-1, 1], indicate sinking direction
      this.cannonBodyVelocity.y = ( -this.movementY /  this.yawObject.position.y ) * 500000;
      this.euler.order = 'XYZ';

      if ( this.enableDamping ) {

        if( this.inputVelocity.z >= -0.05 || this.inputVelocity.z <= 0.05 ) {
          this.enableDamping = false;
        }

      } else {

        this.yawObject.rotation.y -= this.movementX * 0.02;
        this.pitchObject.rotation.x -= this.movementY * 0.013;
        // Apply rotation based on forward velocity
        this.euler.x = this.pitchObject.rotation.x;
        this.euler.y = this.yawObject.rotation.y;

        this.quaternion.setFromEuler( this.euler );
        this.inputVelocity.applyQuaternion( this.quaternion );

        this.cannonBodyVelocity.x += this.inputVelocity.x;
        this.cannonBodyVelocity.z += this.inputVelocity.z;
      }

      this.yawObject.position.copy( this.cannonBody.position );
    }
  }
}

export default NicePersonControls;
