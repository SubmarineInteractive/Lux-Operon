/**
 * Level class
 */
class Level extends THREE.Object3D {

  /**
   * Constructor function
   * @param {Fog} Fog instance
   * @param {Terrain} Terrain instance
   */
  constructor(Fog, Terrain) {
    super();

    this.terrain = Terrain;
    this.fog = Fog;
    this.add(this.terrain);
  }
}

export default Level;