/**
 * PointLight class
 */
class PointLight extends THREE.PointLight {

  /**
   * Constructor function
   * @param {Configuration} Configuration instance
   */
  constructor( { hex, intensity, distance, decay } ) {

    super( hex, intensity, distance, decay );
  }

  addSphere() {
    const geom = new THREE.SphereGeometry(0.3, 32, 32);
    const mat = new THREE.MeshBasicMaterial({
      color: this.color
    });

    this.add(new THREE.Mesh(geom, mat));
  }

  /**
   * move function
   * Move the light where the camera is
   * @param {object} newPos Position vector of the camera
   */
  move(newPos) {
    this.position.copy(newPos);
  }

}

export default PointLight;