import PointLight from '../Light/PointLight';
import randomInt from 'utils/random-int';

/**
 * Player class
 * @param {Configuration} Configuration Configuration
 */
class Player extends THREE.Object3D {

  /**
   * constructor function
   */
  constructor(Configuration) {
    super();

    this.configuration = Configuration.get( 'player.pointLights' );
    this.distance = 32;

    this.lights = [];
    this.nbLights = this.configuration.number;

    this.initLights();

    this.rays = [
      new THREE.Vector3(0, 1, 0), // Up
      new THREE.Vector3(0, -1, 0), // Down
      new THREE.Vector3(-1, 0, 0), // left
      new THREE.Vector3(1, 0, 0), // Right
      new THREE.Vector3(0, 0, 1), // Front
      new THREE.Vector3(0, 1, -1) // Back
    ];

    // this.caster = new THREE.Raycaster();
  }

  collision() {

    for (let i = 0; i < this.rays.length; i += 1) {

      // We reset the raycaster to this direction
      this.caster.set(this.position, this.rays[i]);

      // Test if we intersect with any obstacle mesh
      const collisions = this.caster.intersectObjects([this.terrain]);

      // And disable that direction if we do
        if (collisions.length > 0 && collisions[0].distance <= this.distance) {


        console.log('BOOOOOOOMM BOOOOOOM');


        // Yep, this.rays[i] gives us : 0 => up, 1 => up-left, 2 => left, ...
        // if ((i === 0 || i === 1 || i === 7) && this.direction.z === 1) {
        //   this.direction.setZ(0);
        // } else if ((i === 3 || i === 4 || i === 5) && this.direction.z === -1) {
        //   this.direction.setZ(0);
        // }
        // if ((i === 1 || i === 2 || i === 3) && this.direction.x === 1) {
        //   this.direction.setX(0);
        // } else if ((i === 5 || i === 6 || i === 7) && this.direction.x === -1) {
        //   this.direction.setX(0);
        // }
      }
    }
  }

  /**
   * initLights function
   * @param {number} delta  Delta time from three global clock
   */
  initLights() {
    for (let i = 0; i < this.nbLights; i++) {

      const plight = new PointLight({
        hex: parseInt(this.configuration.colors[randomInt(0, this.configuration.colors.length - 1)], 16),
        intensity: this.configuration.intensity,
        distance: this.configuration.distance,
        decay: this.configuration.decay
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
    // this.collision();
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