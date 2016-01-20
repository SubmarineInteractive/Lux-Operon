import Stats from 'stats.js'
import raf from 'raf'
import Container from 'Container'
import { Events } from 'helpers'

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

    // Debug helpers
    if( __DEV__ ) {
      this.debug()
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
   * Render function
   * @return {void}
   */
  render() {

    this.postProcessing.update()
  }
}

export default Scene