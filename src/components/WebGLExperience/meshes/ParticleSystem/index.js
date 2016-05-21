import Group from './Group';
import Emitter from './Emitter';

/**
 * ParticleSystem class
 */
class ParticleSystem {

  /**
   * constructor function
   * @param {Object} groupConfig   Group configuration
   * @param {Object} emitterConfig Emitter configuration
   */
  constructor( groupConfig, emitterConfig ) {

    this.group = new Group( groupConfig );

    this.emitters = [];

    for ( let i = 0; i < emitterConfig.count; i++ ) {
      const emitter = new Emitter( emitterConfig );
      this.emitters.push( emitter );
    }
  }
}

export default ParticleSystem;