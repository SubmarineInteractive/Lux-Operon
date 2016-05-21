import SPE from 'shader-particle-engine';
import { particleSystemGroup as groupConfig } from 'config/webgl/experience';

/**
 * Group class
 */
class Group extends SPE.Group {

  /**
   * Constructor function
   * @param {object} customConfig Custom configuration
   */
  constructor( customConfig = {}) {
    super({ ...groupConfig, ...customConfig });
  }
}

export default Group;