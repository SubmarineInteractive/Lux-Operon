import raf from 'raf-loop';
import AbstractRenderer from 'common/core/AbstractRenderer';
import AbstractCamera from 'common/core/AbstractCamera';
import EffectComposer from 'common/postProcessing/EffectComposer';
import PostProcessing from 'common/postProcessing/PostProcessing';
import Clock from 'common/utils/Clock';

/**
 * AbstractScene class
 */
class AbstractScene extends THREE.Scene {

  constructor({ camera, renderer, postProcessing }) {

    super();

    const { fov, aspect, near, far, position, orbitControls } = camera;

    // Abstract camera
    this.camera = new AbstractCamera({ fov, aspect, near, far, position, orbitControls });

    const { antialias, alpha, clearColor, clearColorAlpha, pixelRatio } = renderer;

    // Abstract renderer
    this.renderer = new AbstractRenderer({ antialias, alpha, clearColor, clearColorAlpha, pixelRatio });

    // Effect composer
    this.effectComposer = new EffectComposer( this.renderer );
    this.postProcessing = new PostProcessing( this.effectComposer, this, this.camera, this.renderer, postProcessing );

    // Misc
    this.clock = new Clock();
    this.raf = raf( ::this.render ).start();

    // Debug helpers
    if( __DEV__ ) {
      // this.debug();
    }
  }

  /**
   * Debug function
   * @todo Create a separate class
   */
  debug() {

    // Axis helper
    const axis = new THREE.AxisHelper( 1000 );
    this.add( axis );

    // Grid helper
    const gridHelper = new THREE.GridHelper( 2000, 100 );
    this.add( gridHelper );
  }

  /**
   * preRender function
   */
  preRender() {
    this.postProcessing.update();
  }
}

export default AbstractScene;