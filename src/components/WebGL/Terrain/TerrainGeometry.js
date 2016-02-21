/**
 * TerrainGeometry class
 */
class TerrainGeometry extends THREE.PlaneGeometry {

  /**
   * Constructor function
   * @param {Configuration} Configuration instance
   * @param {TextureLoader} TextureLoader instance
   * @param {GUI} Gui       GUI instance
   */
  constructor( Configuration, TextureLoader, Gui ) {

    const configuration = Configuration.get( 'terrain.geometry' );
    const geometrySegments = Configuration.get( 'terrain.geometry.segments' );

    super( configuration.width, configuration.height, configuration.segments.width, configuration.segments.height );

    this.gui = Gui;

    const heightMapTexture = TextureLoader.get( 'heightMap' );
    const data = this.getHeightData( heightMapTexture.image, geometrySegments );

    for ( let i = 0; i < this.vertices.length; i++ ) {
      this.vertices[ i ].z = data[ i ] * configuration.heightMapScale;
    }

    // this.initGUI();
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

  /**
   * initGUI function
   * Add datGui folder
   */
  initGUI() {

    const folder = this.gui.addFolder( 'Terrain Geometry' );

    folder.add( this.parameters, 'width', 0, 4000 ).onChange( () => {
      this.verticesNeedUpdate = true;
    });
    folder.add( this.parameters, 'height', 0, 4000 );
    folder.add( this.parameters, 'widthSegments', 0, 90 );
    folder.add( this.parameters, 'heightSegments', 0, 90 );
  }
}

export default TerrainGeometry;