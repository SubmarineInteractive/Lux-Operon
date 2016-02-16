/**
 * TerrainGeometry class
 */
class TerrainGeometry extends THREE.PlaneGeometry {

  /**
   * Constructor function
   */
  constructor(Configuration, TextureLoader) {
    const terrainGeomConfig = Configuration.get('terrain.geometry');

    super(terrainGeomConfig.width, terrainGeomConfig.depth, terrainGeomConfig.segments.width, terrainGeomConfig.segments.depth);

    this.verticesNeedUpdate = true;
    this.terrainWidth = terrainGeomConfig.width;
    this.terrainHeight = terrainGeomConfig.depth;

    const heightMapTexture = TextureLoader.get('heightMap');

    var index = 0,
    i = 0;

    const heightData = this.getHeightData(heightMapTexture.image);

    for ( var i = 0; i < this.vertices.length; i++ ) {
         this.vertices[i].z = heightData[i] * 100;
    }

    this.computeFaceNormals();
    this.computeVertexNormals();
    this.computeTangents();
  }

  getHeightData(image) {

      var canvas = document.createElement( 'canvas' );

      canvas.width = this.terrainWidth;
      canvas.height = this.terrainHeight;

      var context = canvas.getContext( '2d' );

      var size = canvas.width * canvas.height;
      var data = new Float32Array( size );

      context.drawImage(image,0,0);

      for ( var i = 0; i < size; i ++ ) {
          data[i] = 0
      }

      var imgd = context.getImageData(0, 0, canvas.width, canvas.height);
      var pix = imgd.data;

      var j=0;

      for (var i = 0, n = pix.length; i < n; i += (4)) {
          var all = pix[i]+pix[i+1]+pix[i+2];
          data[j++] = all/30;
      }

      return data;
  }
}

export default TerrainGeometry;