import UniformsTerrain from './shaders/uniforms';
import vertexShader from './shaders/vert.glsl';
import fragmentShader from './shaders/frag.glsl';

const glslify = require('glslify');

function replaceThreeChunkFn(a, b) {
  return THREE.ShaderChunk[b] + '\n';
}

function shaderParse(glsl) {
  return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, replaceThreeChunkFn);
}

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
// console.log(shaderParse(vertexShader));
    this.uniforms = THREE.UniformsUtils.clone( UniformsTerrain );

    // console.log(shaderParse(vertexShader));
    // var src = glslify(`
    //   precision mediump float;
    //
    //   void main() {
    //     gl_FragColor = vec4(1.0);
    //   }
    // `, { inline: true });
    // console.log(src);
    this.vertexShader = glslify( vertexShader + '', { inline: true } );
    // this.fragmentShader = glslify( shaderParse(fragmentShader), { inline: true } );
    this.lights = true;
    this.fog = true;
    this.shading = THREE.FlatShading;
    this.wireframe = false;

    diffuseTexture1.wrapS = diffuseTexture1.wrapT = THREE.RepeatWrapping;
    // detailTexture.wrapS = detailTexture.wrapT = THREE.RepeatWrapping;

    this.uniforms[ "tNormal" ].value = normalMap;
		// this.uniforms[ "uNormalScale" ].value = 3.5;
    this.uniforms[ "tDisplacement" ].value = heightMap;

    this.uniforms[ "enableDiffuse1" ].value = false;
    this.uniforms[ "enableDiffuse2" ].value = false;
    this.uniforms[ "enableSpecular" ].value = false;

    this.uniforms[ "tDiffuse1" ].value = diffuseTexture1;
    // this.uniforms[ "tDetail" ].value = detailTexture;

    this.uniforms[ "diffuse" ].value.setHex( 0xffffff );
    this.uniforms[ "specular" ].value.setHex( 0xffffff );

    this.uniforms[ "shininess" ].value = 30;

    this.uniforms[ "uDisplacementScale" ].value = 300;

    this.uniforms[ "uRepeatOverlay" ].value.set( 6, 6 );
  }
}

export default TerrainMaterial;