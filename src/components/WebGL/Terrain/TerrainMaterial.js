import UniformsTerrain from './shaders/uniforms';

const glslify = require('glslify');

/**
 * TerrainMaterial class
 *
 * Dynamic terrain shader :
 * 	- Blinn-Phong
 *  - height + normal + diffuse1 + diffuse2 + specular + detail maps
 *  - point, directional and hemisphere lights (use with "lights: true" material option)
 *  - shadow maps receiving
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

    let uniformsTerrain = THREE.UniformsUtils.clone( UniformsTerrain );

    this.uniforms = uniformsTerrain;
    this.vertexShader = glslify('./shaders/vert.glsl');
    this.fragmentShader = glslify('./shaders/frag.glsl');
    this.lights = true;
    this.fog = true;
    this.shading = THREE.FlatShading;
    this.wireframe = false;

    diffuseTexture1.wrapS = diffuseTexture1.wrapT = THREE.RepeatWrapping;
    // detailTexture.wrapS = detailTexture.wrapT = THREE.RepeatWrapping;

    uniformsTerrain[ "tNormal" ].value = normalMap;
		// uniformsTerrain[ "uNormalScale" ].value = 3.5;
    uniformsTerrain[ "tDisplacement" ].value = heightMap;

    uniformsTerrain[ "enableDiffuse1" ].value = false;
    uniformsTerrain[ "enableDiffuse2" ].value = false;
    uniformsTerrain[ "enableSpecular" ].value = false;

    uniformsTerrain[ "tDiffuse1" ].value = diffuseTexture1;
    // uniformsTerrain[ "tDetail" ].value = detailTexture;

    uniformsTerrain[ "diffuse" ].value.setHex( 0xffffff );
    uniformsTerrain[ "specular" ].value.setHex( 0xffffff );

    uniformsTerrain[ "shininess" ].value = 30;

    uniformsTerrain[ "uDisplacementScale" ].value = 300;

    uniformsTerrain[ "uRepeatOverlay" ].value.set( 6, 6 );
  }
}

export default TerrainMaterial;