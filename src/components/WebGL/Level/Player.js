import PointLight from '../Light/PointLight';

/**
 * Player class
 */
class Player extends THREE.Object3D {

  /**
   * constructor function
   */
  constructor() {
    super();

    this.lights = [];
    this.nbLights = 5;

    this.initLights();
  }

  /**
   * initLights function
   * @param {number} delta  Delta time from three global clock
   */
  initLights() {
    for (let i = 0; i < this.nbLights; i++) {

      const plight = new PointLight(
        0xffffff,
        0.1,
        0
      );

      // plight.addSphere();

      const geom = new THREE.SphereGeometry(0.3, 32, 32);
      const mat = new THREE.MeshBasicMaterial({
        color: this.color
      });

      plight.add(new THREE.Mesh(geom, mat));

      this.lights.push(plight);

      this.add(plight);
    }
  }

  /**
   * move function
   * Move the light where the camera is
   * @param {object} newPos Position vector of the camera
   */
  move(newPos) {
    this.position.copy(newPos);
  }

  /**
   * update function
   * @param {number} delta  Delta time from three global clock
   */
  update(delta) {
    for (let i = 0; i < this.nbLights; i++) {
      this.updateLight(this.lights[i], delta);
    }
  }

  /**
   * updateLight function
   * @param {Light} light Light to update
   * @param {number} delta  Delta time from three global clock
   */
  updateLight(light, delta) {

  }
}

export default Player;