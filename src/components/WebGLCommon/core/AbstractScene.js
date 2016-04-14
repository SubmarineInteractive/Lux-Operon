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

    const { fov, aspect, near, far, position, target, orbitControls } = camera;

    // Abstract camera
    this.camera = new AbstractCamera({ fov, aspect, near, far, position, target, orbitControls });

    const { antialias, alpha, clearColor, clearColorAlpha, pixelRatio } = renderer;

    // Abstract renderer
    this.renderer = new AbstractRenderer({ antialias, alpha, clearColor, clearColorAlpha, pixelRatio });

    // Effect composer
    this.effectComposer = new EffectComposer( this.renderer );
    this.postProcessing = new PostProcessing( this.effectComposer, this, this.camera, this.renderer, postProcessing );

    // Misc
    this.clock = new Clock();
    this.raf = raf( ::this.render ).start();
  }

  /**
   * render function
   */
  preRender() {
    this.postProcessing.update();
  }
}

export default AbstractScene;