import { Events } from 'helpers';

/**
 * Renderer class
 */
class Renderer extends THREE.WebGLRenderer {

  /**
   * Constructor function
   * @param  {object} options Options
   */
  constructor( options = { antialias: true, alpha: true }) {
    super( options );

    this.setSize( window.innerWidth, window.innerHeight );
    this.setClearColor( 0x000000 );
    this.setPixelRatio( window.devicePixelRatio );
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