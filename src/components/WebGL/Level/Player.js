import PointLight from '../Light/PointLight';
import randomInt from '../../../utils/random-int';
import randomFloat from '../../../utils/random-float';

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
    this.nbLights = 6;

    this.initLights();
  }

  /**
   * initLights function
   * @param {number} delta  Delta time from three global clock
   */
  initLights() {
    for (let i = 0; i < this.nbLights; i++) {

      const plight = new PointLight({
        hex: 0x6d7caa,
        intensity: 1,
        distance: 200
      });

      plight.gravitationOptions = {
        x: {
          offset: randomFloat(-Math.PI/2, Math.PI/2),
          distance: randomInt(150, 300),
          velocity: randomFloat(0.5, 1)
        },
        y: {
          offset: randomFloat(-Math.PI/2, Math.PI/2),
          distance: randomInt(150, 300),
          velocity: randomFloat(0.5, 1)
        },
        z: {
          offset: randomFloat(-Math.PI/2, Math.PI/2),
          distance: randomInt(150, 400),
          velocity: randomFloat(0.5, 1)
        }
      }

      // plight.addSphere();

      //Generate Spheres
      const geom = new THREE.SphereGeometry(1, 10, 10);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
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
  updateLight(light, time, delta) {
    const gOption = light.gravitationOptions;
    light.position.x = Math.sin(gOption.x.velocity * time + gOption.x.offset) * gOption.x.distance;
    light.position.y = Math.sin(gOption.y.velocity * time + gOption.y.offset) * gOption.y.distance;
    light.position.z = Math.cos(gOption.z.velocity * time + gOption.z.offset) * gOption.z.distance;
  }
}

export default Player;