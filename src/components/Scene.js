import Stats from 'stats.js'
import raf from 'raf'
import Container from 'Container'
import { Events } from 'helpers'

const DEFAULT_WIDTH = window.innerWidth
const DEFAULT_HEIGHT = window.innerHeight
const RATIO =  DEFAULT_HEIGHT / DEFAULT_WIDTH

const ZERO = new THREE.Vector3()

/**
 * Scene class
 */
class Scene extends THREE.Scene {

  /**
   * Constructor function
   * @return {void}
   */
  constructor() {
    super()

    this.camera
    this.renderer
    this.innerWidth  = window.innerWidth
    this.innerHeight = window.innerHeight
    this.container   = document.getElementById( 'container' )
  }

  /**
   * Begin function
   * @return {void}
   */
  begin() {

     // Renderer
    this.renderer = Container.get( 'Renderer' )
    this.container.appendChild( this.renderer.domElement )

    // Camera
    this.camera = Container.get( 'Camera' )
    this.add( this.camera )

    // Post processing
    this.postProcessing = Container.get( 'PostProcessing' )

    // Texture loader
    this.textureLoader = Container.get( 'TextureLoader' )

    // Utils
    this.clock = Container.get( 'Clock' )

    // Stats
    this.stats = new Stats()
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.top = '0'
    this.container.appendChild( this.stats.domElement )

    // Create scene when textures are loaded
    this.textureLoader
      .init()
      .then( ::this.createScene )

    Events.on( 'resize', ::this.resize )
    this.renderer.resize( DEFAULT_WIDTH, DEFAULT_HEIGHT )
    this.camera.resize( DEFAULT_WIDTH, DEFAULT_HEIGHT )

    // Debug helpers
    if( __DEV__ ) {
      // this.debug()
    }
  }

  /**
   * Debug function
   * @return {void}
   */
  debug() {

    // Axis helper
    const axis = new THREE.AxisHelper( 5 )
    this.add( axis )

    // Grid helper
    const gridHelper = new THREE.GridHelper( 50, 1 )
    this.add( gridHelper )

    // Texture loader
    Events.on( 'textureLoader:loading', ( current, total ) =>
      console.log( `[TextureLoader] Loading ${current}/${total} textures` ))
  }

  /**
   * CreateScene function
   * @return {void}
   */
  createScene() {

    this.animate()
  }

  /**
   * Animate function
   * @return {void}
   */
  animate() {

    raf( ::this.animate )

    this.stats.update()
    this.render()
  }


  /**
   * Resize function
   * @param  {integer} windowWidth  Window width
   * @param  {integer} windowHeight Window height
   * @return {void}
   */
  resize( windowWidth, windowHeight ) {

    const width = windowWidth
    const height = width * RATIO
    this.renderer.resize( width, height )
    this.camera.resize( width, height )
  }

  /**
   * Render function
   * @return {void}
   */
  render() {

    this.postProcessing.update()
  }
}

export default Scene