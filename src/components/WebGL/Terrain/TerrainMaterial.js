import TerrainShader from './TerrainShader';

/**
 * TerrainMaterial class
 */
class TerrainMaterial extends THREE.ShaderMaterial {

  /**
   * Constructor function
   * @param {Configuration} Configuration instance
   * @param {TextureLoader} TextureLoader instance
   */
  constructor (Configuration, TextureLoader) {
    super();

    const heightMap = TextureLoader.get('rockHeightmap');
    const normalMap = TextureLoader.get('rockNorm');
    const diffuseTexture1 = TextureLoader.get('rockDiffuse');
    // const detailTexture = TextureLoader.get('detailTexture');

    diffuseTexture1.wrapS = diffuseTexture1.wrapT = THREE.RepeatWrapping;
    // detailTexture.wrapS = detailTexture.wrapT = THREE.RepeatWrapping;

    const terrainShader = TerrainShader[ "terrain" ];
    let uniformsTerrain = THREE.UniformsUtils.clone( terrainShader.uniforms );
    uniformsTerrain[ "tNormal" ].value = normalMap;
		// uniformsTerrain[ "uNormalScale" ].value = 3.5;
    uniformsTerrain[ "tDisplacement" ].value = heightMap;

    uniformsTerrain[ "enableDiffuse1" ].value = true;
    uniformsTerrain[ "enableDiffuse2" ].value = false;
    uniformsTerrain[ "enableSpecular" ].value = false;

    uniformsTerrain[ "tDiffuse1" ].value = diffuseTexture1;
    // uniformsTerrain[ "tDetail" ].value = detailTexture;

    uniformsTerrain[ "diffuse" ].value.setHex( 0xffffff );
    uniformsTerrain[ "specular" ].value.setHex( 0xffffff );

    uniformsTerrain[ "shininess" ].value = 30;

    uniformsTerrain[ "uDisplacementScale" ].value = 375;

    // uniformsTerrain[ "uRepeatOverlay" ].value.set( 6, 6 );

    this.uniforms = uniformsTerrain;
    this.vertexShader = terrainShader.vertexShader;
    this.fragmentShader = terrainShader.fragmentShader;
    this.lights = true;
    this.fog = true;
    this.shading = THREE.FlatShading;
    this.wireframe = false;
  }
}

export default TerrainMaterial;
