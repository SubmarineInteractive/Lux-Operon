import { Composer } from '@superguigui/wagner';
import withStore from 'decorators/withStore';

/**
 * EffectComposer class
 */
@withStore({ handleResize: ({ viewport }) => ({ width: viewport.width, height: viewport.height }) })
class EffectComposer extends Composer {

  /**
   * Constructor function
   * @param {object} renderer Renderer
   */
  constructor( renderer ) {
    super( renderer, { useRGBA: true });
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

export default EffectComposer;