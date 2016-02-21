import { toType } from 'utils';

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
   * @param {GUI}            Gui            GUI instance
   * @param {Configuration}  Configuration  Configuration instance
   */
  constructor( EffectComposer, Scene, Camera, Renderer, Gui, Configuration ) {

    this.scene = Scene;
    this.camera = Camera;
    this.renderer = Renderer;
    this.configuration = Configuration.get( 'postProcessing' );
    this.passes = this.configuration.passes.filter( pass => pass.active );
    this.usePostProcessing = this.configuration.active;
    this.composer = EffectComposer;
    this.gui = Gui;

    this.initGUI();
  }

  /**
   * InitGUI function
   * @todo Make this function generic
   */
  initGUI() {

    const folder = this.gui.addFolder( 'Post processing' );

    folder.add( this.configuration, 'active' );

    this.passes.forEach( pass => {

      const passFolder = folder.addFolder( pass.name );
      const passParams = pass.constructor.params;

      passFolder.add( pass, 'active' );

      for ( let paramName in passParams ) {

        if( passParams.hasOwnProperty( paramName ) ) {

          const paramType = toType( passParams[ paramName ] );

          if ( paramType === 'number' ||
              paramType === 'boolean' ||
              paramType === 'string' ) {

            passFolder.add( passParams, paramName );

          } else if ( paramType === 'object' ) {

            const paramFolder = passFolder.addFolder( paramName );

            for( let subParamName in passParams[ paramName ] ) {

              if ( passParams[ paramName ].hasOwnProperty( subParamName ) ) {

                const subParamType = toType( passParams[ paramName ][ subParamName ] );
                if ( subParamType === 'number' ||
                    subParamType === 'boolean' ||
                    subParamType === 'string' ) {

                  paramFolder.add( passParams[ paramName ], subParamName );
                }
              }
            }
          }
        }
      }
    });
  }

  /**
   * update function
   */
  update() {

    if( this.configuration.active ) {

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