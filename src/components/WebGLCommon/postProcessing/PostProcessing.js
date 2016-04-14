/**
 * PostProcessing class
 */
class PostProcessing {

  /**
   * Constructor function
   *
   * @param {EffectComposer} EffectComposer EffectComposer instance
   * @param {Scene}          Scene          Scene instance
   * @param {Camera}         Camera         Camera instance
   * @param {Renderer}       Renderer       Renderer instance
   * @param {Configuration}  Configuration  Configuration instance
   */
  constructor( EffectComposer, Scene, Camera, Renderer, Configuration ) {

    this.composer = EffectComposer;
    this.scene = Scene;
    this.camera = Camera;
    this.renderer = Renderer;
    this.configuration = Configuration;
    this.passes = this.configuration.passes.filter( pass => pass.active );
    this.usePostProcessing = this.configuration.active;
  }

  /**
   * update function
   */
  update() {

    if( this.usePostProcessing ) {

      this.composer.reset();
      this.composer.render( this.scene, this.camera );

      for ( let i = 0; i < this.passes.length; i++ ) {
        this.composer.pass( this.passes[ i ].constructor );
      }

      this.composer.toScreen();

    } else {

      this.renderer.render( this.scene, this.camera );
    }
  }
}

export default PostProcessing;