import { BlendMode } from '@superguigui/wagner';
import MultiPassBloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import DOFPass from '@superguigui/wagner/src/passes/dof/DOFPass';
import ZoomBlurPass from '@superguigui/wagner/src/passes/zoom-blur/ZoomBlurPass';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';

export default {
  active: false,
  effectComposer: {
    useRGBA: true
  },
  passes: [
    {
      name: 'multiPassBloomPass',
      active: false,
      constructor: new MultiPassBloomPass({
        blurAmount: .5,
        applyZoomBlur: false,
        zoomBlurStrength: 0.7,
        blendMode: BlendMode.Screen
      })
    },
    {
      name: 'dofPass',
      active: false,
      constructor: new DOFPass({
        focalDistance: 0.05,
        aperture: 0.005,
        tBias: null,
        blurAmount: 1
      })
    },
    {
      name: 'zoomBlurPass',
      active: false,
      constructor: new ZoomBlurPass({ strength: 0.05 })
    },
    {
      name: 'noisePass',
      active: false,
      constructor: new NoisePass({ amount: 0.03, speed: 0 })
    },
    {
      name: 'fxaaPass',
      active: false,
      constructor: new FXAAPass()
    }
  ]
};