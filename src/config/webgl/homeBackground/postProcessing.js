import { BlendMode } from '@superguigui/wagner';
import MultiPassBloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import TiltShiftPass from '@superguigui/wagner/src/passes/tiltShift/tiltShiftPass';
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';

export default {
  active: true,
  effectComposer: {
    useRGBA: true
  },
  passes: [
    {
      name: 'multiPassBloomPass',
      active: true,
      constructor: new MultiPassBloomPass({
        blurAmount: 0.5,
        applyZoomBlur: true,
        zoomBlurStrength: 1.5,
        blendMode: BlendMode.Screen
      })
    },
    {
      name: 'tiltShiftPass',
      active: true,
      constructor: new TiltShiftPass({
        bluramount: 1,
        center: 1,
        stepSize: 0.05
      })
    },
    {
      name: 'noisePass',
      active: true,
      constructor: new NoisePass({
        amount: 0.02,
        speed: 0.1
      })
    },
    {
      name: 'vignettePass',
      active: true,
      constructor: new VignettePass({
        boost: 1,
        reduction: 0.3
      })
    },
    {
      name: 'fxaaPass',
      active: true,
      constructor: new FXAAPass()
    }
  ]
};