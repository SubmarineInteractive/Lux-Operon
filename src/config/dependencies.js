import Configuration from '../helpers/Configuration';
import Scene from '../components/WebGL/Core/Scene';
import Camera from '../components/WebGL/Core/Camera';
import Renderer from '../components/WebGL/Core/Renderer';
import PostProcessing from '../components/WebGL/PostProcessing/PostProcessing';
import EffectComposer from '../components/WebGL/PostProcessing/EffectComposer';
import Clock from '../components/WebGL/Utils/Clock';
import GUI from '../components/WebGL/Utils/GUI';
import TextureLoader from '../helpers/TextureLoader';

import Level from '../components/WebGL/Level';
import Player from '../components/WebGL/Level/Player';
import Fog from '../components/WebGL/Fog';

import BoundingBox from '../components/WebGL/Level/BoundingBox';
import BoundingBoxGeometry from '../components/WebGL/Level/BoundingBox/BoundingBoxGeometry';
import BoundingBoxMaterial from '../components/WebGL/Level/BoundingBox/BoundingBoxMaterial';

import Terrain from '../components/WebGL/Terrain';
import TerrainGeometry from '../components/WebGL/Terrain/TerrainGeometry';
import TerrainMaterial from '../components/WebGL/Terrain/TerrainMaterial';

import AmbientLight from '../components/WebGL/Light/AmbientLight';
import DirectionalLight from '../components/WebGL/Light/DirectionalLight';

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
    dependencies: [ 'Configuration', 'Renderer' ]
  },
  {
    type: 'service',
    name: 'Renderer',
    constructor: Renderer,
    dependencies: [ 'Configuration' ]
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
  // --- WebGL Scene objects
  {
    type: 'service',
    name: 'Level',
    constructor: Level,
    dependencies: [ 'Terrain', 'BoundingBox', 'Player' ]
  },
  {
    type: 'service',
    name: 'Player',
    constructor: Player,
    dependencies: [ 'Configuration' ]
  },
  {
    type: 'service',
    name: 'Fog',
    constructor: Fog,
    dependencies: [ 'Scene', 'Renderer', 'Configuration' ]
  },
  //  |---- WebGL BoundingBox
  {
    type: 'service',
    name: 'BoundingBox',
    constructor: BoundingBox,
    dependencies: [ 'BoundingBoxGeometry', 'BoundingBoxMaterial' ]
  },
  {
    type: 'service',
    name: 'BoundingBoxGeometry',
    constructor: BoundingBoxGeometry,
    dependencies: [ 'Configuration', 'Terrain' ]
  },
  {
    type: 'service',
    name: 'BoundingBoxMaterial',
    constructor: BoundingBoxMaterial,
    dependencies: [ 'Configuration' ]
  },
  //  |---- WebGL Terrain
  {
    type: 'service',
    name: 'Terrain',
    constructor: Terrain,
    dependencies: [ 'TerrainGeometry', 'TerrainMaterial' ]
  },
  {
    type: 'service',
    name: 'TerrainGeometry',
    constructor: TerrainGeometry,
    dependencies: [ 'Configuration', 'TextureLoader' ]
  },
  {
    type: 'service',
    name: 'TerrainMaterial',
    constructor: TerrainMaterial,
    dependencies: [ 'Configuration', 'GUI' ]
  },
  //  |---- WebGL Lights
  {
    type: 'service',
    name: 'AmbientLight',
    constructor: AmbientLight,
    dependencies: [ 'Configuration', 'GUI' ]
  },
  {
    type: 'service',
    name: 'DirectionalLight',
    constructor: DirectionalLight,
    dependencies: [ 'Configuration', 'GUI' ]
  }
];