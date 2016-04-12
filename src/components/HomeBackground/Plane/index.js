import PlaneGeometry from './PlaneGeometry';
import PlaneMaterial from './PlaneMaterial';

/**
 * Plane class
 */
class Plane extends THREE.Mesh {

  /**
   * Constructor function
   */
  constructor() {
    super( new PlaneGeometry(), new PlaneMaterial({ wireframe: false }) );

    this.rotation.x = Math.PI / 2;
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    this.material.update( time );
  }
}

export default Plane;