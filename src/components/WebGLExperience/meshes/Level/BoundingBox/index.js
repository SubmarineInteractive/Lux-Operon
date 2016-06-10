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

    // Position
    this.position.y = ( Terrain.geometry.boundingBox.max.z - Terrain.geometry.boundingBox.min.z ) / 2 + geometry.offset.height;
    
  }
}

export default BoundingBox;
