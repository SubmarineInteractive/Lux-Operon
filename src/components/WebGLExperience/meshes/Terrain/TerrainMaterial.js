/**
 * TerrainMaterial class
 */
class TerrainMaterial extends THREE.MeshPhongMaterial {

  /**
   * Constructor function
   * @param {Object} configuration Configuration instance
   */
  constructor({ color, emissive, specular, shininess }) {

    super();

    // Set properties
    this.color = color;

    this.shading = THREE.FlatShading;

    this.shininess = shininess;

    this.emissive = emissive;

    this.specular = specular;

    this.fog = true;
  }
}

export default TerrainMaterial;