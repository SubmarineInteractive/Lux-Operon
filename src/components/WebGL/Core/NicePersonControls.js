import { map } from 'utils';

/**
 * NicePersonControls class
 */
class NicePersonControls {

  constructor( camera, player ) {

    this.camera = camera;
    this.cannonBody = player.sphereBody;

    this.enabled = false;

    this.movementX = 0;
    this.movementY = 0;

    this.inputVelocity = new THREE.Vector3();
    this.cannonBodyVelocity = this.cannonBody.velocity;
    this.velocityFactor = 1200;

    this.euler = new THREE.Euler();
    this.quaternion = new THREE.Quaternion();

    this.pitchObject = new THREE.Object3D();
    this.pitchObject.add( camera );

    this.yawObject = new THREE.Object3D();
    // this.yawObject.position.y = 0.5;
    this.yawObject.add( this.pitchObject );

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

    if( ! this.enabled ) return;

    this.movementX = map( event.pageX, 0, window.innerWidth, -1, 1 ) || 0;
    this.movementY = map( event.pageY, 0, window.innerHeight, -1, 1 ) || 0;

    this.pitchObject.rotation.x = Math.max( - Math.PI / 2 , Math.min( Math.PI / 2 , this.pitchObject.rotation.x ) );

  }


  handleMouseUp() {

    const duration = 3;
    const rotationCoef = 0.1;
    const ease = Expo.easeOut;

    this.enabled = false;

    TweenMax.killTweensOf( this.yawObject.rotation, { y: true });
    TweenMax.killTweensOf( this.pitchObject.rotation, { x: true });

    TweenMax.to( this.yawObject.rotation, duration, { y: this.yawObject.rotation.y - this.movementX * ( rotationCoef / 2 ), ease });
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


  update( delta ) {

    if( this.enabled ) {

      this.inputVelocity.set( 0, 0, 0 );

      this.yawObject.rotation.y -= this.movementX * 0.02;
      this.pitchObject.rotation.x -= this.movementY * 0.007;

      // Move forward
      this.inputVelocity.z = - this.velocityFactor * delta;


      // Apply rotation based on forward velocity
      this.euler.x = this.pitchObject.rotation.x;
      this.euler.y = this.yawObject.rotation.y;

      // Movementy Y [-1, 1], indicate sinking direction
      this.cannonBodyVelocity.y = -this.movementY * 300;

      this.euler.order = 'XYZ';

      this.quaternion.setFromEuler( this.euler );
      this.inputVelocity.applyQuaternion( this.quaternion );

      // Move forward
      this.cannonBodyVelocity.x += this.inputVelocity.x;
      this.cannonBodyVelocity.z += this.inputVelocity.z;

      this.yawObject.position.copy( this.cannonBody.position );

    }
  }
}

export default NicePersonControls;