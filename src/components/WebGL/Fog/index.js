class Fog extends THREE.FogExp2 {

  /**
   * Constructor function
   * @param {Scene} Scene instance
   * @param {Renderer} Renderer instance
   * @param {Configuration} Configuration instance
   */
  constructor(Scene, Renderer, Configuration) {
    const fogConfig = Configuration.get('fog');

    super(fogConfig.color, fogConfig.density);

    this.scene = Scene;

    this.scene.fog = this;

    this.renderer = Renderer;
    this.renderer.setClearColor( this.color );


  }

  /**
   * Update fog render
   */
  update() {

    this.renderer.setClearColor( this.color );
  }

}

export default Fog;