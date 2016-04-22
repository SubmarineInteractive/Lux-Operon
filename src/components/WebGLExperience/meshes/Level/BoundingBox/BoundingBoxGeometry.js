/**
 * BoundingBoxGeometry class
 */
class BoundingBoxGeometry extends THREE.BoxGeometry {

  /**
   * Constructor function
   * @param {Object}  configuration Configuration
   * @param {Terrain} Terrain       Terrain instance
   */
  constructor({ offset }, Terrain ) {

    const { width: widthOffset, height: heightOffset, depth: depthOffset } = offset;

    Terrain.geometry.computeBoundingBox();

    const boundingBoxWidth = Terrain.geometry.parameters.width + widthOffset;
    const boundingBoxHeight = ( Terrain.geometry.boundingBox.max.z - Terrain.geometry.boundingBox.min.z ) + heightOffset;
    const boundingBoxDepth = Terrain.geometry.parameters.height + depthOffset;

    super( boundingBoxWidth, boundingBoxHeight, boundingBoxDepth );
  }
}

export default BoundingBoxGeometry;