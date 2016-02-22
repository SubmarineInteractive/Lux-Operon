/**
 * BoundingBoxMaterial class
 */
class BoundingBoxMaterial extends THREE.MeshLambertMaterial {

  /**
   * Constructor function
   * @param {Configuration} Configuration Configuration instance
   */
  constructor( Configuration ) {

    const configuration = Configuration.get( 'boundingBox.material' );

    super( configuration );
  }
}

export default BoundingBoxMaterial;