import SPE from 'shader-particle-engine';
import { particleSystemEmitter as emitterConfig } from 'config/webgl/experience';

/**
 * Emitter class
 */
class Emitter extends SPE.Emitter {

  /**
   * Constructor function
   * @param {object} customConfig Custom configuration
   */
  constructor( customConfig = {}) {
    super({ ...emitterConfig, ...customConfig });
  }
}

export default Emitter;