import BoundingBoxGeometry from './BoundingBoxGeometry';
import BoundingBoxMaterial from './BoundingBoxMaterial';
import Cannon from 'cannon';
/**
 * Class BoundingBox
 */
class BoundingBox extends THREE.Mesh {

  /**
   * Constructor function
   * @param {BoundingBoxGeometry}  BoundingBoxGeometry instance
   * @param {BoundingBoxMaterial} B oundingBoxMaterial instance
   * @param {World}               World instance
   * @param {Terrain}             Terrain instance
   */
  constructor({ geometry, material }, World, Terrain ) {

    super( new BoundingBoxGeometry( geometry, Terrain ), new BoundingBoxMaterial( material ) );

    // Position
    this.position.y = ( Terrain.geometry.boundingBox.max.z - Terrain.geometry.boundingBox.min.z ) / 2 + geometry.offset.height;


    // Create the heightfield shape
    this.plane = new Cannon.Plane();

    // Physics
    this.body = new Cannon.Body({ mass: 0 });
    this.body.position.copy( this.position );
    this.body.addShape( this.plane );

  }
}

export default BoundingBox;
