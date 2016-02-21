/**
 * MeshLine class
 */
class MeshLine {

  /**
   * Constructor function
   */
  constructor() {

    this.positions = [];

    this.previous = [];
    this.next = [];
    this.side = [];
    this.width = [];
    this.indices_array = [];
    this.uvs = [];
    this.lineDistances = [];

    this.geometry = new THREE.BufferGeometry();

    this.widthCallback = null;
  }

  /**
   * setGeometry function
   * @param {[type]} g [description]
   * @param {[type]} c [description]
   */
  setGeometry( g, c ) {

    this.widthCallback = c;

    this.positions = [];

    if( g instanceof THREE.Geometry ) {
      for( let j = 0; j < g.vertices.length; j++ ) {
        let v = g.vertices[ j ];
        this.positions.push( v.x, v.y, v.z );
        this.positions.push( v.x, v.y, v.z );
      }
    }

    if( g instanceof THREE.BufferGeometry ) {
      // read attribute positions ?
    }

    if( g instanceof Float32Array || g instanceof Array ) {
      for( let j = 0; j < g.length; j += 3 ) {
        this.positions.push( g[ j ], g[ j + 1 ], g[ j + 2 ] );
        this.positions.push( g[ j ], g[ j + 1 ], g[ j + 2 ] );
      }
    }

    this.process();
  }

  /**
   * ComputeLineDistances function
   */
  computeLineDistances() {

    const array = this.positions;
    let d = 0;

    for( let i = 0; i < this.positions.length; i += 3 ) {

      if ( i > 0 ) {

        const x = array[ i ];
        const y = array[ i + 1 ];
        const z = array[ i + 2 ];
        const px = array[ i - 3 ];
        const py = array[ i - 2 ];
        const pz = array[ i - 1 ];
        const dx = x - px;
        const dy = y - py;
        const dz = z - pz;

        d += Math.sqrt( dx* dx + dy * dy + dz * dz );
      }

      this.lineDistances[ i / 3 ] = d;
    }
  }

  /**
   * process function
   */
  process() {

    const l = this.positions.length / 6;

    this.previous = [];
    this.next = [];
    this.side = [];
    this.width = [];
    this.indices_array = [];
    this.uvs = [];

    for( let j = 0; j < l; j++ ) {
      this.side.push( 1 );
      this.side.push( -1 );
    }

    let w;
    for( let j = 0; j < l; j++ ) {
      if( this.widthCallback ) w = this.widthCallback( j / ( l -1 ) );
      else w = 1;
      this.width.push( w );
      this.width.push( w );
    }

    for( let j = 0; j < l; j++ ) {
      this.uvs.push( j / ( l - 1 ), 0 );
      this.uvs.push( j / ( l - 1 ), 1 );
    }

    let v;

    if( this.compareV3( 0, l - 1 ) ){
      v = this.copyV3( l - 2 );
    } else {
      v = this.copyV3( 0 );
    }
    this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
    this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
    for( let j = 0; j < l - 1; j++ ) {
      v = this.copyV3( j );
      this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
      this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
    }

    for( let j = 1; j < l; j++ ) {
      v = this.copyV3( j );
      this.next.push( v[ 0 ], v[ 1 ], v[ 2 ] );
      this.next.push( v[ 0 ], v[ 1 ], v[ 2 ] );
    }

    if( this.compareV3( l - 1, 0 ) ){
      v = this.copyV3( 1 );
    } else {
      v = this.copyV3( l - 1 );
    }
    this.next.push( v[ 0 ], v[ 1 ], v[ 2 ] );
    this.next.push( v[ 0 ], v[ 1 ], v[ 2 ] );

    for( let j = 0; j < l - 1; j++ ) {
      const n = j * 2;
      this.indices_array.push( n, n + 1, n + 2 );
      this.indices_array.push( n + 2, n + 1, n + 3 );
    }

    this.computeLineDistances();

    this.attributes = {
      position: new THREE.BufferAttribute( new Float32Array( this.positions ), 3 ),
      previous: new THREE.BufferAttribute( new Float32Array( this.previous ), 3 ),
      next: new THREE.BufferAttribute( new Float32Array( this.next ), 3 ),
      side: new THREE.BufferAttribute( new Float32Array( this.side ), 1 ),
      width: new THREE.BufferAttribute( new Float32Array( this.width ), 1 ),
      uv: new THREE.BufferAttribute( new Float32Array( this.uvs ), 2 ),
      index: new THREE.BufferAttribute( new Uint16Array( this.indices_array ), 1 ),
      lineDistance: new THREE.BufferAttribute( new Float32Array( this.lineDistances ), 1 )
    };

    this.geometry.addAttribute( 'position', this.attributes.position );
    this.geometry.addAttribute( 'previous', this.attributes.previous );
    this.geometry.addAttribute( 'next', this.attributes.next );
    this.geometry.addAttribute( 'side', this.attributes.side );
    this.geometry.addAttribute( 'width', this.attributes.width );
    this.geometry.addAttribute( 'uv', this.attributes.uv );
    this.geometry.addAttribute( 'lineDistance', this.attributes.lineDistance );

    this.geometry.setIndex( this.attributes.index );
  }
}

export default MeshLine;