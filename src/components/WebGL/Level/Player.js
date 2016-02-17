import PointLight from '../Light/PointLight';
import randomHexColor from 'utils/random-hex-color';


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
    this.nbLights = 20;

    this.initLights();
  }

  /**
   * initLights function
   * @param {number} delta  Delta time from three global clock
   */
  initLights() {
    for (let i = 0; i < this.nbLights; i++) {

      // hex: 0x6d7caa,
      const plight = new PointLight({
        hex: randomHexColor(),
        intensity: 1,
        distance: 200,
        decay: 1
      });

      plight.addSphere();

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
   * @param {number} time  Elapsed time from three global clock
   * @param {number} delta  Delta time from three global clock
   */
  update(time, delta) {
    for (let i = 0; i < this.nbLights; i++) {
      this.updateLight(this.lights[i], time, delta);
    }
  }

  /**
   * updateLight function
   * @param {Light} light Light to update
   * @param {time} delta  Elapsed time from three global clock
   * @param {number} delta  Delta time from three global clock
   */
  updateLight(light, time) {
    const gOption = light.gravitationOptions;
    light.position.x = Math.sin(gOption.x.velocity * time + gOption.x.offset) * gOption.x.distance;
    light.position.y = Math.sin(gOption.y.velocity * time + gOption.y.offset) * gOption.y.distance;
    light.position.z = Math.cos(gOption.z.velocity * time + gOption.z.offset) * gOption.z.distance;
  }
}

export default Player;