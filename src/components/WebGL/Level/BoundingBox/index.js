/**
 * Class BoundingBox
 */
class BoundingBox extends THREE.Mesh {

  /**
   * Constructor function
   * @param {BoundingBoxGeometry} BoundingBoxGeometry instance
   * @param {BoundingBoxMaterial} BoundingBoxMaterial instance
   */
  constructor( BoundingBoxGeometry, BoundingBoxMaterial ) {

    super( BoundingBoxGeometry, BoundingBoxMaterial );
  }
}

export default BoundingBox;