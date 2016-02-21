import { Events } from 'helpers';

/**
 * Renderer class
 */
class Renderer extends THREE.WebGLRenderer {

  /**
   * Constructor function
   * @param {Object} Configuration Configuration
   */
  constructor( Configuration ) {

    const { antialias, alpha, clearColor, pixelRatio } = Configuration.get( 'renderer' );

    super({ antialias, alpha });

    this.setSize( window.innerWidth, window.innerHeight );
    this.setClearColor( clearColor, 1 );
    this.setPixelRatio( pixelRatio );
    this.clear();

    // Shadows
    this.shadowMap.enabled = true;
    this.shadowMap.type = THREE.PCFSoftShadowMap;

    // Gamma 2.2 / Linear workflow
    this.gammaInput = true;
    this.gammaOutput = true;


    // Resize listener
    Events.on( 'resize', ::this.resize );
  }

  /**
   * Resize function
   * @param  {integer} width  Width
   * @param  {integer} height Height
   */
  resize( width, height ) {

    this.setSize( width, height );
  }
}

export default Renderer;