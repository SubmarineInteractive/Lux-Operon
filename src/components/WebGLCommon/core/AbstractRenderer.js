import withStore from 'decorators/withStore';

/**
 * AbstractRenderer class
 */
@withStore({ handleResize: ({ viewport }) => ({ width: viewport.width, height: viewport.height }) })
class AbstractRenderer extends THREE.WebGLRenderer {

  /**
   * constructor function
   */
  constructor({ antialias, alpha, clearColor, clearColorAlpha, pixelRatio }) {

    super({ antialias, alpha });

    this.setSize( window.innerWidth, window.innerHeight );
    this.setClearColor( clearColor, clearColorAlpha );
    this.setPixelRatio( pixelRatio );
    this.clear();

    // Shadows
    this.shadowMap.enabled = true;
    this.shadowMap.type = THREE.PCFSoftShadowMap;

    // Gamma 2.2 / Linear workflow
    this.gammaInput = true;
    this.gammaOutput = true;
  }

  /**
   * handleResize function
   * @param {Object} size         Viewport size
   * @param {number} param.width  Viewport width
   * @param {number} param.height Viewport height
   */
  handleResize({ width, height }) {
    this.setSize( width, height );
  }
}

export default AbstractRenderer;