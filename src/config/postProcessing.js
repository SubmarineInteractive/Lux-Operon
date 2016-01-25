import { BlendMode } from '@superguigui/wagner';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';
import ZoomBlurPass from '@superguigui/wagner/src/passes/zoom-blur/ZoomBlurPass';
import MultiPassBloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import DOFPass from '@superguigui/wagner/src/passes/dof/DOFPass';

export default {
  active: false,
  effectComposer: {
    useRGBA: true
  },
  passes: [
    {
      name: 'fxaaPass',
      active: true,
      constructor: new FXAAPass()
    },
    {
      name: 'zoomBlurPass',
      active: true,
      constructor: new ZoomBlurPass({ strength: 0.04 })
    },
    {
      name: 'multiPassBloomPass',
      active: true,
      constructor: new MultiPassBloomPass({
        blurAmount: .5,
        applyZoomBlur: true,
        zoomBlurStrength: 0.7,
        blendMode: BlendMode.Screen
      })
    },
    {
      name: 'dofPass',
      active: false,
      constructor: new DOFPass({
        focalDistance: .01,
        aperture: .005,
        tBias: null,
        blurAmount: 1
      })
    }
  ]
};