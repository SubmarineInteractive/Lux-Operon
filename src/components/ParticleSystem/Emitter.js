import SPE from 'shader-particle-engine'
import dat from 'dat-gui'
import emitterConfig from '../../config/ParticleSystem/emitter'

/**
 * Emitter class
 */
class Emitter extends SPE.Emitter {

  /**
   * Constructor function
   * @param  {object} customConfig Custom configuration
   * @return {void}
   */
  constructor( customConfig = {} ) {
    super( { ...emitterConfig, ...customConfig } )

    this.active = true
    this.initGUI()
  }

  initGUI() {
    this.gui = new dat.GUI()

    const emitter = this.gui.addFolder( 'Emitter' )
    emitter.open()

    // Alive
    emitter
      .add( this, 'alive' )
      .name( 'Alive' )

    // Distribution
    emitter
      .add( this, 'type', { Box: SPE.distributions.BOX, Sphere: SPE.distributions.SPHERE, Disc: SPE.distributions.DISC } )
      .name( 'Type' )

    // Particle count
    const particleCountCtrl = emitter
      .add( this, 'particleCount' )
      .min( 10 ).max( 5000 ).step( 10 )
      .name( 'Particle count' )
      .onFinishChange((v) => {
        this.disable()
        this.enable()
      })

    // Multiplier
    emitter
      .add( this, 'activeMultiplier' )
      .min( 0 ).max( 1 ).step( 0.1 )
      .name( 'Multiplier' )

    // Color
    emitter
      .addColor( { color: '#000000' }, 'color' )
      .onChange( ( v ) => this.color.value = new THREE.Color( v ) )

    // Size
    let size = this.size.value.join(',')
    emitter
      .add( { value: size }, 'value' )
      .name( 'Size' )
      .onChange( ( v ) => this.size.value = v.split(',') )

    // Acceleration
    const acceleration = emitter.addFolder( 'Acceleration' )

    // X axis
    acceleration
      .add( this.acceleration.value, 'x' )
      .min( 0 ).max( 1000 ).step( 1 )
      .onChange( (v) => this.acceleration.value = new THREE.Vector3( v, this.acceleration.value.y, this.acceleration.value.z ) )

    // Y axis
    acceleration
      .add( this.acceleration.value, 'y' )
      .min( 0 ).max( 1000 ).step( 1 )
      .onChange( (v) => this.acceleration.value = new THREE.Vector3( this.acceleration.value.x, v, this.acceleration.value.z ) )

    // Z axis
    acceleration
      .add( this.acceleration.value, 'z' )
      .min( 0 ).max( 1000 ).step( 1 )
      .onChange( (v) => this.acceleration.value = new THREE.Vector3( this.acceleration.value.x, this.acceleration.value.y, v ) )

      // Velocity
      const velocity = emitter.addFolder( 'Velocity' )

      // X axis
      velocity
        .add( this.velocity.value, 'x' )
        .min( 0 ).max( 1000 ).step( 1 )
        .onChange( (v) => this.velocity.value = new THREE.Vector3( v, this.velocity.value.y, this.velocity.value.z ) )

      // Y axis
      velocity
        .add( this.velocity.value, 'y' )
        .min( 0 ).max( 1000 ).step( 1 )
        .onChange( (v) => this.velocity.value = new THREE.Vector3( this.velocity.value.x, v, this.velocity.value.z ) )

      // Z axis
      velocity
        .add( this.velocity.value, 'z' )
        .min( 0 ).max( 1000 ).step( 1 )
        .onChange( (v) => this.velocity.value = new THREE.Vector3( this.velocity.value.x, this.velocity.value.y, v ) )
  }
}

export default Emitter