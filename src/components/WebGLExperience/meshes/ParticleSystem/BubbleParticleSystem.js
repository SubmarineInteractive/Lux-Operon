import ParticleSystem from './';
import { bubbleParticleSystemEmitter as emitterConfig } from 'config/webgl/experience';
import { randomInt } from 'utils';

/**
 * BubbleParticleSystem class
 */
class BubbleParticleSystem extends ParticleSystem {

  /**
   * constructor function
   * @param {Terrain} Terrain  Terrain
   * @param {Object} resources Resources
   */
  constructor( Terrain, resources ) {

    const groupConfig = {
      texture: {
        value: resources.bubbleTexture
      }
    };

    super( groupConfig, emitterConfig );

    this.group.mesh.rotation.x = - Math.PI / 2;

    const terrainVerticesLength = Terrain.geometry.vertices.length;

    for ( let i = 0; i < this.emitters.length; i++ ) {

      const vertex = Terrain.geometry.vertices[ randomInt( 0, terrainVerticesLength - 1 ) ].clone();

      this.emitters[ i ].position.value.x = vertex.x;
      this.emitters[ i ].position.value.y = - vertex.z;
      this.emitters[ i ].position.value.z = vertex.y;

      const spread = randomInt( -100, -15 );
      this.emitters[ i ].acceleration.spread.copy( new THREE.Vector3( spread, spread, spread ) );

      this.group.addEmitter( this.emitters[ i ] );
    }
  }
}

export default BubbleParticleSystem;