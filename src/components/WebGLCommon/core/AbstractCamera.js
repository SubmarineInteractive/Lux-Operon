import OrbitControls from 'common/utils/OrbitControls';
import withStore from 'decorators/withStore';

/**
 * AbstractCamera class
 */
@withStore({ handleResize: ({ viewport }) => ({ width: viewport.width, height: viewport.height }) })
class AbstractCamera extends THREE.PerspectiveCamera {

  /**
   * Constructor function
   */
  constructor({ fov, aspect, near, far, position, orbitControls }) {

    super( fov, aspect, near, far );

    if( orbitControls ) {
      this.position.copy( position );
      this.controls = new OrbitControls( this );
    }
  }

  /**
   * handleResize function
   * @param {Object} size         Viewport size
   * @param {number} param.width  Viewport width
   * @param {number} param.height Viewport height
   */
  handleResize({ width, height }) {
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }
}

export default AbstractCamera;