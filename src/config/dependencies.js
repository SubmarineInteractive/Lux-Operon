import Configuration from '../helpers/Configuration';
import Scene from '../components/WebGL/Core/Scene';
import Camera from '../components/WebGL/Core/Camera';
import Renderer from '../components/WebGL/Core/Renderer';
import PostProcessing from '../components/WebGL/PostProcessing/PostProcessing';
import EffectComposer from '../components/WebGL/PostProcessing/EffectComposer';
import Clock from '../components/WebGL/Utils/Clock';
import GUI from '../components/WebGL/Utils/GUI';
import TextureLoader from '../helpers/TextureLoader';

import TerrainGeometry from '../components/WebGL/Terrain/TerrainGeometry';
import TerrainMaterial from '../components/WebGL/Terrain/TerrainMaterial';

export default [
  // --- Core
  {
    type: 'service',
    name: 'Configuration',
    constructor: Configuration
  },

  // --- WebGL Core
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
    name: 'GUI',
    constructor: GUI
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
    name: 'TextureLoader',
    constructor: TextureLoader,
    dependencies: [ 'Configuration' ]
  },
  // --- WebGL scene objects
  //  |---- WebGl Terrain
  {
    type: 'service',
    name: 'TerrainGeometry',
    constructor: TerrainGeometry,
    dependencies: ['Configuration']
  },
  {
    type: 'service',
    name: 'TerrainMaterial',
    constructor: TerrainMaterial,
    dependencies: ['Configuration']
  }
];
