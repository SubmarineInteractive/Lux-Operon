import { map } from 'utils';

/**
 * NicePersonControls class
 */
class NicePersonControls {

  constructor(camera, player) {

    this.camera = camera;
    this.cannonBody = player.sphereBody;

    this.enabled = false;

    this.movementX = 0;
    this.movementY = 0;

    this.inputVelocity = new THREE.Vector3(0, 0, 0);
    this.cannonBodyVelocity = this.cannonBody.velocity;
    this.velocityFactor = 200;
    this.jumpVelocity = 20;

    this.euler = new THREE.Euler();
    this.quaternion = new THREE.Quaternion();

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

    // Move forward
    this.inputVelocity.z = -this.velocityFactor * delta;

    this.cannonBodyVelocity.z += this.inputVelocity.z;

    this.yawObject.position.copy( this.cannonBody.position );

  }

  rotate() {

    this.yawObject.rotation.y -=  this.movementX * 0.02;
    this.pitchObject.rotation.x -= this.movementY * 0.01;

    this.euler.x = this.pitchObject.rotation.x;
    this.euler.y = this.pitchObject.rotation.y;

    this.euler.order = "XYZ";

    this.quaternion.setFromEuler( this.euler );
    this.inputVelocity.applyQuaternion( this.quaternion );

  }

  update( delta ) {

    if( this.enabled ) {

      this.rotate();
      this.moveForward( delta );


    }
  }
}

export default NicePersonControls;