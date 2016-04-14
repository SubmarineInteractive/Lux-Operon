import BoundingBoxGeometry from './BoundingBoxGeometry';
import BoundingBoxMaterial from './BoundingBoxMaterial';

/**
 * Class BoundingBox
 */
class BoundingBox extends THREE.Mesh {

  /**
   * Constructor function
   * @param {BoundingBoxGeometry} BoundingBoxGeometry instance
   * @param {BoundingBoxMaterial} BoundingBoxMaterial instance
   * @param {Terrain}             Terrain instance
   */
  constructor({ geometry, material }, Terrain ) {

    super( new BoundingBoxGeometry( geometry, Terrain ), new BoundingBoxMaterial( material ) );
  }
}

export default BoundingBox;