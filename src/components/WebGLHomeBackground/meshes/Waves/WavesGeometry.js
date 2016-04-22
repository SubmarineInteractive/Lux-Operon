/**
 * WavesGeometry class
 */
class WavesGeometry extends THREE.PlaneGeometry {

  /**
   * constructor function
   */
  constructor({ width, height, segments: { width: segmentsWidth, height: segmentsHeight } }) {
    super( width, height, segmentsWidth, segmentsHeight );
  }
}

export default WavesGeometry;