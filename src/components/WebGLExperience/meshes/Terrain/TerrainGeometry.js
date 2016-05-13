/**
 * TerrainGeometry class
 */
class TerrainGeometry extends THREE.PlaneGeometry {

  /**
   * Constructor function
   * @param {Object} configuration Configuration instance
   * @param {Object} heightMapTexture Height map texture
   */
  constructor( configuration, heightMapTexture ) {

    super( configuration.width, configuration.height, configuration.segments.width, configuration.segments.height );

    this.matrix = this.getMatrix( heightMapTexture.image, configuration.segments.width + 1, configuration.segments.height + 1, configuration.minHeight, configuration.maxHeight );

    const sizeX = this.matrix[ 0 ].length;

    const halfWidth = configuration.width * 0.5;
    const halfDepth = configuration.height * 0.5;

    const z90deg = new THREE.Matrix4().makeRotationZ( Math.PI * 0.5 );
    this.applyMatrix( z90deg );

    this.vertices.forEach( ( vertex, i ) => {

      const row = ( i / sizeX ) | 0;
      const col = i % sizeX;

      vertex.x = halfWidth + vertex.x;
      vertex.y = halfDepth + vertex.y;
      vertex.z = this.matrix[ row ][ col ];

    });

    this.computeFaceNormals();
    this.computeVertexNormals();
  }

  /**
   * getHeightData function
   * @param  {Object} image            Height map image
   * @param  {Object} geometrySegments Width and height of the geometry segments
   * @return {array}                   Displaced vertices
   */
  getHeightData( image, geometrySegments ) {

    const canvas = document.createElement( 'canvas' );
    canvas.width = geometrySegments.width + 1;
    canvas.height = geometrySegments.height + 1;
    const context = canvas.getContext( '2d' );

    const size = canvas.width * canvas.height;
    const data = new Float32Array( size );

    context.drawImage( image, 0, 0, canvas.width, canvas.height );

    for ( let i = 0; i < size; i ++ ) {
      data[ i ] = 0;
    }

    const imgd = context.getImageData( 0, 0, canvas.width, canvas.height );
    const pix = imgd.data;

    let j = 0;
    for ( let i = 0; i < pix.length; i += 4 ) {
      const all = pix[ i ] + pix[ i + 1 ] + pix[ i + 2 ];
      data[ j++ ] = all / Math.max( canvas.width, canvas.height );
    }

    return data;
  }

  getMatrix( image, width = 0, depth = 0, minHeight, maxHeight ) {

    const matrix = [];
    const canvas = document.createElement( 'canvas' );
    const ctx = canvas.getContext( '2d' );
    const channels = 4;
    const heightRange = maxHeight - minHeight;

    let imgData, pixel;
    let heightData;

    canvas.width  = width;
    canvas.height = depth;

    ctx.drawImage( image, 0, 0, width, depth );
    imgData = ctx.getImageData( 0, 0, width, depth ).data;

    for ( let i = 0; i < depth; i++ ) { //row

      matrix.push( [] );

      for ( let j = 0; j < width; j++ ) { //col

        pixel = i * depth + j;
        heightData = imgData[ pixel * channels ] / 255 * heightRange + minHeight;

        matrix[ i ].push( heightData );

      }

    }

    return matrix;
  }
}

export default TerrainGeometry;