import Splines from '../data/splines'
import Configuration from '../helpers/Configuration'
import Scene from '../components/Scene'
import Camera from '../components/Camera'
import Renderer from '../components/Renderer'
import PostProcessing from '../components/PostProcessing/PostProcessing'
import EffectComposer from '../components/PostProcessing/EffectComposer'
import Clock from '../components/Utils/Clock'
import Topography from '../components/Topography'
import GUI from '../components/Utils/GUI'
import TextureLoader from '../helpers/TextureLoader'

export default [
  // --- Constants
  {
    type: 'constant',
    name: 'Splines',
    value: Splines
  },
  // --- Services
  {
    type: 'service',
    name: 'Configuration',
    constructor: Configuration
  },
  {
    type: 'service',
    name: 'Scene',
    constructor: Scene
  },
  {
    type: 'service',
    name: 'Camera',
    constructor: Camera,
    dependencies: [ 'Configuration' ]
  },
  {
    type: 'service',
    name: 'Renderer',
    constructor: Renderer
  },
  {
    type: 'service',
    name: 'EffectComposer',
    constructor: EffectComposer,
    dependencies: [ 'Renderer', 'Configuration' ]
  },
  {
    type: 'service',
    name: 'PostProcessing',
    constructor: PostProcessing,
    dependencies: [ 'EffectComposer', 'Scene', 'Camera', 'Renderer', 'GUI', 'Configuration' ]
  },
  {
    type: 'service',
    name: 'Clock',
    constructor: Clock
  },
  {
    type: 'service',
    name: 'Topography',
    constructor: Topography,
    dependencies: [ 'Splines', 'GUI', 'Configuration' ]
  },
  {
    type: 'service',
    name: 'GUI',
    constructor: GUI
  },
  {
    type: 'service',
    name: 'TextureLoader',
    constructor: TextureLoader,
    dependencies: [ 'Configuration' ]
  }
]