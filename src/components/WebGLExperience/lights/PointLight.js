import randomInt from 'utils/random-int';
import randomFloat from 'utils/random-float';

/**
 * PointLight class
 */
class PointLight extends THREE.PointLight {

  /**
   * Constructor function
   * @param {Configuration} configuration Configuration instance
   */
  constructor({ color = 0xffffff, intensity = 1, distance = 0, decay = 1 }) {

    super( color, intensity, distance, decay );

    this.color = color;

    this.gravitationOptions = {
      x: {
        offset: randomFloat( - Math.PI / 2, Math.PI / 2 ),
        distance: randomInt( 120, 200 ),
        velocity: randomFloat( 0.5, 1 )
      },
      y: {
        offset: randomFloat( - Math.PI / 2, Math.PI / 2 ),
        distance: randomInt( 120, 200 ),
        velocity: randomFloat( 0.5, 1 )
      },
      z: {
        offset: randomFloat( - Math.PI / 2, Math.PI / 2 ),
        distance: randomInt( 120, 200 ),
        velocity: randomFloat( 0.5, 1 )
      }
    };
  }

  addSphere() {

    const geom = new THREE.SphereGeometry( 1, 5, 5 );
    const mat = new THREE.MeshBasicMaterial({
      color: this.color,
      wireframe: true
    });

    this.add( new THREE.Mesh( geom, mat ) );
  }

  /**
   * move function
   * Move the light where the camera is
   * @param {Object} newPos Position vector of the camera
   */
  move( newPos ) {
    this.position.copy( newPos );
  }

}

export default PointLight;