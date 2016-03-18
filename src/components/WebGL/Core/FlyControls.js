/**
* NicePersonControls class
*/
class NicePersonControls {

  constructor( camera, domElement ) {

    this.camera = camera;

  	this.domElement = ( domElement !== undefined ) ? domElement : document;
  	if ( domElement ) this.domElement.setAttribute( 'tabindex', - 1 );


    // API

    this.movementSpeed = 1000.0;
    this.rollSpeed = 0.5;

    this.dragToLook = false;
    this.autoForward = false;

    this.tmpQuaternion = new THREE.Quaternion();

    this.mouseStatus = 0;

    this.moveState = {
      up: 0,
      down: 0,
      left: 0,
      right: 0,
      forward: 0,
      back: 0,
      pitchUp: 0,
      pitchDown: 0,
      yawLeft: 0,
      yawRight: 0,
      rollLeft: 0,
      rollRight: 0
    };

    this.moveVector = new THREE.Vector3( 0, 0, 0 );
    this.rotationVector = new THREE.Vector3( 0, 0, 0 );

    this.bind();
    this.addListeners();

    this.updateMovementVector();
    this.updateRotationVector();

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


  handleMouseDown ( event ) {

    if ( this.domElement !== document ) {

      this.domElement.focus();

    }

    event.preventDefault();
    event.stopPropagation();

    if ( this.dragToLook ) {

      this.mouseStatus ++;

    } else {

      switch ( event.button ) {

        case 0: this.moveState.forward = 1; break;
        case 2: this.moveState.back = 1; break;

      }

      this.updateMovementVector();

    }

  }

  handleMouseMove ( event ) {

    if ( ! this.dragToLook || this.mouseStatus > 0 ) {

      const container = this.getContainerDimensions();
      const halfWidth  = container.size[ 0 ] / 2;
      const halfHeight = container.size[ 1 ] / 2;

      this.moveState.yawLeft   = - ( ( event.pageX - container.offset[ 0 ] ) - halfWidth  ) / halfWidth;
      this.moveState.pitchDown =   ( ( event.pageY - container.offset[ 1 ] ) - halfHeight ) / halfHeight;

      
      this.updateRotationVector();

    }

  }

  handleMouseUp ( event ) {

    event.preventDefault();
    event.stopPropagation();

    if ( this.dragToLook ) {

      this.mouseStatus --;

      this.moveState.yawLeft = this.moveState.pitchDown = 0;

    } else {

      switch ( event.button ) {

        case 0: this.moveState.forward = 0; break;
        case 2: this.moveState.back = 0; break;

      }

      this.updateMovementVector();

    }

    this.updateRotationVector();

  }

  update ( delta ) {

    const moveMult = delta * this.movementSpeed;
    const rotMult = delta * this.rollSpeed;

    this.camera.translateX( this.moveVector.x * moveMult );
    this.camera.translateY( this.moveVector.y * moveMult );
    this.camera.translateZ( this.moveVector.z * moveMult );

    this.tmpQuaternion.set( this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1 ).normalize();
    this.camera.quaternion.multiply( this.tmpQuaternion );

    // expose the rotation vector for convenience
    this.camera.rotation.setFromQuaternion( this.camera.quaternion, this.camera.rotation.order );


  }

  updateMovementVector() {

    const forward = ( this.moveState.forward || ( this.autoForward && ! this.moveState.back ) ) ? 1 : 0;

    this.moveVector.x = ( - this.moveState.left    + this.moveState.right );
    this.moveVector.y = ( - this.moveState.down    + this.moveState.up );
    this.moveVector.z = ( - forward + this.moveState.back );

  }

  updateRotationVector() {

    this.rotationVector.x = 0;
    this.rotationVector.y = ( - this.moveState.yawRight  + this.moveState.yawLeft );
    this.rotationVector.z = ( - this.moveState.rollRight + this.moveState.rollLeft );

  }

  getContainerDimensions() {

    if ( this.domElement != document ) {

      return {
        size	: [ this.domElement.offsetWidth, this.domElement.offsetHeight ],
        offset	: [ this.domElement.offsetLeft,  this.domElement.offsetTop ]
      };

    } else {

      return {
        size	: [ window.innerWidth, window.innerHeight ],
        offset	: [ 0, 0 ]
      };

    }

  }
}

export default NicePersonControls;