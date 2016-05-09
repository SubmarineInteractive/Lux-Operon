/**
 * Fog class
 */
class Fog extends THREE.FogExp2 {

  /**
   * Constructor function
   * @param {Scene} Scene instance
   * @param {Renderer} Renderer instance
   * @param {Objects} configuration Configuration
   */
  constructor( Scene, Renderer, configuration ) {

    super( configuration.color, configuration.density );

    this.scene = Scene;

    this.initialColor = configuration.color;

    this.configuration = configuration;

    this.scene.fog = this;

    this.renderer = Renderer;
    this.renderer.setClearColor( this.color );
  }
}

export default Fog;
