/**
 * TerrainGeometry class
 */
class TerrainGeometry extends THREE.PlaneGeometry {

  /**
   * Constructor function
   */
  constructor(Configuration, TextureLoader) {
    const terrainGeomConfig = Configuration.get('terrain.geometry');

    super(terrainGeomConfig.width, terrainGeomConfig.depth, terrainGeomConfig.segments.width/2, terrainGeomConfig.segments.depth/10);

    // this.verticesNeedUpdate = true;
    // this.terrainWidth = terrainGeomConfig.width;
    // this.terrainHeight = terrainGeomConfig.depth;
    // this.heightmapScale = 5;
    // const heightMapTexture = TextureLoader.get('heightMap');
    // let index = 0;
    // const heightData = this.getHeightData(heightMapTexture.image);
    //
    // for (let i = 0; i < this.vertices.length; i++) {
    //   this.vertices[i].z = heightData[i] * this.heightmapScale;
    // }

    // this.computeFaceNormals();
    // this.computeVertexNormals();
    // this.computeTangents();
  }

  getHeightData(image) {

    const canvas = document.createElement('canvas');

    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext('2d');

    const size = canvas.width * canvas.height;
    const data = new Float32Array(size);

    context.drawImage(image, 0, 0);

    for (let i = 0; i < size; i++) {
      data[i] = 0;
    }

    const imgd = context.getImageData(0, 0, canvas.width, canvas.height);
    const pix = imgd.data;

    let j = 0;

    for (let i = 0, n = pix.length; i < n; i += (4)) {
      const all = pix[i] + pix[i + 1] + pix[i + 2];
      data[j++] = all / 3;
    }

    return data;
  }
}

export default TerrainGeometry;