import { map } from 'utils';

/**
 * NicePersonControls class
 */
class NicePersonControls {

  constructor(camera, cannonBody = false) {

    this.camera = camera;
    this.cannonBody = cannonBody;

    this.enabled = false;

    this.movementX = 0;
    this.movementY = 0;

    this.velocity = new THREE.Vector3();
    this.velocityFactor = 0.2;
    this.jumpVelocity = 20;

    this.pitchObject = new THREE.Object3D();
    this.pitchObject.add( camera );

    this.yawObject = new THREE.Object3D();
    this.yawObject.position.y = 2;
    this.yawObject.add( this.pitchObject );
    //
    // this.quat = new THREE.Quaternion();
    //
    // this.moveForward = false;
    // this.moveBackward = false;
    // this.moveLeft = false;
    // this.moveRight = false;

    // this.canJump = false;
    //


    this.bind();
    this.addListeners();

  }

  bind() {
    this.handleMouseMove = this.handleMouseMove.bind( this );
    this.handleMouseUp = this.handleMouseUp.bind( this );
    this.handleMouseDown = this.handleMouseDown.bind( this );
  }

  addListeners() {
    document.addEventListener( 'mousemove', this.handleMouseMove, false );
    document.addEventListener( 'mouseup', this.handleMouseUp, false );
    document.addEventListener( 'mousedown', this.handleMouseDown, false );
  }

  handleMouseMove( event ) {

    // console.log( 'mousemove', event.movementX, event.movementY );

    if(!this.enabled) return;
    
    this.movementX = map(event.pageX, 0, window.innerWidth, -1, 1) || 0;
    this.movementY = map(event.pageY, 0, window.innerHeight, -1, 1) || 0;

    this.pitchObject.rotation.x = Math.max( - Math.PI/2 , Math.min( Math.PI/2 , this.pitchObject.rotation.x ) );

  }


  handleMouseUp() {

    const duration = 3;
    const rotationCoef = 0.4;
    const ease = Expo.easeOut;

    this.enabled = false;

    TweenMax.killTweensOf( this.yawObject.rotation, { y: true });
    TweenMax.killTweensOf( this.pitchObject.rotation, { x: true });

    TweenMax.to( this.yawObject.rotation, duration, { y: this.yawObject.rotation.y - this.movementX * (rotationCoef / 2), ease });
    TweenMax.to( this.pitchObject.rotation, duration, { x: this.pitchObject.rotation.x - this.movementY * rotationCoef, ease });

  }

  handleMouseDown() {

    TweenMax.killTweensOf( this.yawObject.rotation, { y: true });
    TweenMax.killTweensOf( this.pitchObject.rotation, { x: true });
    this.enabled = true;

  }

  getObject() {
    return this.yawObject;
  }

  moveForward(delta) {

    // this.velocity.z = -this.velocityFactor * delta;
    //
    this.yawObject.translateZ( -10 );
  }

  rotate() {

    this.yawObject.rotation.y -=  this.movementX * 0.02;
    this.pitchObject.rotation.x -= this.movementY * 0.01;

  }

  update( delta ) {

    if( this.enabled ) {

      this.moveForward( delta );

      this.rotate();

    }
  }
}

export default NicePersonControls;