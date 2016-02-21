import SPE from 'shader-particle-engine';
import groupConfig from '../../config/ParticleSystem/group';

/**
 * Group class
 */
class Group extends SPE.Group {

  /**
   * Constructor function
   * @param  {object} customConfig Custom configuration
   */
  constructor( customConfig = {}) {
    super({ ...groupConfig, ...customConfig });
  }
}

export default Group;