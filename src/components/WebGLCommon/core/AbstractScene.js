import raf from 'raf-loop';
import AbstractRenderer from 'common/core/AbstractRenderer';
import AbstractCamera from 'common/core/AbstractCamera';
import EffectComposer from 'common/postProcessing/EffectComposer';
import PostProcessing from 'common/postProcessing/PostProcessing';
import Clock from 'common/utils/Clock';

import Emitter from 'helpers/Emitter';

import {
  WINDOW_ON_BLUR,
  WINDOW_ON_FOCUS
} from 'config/messages';


/**
 * AbstractScene class
 */
class AbstractScene extends THREE.Scene {

  /**
   * constructor function
   * @param {Object} Configuration 
   */
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

    // Events
    this.onWindowFocus = this.onWindowFocus.bind( this );
    this.onWindowBlur = this.onWindowBlur.bind( this );

    Emitter.on( WINDOW_ON_FOCUS, this.onWindowFocus );
    Emitter.on( WINDOW_ON_BLUR, this.onWindowBlur );
  }

  /**
   * debug function
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
   * onWindowFocus function
   */
  onWindowFocus() {
    this.raf.start();
  }

  /**
   * onWindowBlur function
   */
  onWindowBlur() {
    this.raf.stop();
  }

  /**
   * preRender function
   */
  preRender() {
    this.postProcessing.update();
  }
}

export default AbstractScene;
