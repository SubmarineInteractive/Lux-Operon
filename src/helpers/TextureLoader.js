import { Events } from 'helpers'

/**
 * TextureLoader class
 */
class TextureLoader extends THREE.TextureLoader {

  /**
   * Constructor function
   * @param  {object} textures
   * @return {void}
   */
  constructor( configuration ) {
    super()

    this.textures = configuration.get( 'textures' )
    this.promises = []
    this.loadedTextures = []
    this.numberTextures = Object.keys( this.textures ).length
    this.counter = 0

    for( let t in this.textures ) {
      const url = this.textures[ t ]

      const promise = new Promise(( resolve, reject ) => {
        this.load(
          url,
          texture => {
            texture.name = t
            this.counter++
            Events.emit( 'textureLoader:loading', this.counter, this.numberTextures )

            resolve( texture )
          },
          xhr => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),
          xhr => reject
        )
      })

      this.promises.push( promise )
    }
  }

  /**
   * Init function
   * @return {object} Promise
   */
  init() {
    return Promise.all( this.promises ).then( textures => this.loadedTextures = textures )
  }

  /**
   * Get function
   * @param  {string} texture Texture name
   * @return {object}         Texture
   */
  get( texture ) {
    return this.loadedTextures.find( i => i.name == texture )
  }
}

export default TextureLoader