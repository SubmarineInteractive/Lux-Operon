class TerrainGeometry extends THREE.PlaneBufferGeometry {

  /**
   * Constructor function
   * @param {Configuration} Configuration object
   */
  constructor(Configuration) {
    super(6000, 6000, 100, 100);

    // THREE.BufferGeometryUtils.computeTangents( this );



  }

}


export default TerrainGeometry
