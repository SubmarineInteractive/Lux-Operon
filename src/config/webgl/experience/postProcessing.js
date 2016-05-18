import { BlendMode } from '@superguigui/wagner';
import MultiPassBloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';
import TiltshiftPass from '@superguigui/wagner/src/passes/tiltshift/tiltshiftPass';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';

export default {
  active: false,
  passes: [
    {
      name: 'multiPassBloomPass',
      active: true,
      constructor: new MultiPassBloomPass({
        blurAmount: 0.1,
        applyZoomBlur: true,
        zoomBlurStrength: 0.1,
        blendMode: BlendMode.Darken
      })
    },
    {
      name: 'vignettePass',
      active: true,
      constructor: new VignettePass({
        boost: 1,
        reduction: 0.6
      })
    },
    {
      name: 'tiltshiftPass',
      active: true,
      constructor: new TiltshiftPass({
        bluramount: 0.8,
        center: 1,
        stepSize: 0.004
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
      name: 'fxaaPass',
      active: true,
      constructor: new FXAAPass()
    }
  ]
};