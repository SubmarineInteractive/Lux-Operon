class TerrainGeometry extends THREE.PlaneBufferGeometry {

  /**
   * Constructor function
   * @param {Configuration} Configuration object
   */
  constructor(Configuration) {
    super(6000, 6000, 100, 100);

    this.heightData;

    // THREE.BufferGeometryUtils.computeTangents( this );

    this.loadHeightMapImage().then((img) => {
      this.heightData = this.getHeightData(img);
      this.setHeightFromHeightMap();
    }, (error) => {
      console.error("Error !", error);
    });
  }

  /**
   * loadHeightMapImage function
   * @param {string} imagePath
   * return {promise} data
   */
  loadHeightMapImage(imgPath) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imgPath;

      img.onload = () => {
        resolve(img);
      };

      img.onerror = () => {
        reject(Error("Error on loading height map texture image"));
      };
    });
  }

  /**
   * getHeightData function
   * @param {object} img Image Node
   * return {array} data Data extract from img
   */
  getHeightData(img) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const imgWidth = 128;
    const imgHeight = 128;

    canvas.width = imgWidth;
    canvas.height = imgHeight;

    const size = imgWidth * imgHeight;

    let data = new Float32Array(size);

    context.drawImage(img, 0, 0);

    for (let i = 0; i < size; i++) {
      data[i] = 0;
    }

    const imgd = context.getImageData(0, 0, imgWidth, imgHeight);
    const pix = imgd.data;

    let j = 0;
    for (let i = 0, n = pix.length; i < n; i += (4)) {
      let all = pix[i] + pix[i + 1] + pix[i + 2];
      data[j++] = all / 30;
    }

    return data;
  }

  /**
   * setHeightFromHeightMap function
   * @param {string} imagePath
   */
  setHeightFromHeightMap() {
    for (let i = 0, l = this.vertices.length; i < l; i++) {
      this.vertices[i].position.z = this.heightData[i];
    }
  }


}


export default TerrainGeometry;
