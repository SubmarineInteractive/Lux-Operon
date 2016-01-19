/**
 * MeshLine class
 */
class MeshLine {

  /**
   * Constructor function
   * @return {void}
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
      for( var j = 0; j < g.vertices.length; j++ ) {
        var v = g.vertices[ j ];
        this.positions.push( v.x, v.y, v.z );
        this.positions.push( v.x, v.y, v.z );
      }
    }

    if( g instanceof THREE.BufferGeometry ) {
      // read attribute positions ?
    }

    if( g instanceof Float32Array || g instanceof Array ) {
      for( var j = 0; j < g.length; j += 3 ) {
        this.positions.push( g[ j ], g[ j + 1 ], g[ j + 2 ] );
        this.positions.push( g[ j ], g[ j + 1 ], g[ j + 2 ] );
      }
    }

    this.process();
  }

  /**
   * compareV3 function
   * @param  {[type]} a [description]
   * @param  {[type]} b [description]
   * @return {[type]}   [description]
   */
  compareV3( a, b ) {

    var aa = a * 6;
    var ab = b * 6;
    return ( this.positions[ aa ] === this.positions[ ab ] ) && ( this.positions[ aa + 1 ] === this.positions[ ab + 1 ] ) && ( this.positions[ aa + 2 ] === this.positions[ ab + 2 ] );

  }

  /**
   * copyV3 function
   * @param  {[type]} a [description]
   * @return {[type]}   [description]
   */
  copyV3( a ) {

    var aa = a * 6;
    return [ this.positions[ aa ], this.positions[ aa + 1 ], this.positions[ aa + 2 ] ];

  }

  /**
   * ComputeLineDistances function
   * @return {void}
   */
  computeLineDistances() {

    const array = this.positions
    let d = 0

    for( var i = 0; i < this.positions.length; i += 3 ) {

      if ( i > 0 ) {

        const x = array[ i ]
        const y = array[ i + 1 ]
        const z = array[ i + 2 ]
        const px = array[ i - 3 ]
        const py = array[ i - 2 ]
        const pz = array[ i - 1 ]
        const dx = x - px
        const dy = y - py
        const dz = z - pz

        d += Math.sqrt( dx* dx + dy * dy + dz * dz )
      }

      this.lineDistances[ i / 3 ] = d
    }
  }

  /**
   * process function
   * @return {[type]} [description]
   */
  process() {

    var l = this.positions.length / 6;

    this.previous = [];
    this.next = [];
    this.side = [];
    this.width = [];
    this.indices_array = [];
    this.uvs = [];

    for( var j = 0; j < l; j++ ) {
      this.side.push( 1 );
      this.side.push( -1 );
    }

    var w;
    for( var j = 0; j < l; j++ ) {
      if( this.widthCallback ) w = this.widthCallback( j / ( l -1 ) );
      else w = 1;
      this.width.push( w );
      this.width.push( w );
    }

    for( var j = 0; j < l; j++ ) {
      this.uvs.push( j / ( l - 1 ), 0 );
      this.uvs.push( j / ( l - 1 ), 1 );
    }

    var v;

    if( this.compareV3( 0, l - 1 ) ){
      v = this.copyV3( l - 2 );
    } else {
      v = this.copyV3( 0 );
    }
    this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
    this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
    for( var j = 0; j < l - 1; j++ ) {
      v = this.copyV3( j );
      this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
      this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
    }

    for( var j = 1; j < l; j++ ) {
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

    for( var j = 0; j < l - 1; j++ ) {
      var n = j * 2;
      this.indices_array.push( n, n + 1, n + 2 );
      this.indices_array.push( n + 2, n + 1, n + 3 );
    }

    this.computeLineDistances()

    this.attributes = {
      position: new THREE.BufferAttribute( new Float32Array( this.positions ), 3 ),
      previous: new THREE.BufferAttribute( new Float32Array( this.previous ), 3 ),
      next: new THREE.BufferAttribute( new Float32Array( this.next ), 3 ),
      side: new THREE.BufferAttribute( new Float32Array( this.side ), 1 ),
      width: new THREE.BufferAttribute( new Float32Array( this.width ), 1 ),
      uv: new THREE.BufferAttribute( new Float32Array( this.uvs ), 2 ),
      index: new THREE.BufferAttribute( new Uint16Array( this.indices_array ), 1 ),
      lineDistance: new THREE.BufferAttribute( new Float32Array( this.lineDistances ), 1 )
    }

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

export default MeshLine