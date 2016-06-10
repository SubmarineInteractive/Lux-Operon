import Cannon from 'cannon';

/**
 * Class BoundingBox
 */
class BoundingBox extends THREE.Object3D {

  /**
   * Constructor function
   * @param {Object}  Configuration
   * @param {World}   World instance
   * @param {Terrain} Terrain instance
   */
  constructor( configuration, World, Terrain ) {

    super();

    this.configuration = configuration;
    this.world = World;
    this.terrain = Terrain;

    const { width: widthOffset, height: heightOffset, depth: depthOffset } = this.configuration.offset;

    // Position
    this.position.y = ( this.terrain.geometry.boundingBox.max.z - this.terrain.geometry.boundingBox.min.z ) / 2 + heightOffset;

    // Planes
    this.planes = {
      front: {
        position: new THREE.Vector3( 0, 0, - this.terrain.geometry.parameters.height / 2 - depthOffset / 2 ),
        axis: null,
        angle: null
      },
      back: {
        position: new THREE.Vector3( 0, 0, this.terrain.geometry.parameters.height / 2 + depthOffset / 2 ),
        axis: new THREE.Vector3( 0, 1, 0 ),
        angle: Math.PI
      },
      left: {
        position: new THREE.Vector3( - this.terrain.geometry.parameters.width / 2 - widthOffset / 2, 0, 0 ),
        axis: new THREE.Vector3( 0, 1, 0 ),
        angle: Math.PI / 2
      },
      right: {
        position: new THREE.Vector3( this.terrain.geometry.parameters.width / 2 + widthOffset / 2, 0, 0 ),
        axis: new THREE.Vector3( 0, 1, 0 ),
        angle: - Math.PI / 2
      }
    };

    this.createPlanes();

    if( this.configuration.debug ) {
      this.debugCollisions();
    }
  }

  /**
   * createPlanes function
   */
  createPlanes() {

    // Physics
    for ( let p in this.planes ) {
      const plane = new Cannon.Plane();

      const body = new Cannon.Body({ mass: 0 });
      body.position.copy( this.planes[ p ].position );

      if( this.planes[ p ].axis && this.planes[ p ].angle ) {
        body.quaternion.setFromAxisAngle( this.planes[ p ].axis, this.planes[ p ].angle );
      }

      body.addShape( plane );

      this.world.addBody( body );
    }
  }

  /**
   * debugCollisions function
   */
  debugCollisions() {

    for ( let p in this.planes ) {

      const width = ( this.terrain.geometry.boundingBox.max.x - this.terrain.geometry.boundingBox.min.x ) + this.configuration.offset.width;
      const height = ( this.terrain.geometry.boundingBox.max.z - this.terrain.geometry.boundingBox.min.z ) + this.configuration.offset.height;

      const plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( width, height ), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, wireframe: true, fog: false }) );
      plane.position.copy( this.planes[ p ].position );

      if( this.planes[ p ].axis && this.planes[ p ].angle ) {
        plane.quaternion.setFromAxisAngle( this.planes[ p ].axis, this.planes[ p ].angle );
      }

      this.add( plane );
    }
  }
}

export default BoundingBox;