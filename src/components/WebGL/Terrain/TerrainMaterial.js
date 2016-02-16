import UniformsTerrain from './shaders/uniforms';
import vertexShader from './shaders/vert.glsl';
import fragmentShader from './shaders/frag.glsl';
import ShaderTerrain from './ShaderTerrain';
import { shaderParse } from 'utils';

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

    const heightMapTexture = TextureLoader.get('heightMap');
    const normalMap = TextureLoader.get('normalMap');

    var rx = 256,
    ry = 256;

    var pars = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBFormat
    };

    var heightMap = new THREE.WebGLRenderTarget( rx, ry, pars );
    heightMap.texture = heightMapTexture;

    const diffuseTexture1 = TextureLoader.get('rockDiffuse');
    // const detailTexture = TextureLoader.get('detailTexture');

    var terrainShader = ShaderTerrain[ "terrain" ];

      var uniformsTerrain = Object.assign(

          THREE.UniformsUtils.clone( terrainShader.uniforms ),

          {
              fog: false,
              lights: true
          },

          THREE.UniformsLib['common'],
          THREE.UniformsLib['fog'],
          THREE.UniformsLib['lights'],
          THREE.UniformsLib['shadowmap'],

          {
                  ambient  : { type: "c", value: new THREE.Color( 0xffffff ) },
                  emissive : { type: "c", value: new THREE.Color( 0x000000 ) },
                  wrapRGB  : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }
          }

      );

      uniformsTerrain[ "tDisplacement" ].value = heightMap;
      uniformsTerrain[ "shadowMap" ].value = [normalMap];

      uniformsTerrain[ "uDisplacementScale" ].value = 100;
      uniformsTerrain[ "uRepeatOverlay" ].value.set( 6, 6 );


    this.lights = true;
    this.side = THREE.DoubleSide;
    this.shading = THREE.SmoothShading;

    this.uniforms = uniformsTerrain;
    this.vertexShader = terrainShader.vertexShader;
    this.fragmentShader = terrainShader.fragmentShader;
    // this.vertexShader = shaderParse(vertexShader);
    // this.fragmentShader = shaderParse(fragmentShader);

    // this.lights = true;
    // this.fog = true;
    // this.shading = THREE.FlatShading;
    // this.wireframe = false;
  }
}

export default TerrainMaterial;