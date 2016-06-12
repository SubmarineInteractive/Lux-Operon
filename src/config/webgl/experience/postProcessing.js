import { BlendMode } from '@superguigui/wagner';
import MultiPassBloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import RGBSplitPass from 'components/WebGLCommon/postProcessing/passes/RGBSplit';
import TiltShiftPass from '@superguigui/wagner/src/passes/tiltShift/tiltShiftPass';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';

export default {
  active: false,
  passes: [
    {
      name: 'multiPassBloomPass',
      active: false,
      constructor: () => new MultiPassBloomPass({
        blurAmount: 0.1,
        applyZoomBlur: true,
        zoomBlurStrength: 0.05,
        blendMode: BlendMode.Darken
      })
    },
    {
      name: 'RGBSplitPass',
      active: true,
      constructor: () => new RGBSplitPass({
        delta: new THREE.Vector2( 10, 10 )
      })
    },
    {
      name: 'noisePass',
      active: true,
      constructor: () => new NoisePass({
        amount: 0.01,
        speed: 0.1
      })
    },
    {
      name: 'tiltshiftPass',
      active: true,
      constructor: () => new TiltShiftPass({
        bluramount: 0.6,
        center: 1,
        stepSize: 0.005
      })
    },
    {
      name: 'fxaaPass',
      active: true,
      constructor: () => new FXAAPass()
    }
  ]
};
