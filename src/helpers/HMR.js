import window from 'global/window'

/**
 * HMR class
 */
class HMR {

  /**
   * Cache function
   * Stores all materials created by a hot module
   * @param  {[type]} filename [description]
   * @return {[type]}          [description]
   */
  static cache(filename) {
    
    var cache
    if (window.__hmrShaderCache) {
      cache = window.__hmrShaderCache
    } else {
      cache = {}
      Object.defineProperty(window, '__hmrShaderCache', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: cache
      })
    }
    if (!cache[filename]) {
      cache[filename] = {}
    }
    return cache[filename]
  }

  /**
   * Enable function
   * Enables HMR on the given material
   * @param  {[type]} cache    [description]
   * @param  {[type]} material [description]
   * @return {[type]}          [description]
   */
  static enable(cache, material) {

    var uuid = material.uuid
    if (cache[uuid]) {
      throw new Error('This material already has HMR set.')
    }

    cache[uuid] = material

    var oldDispose = material.dispose
    material.dispose = function () {
      if (cache[uuid]) delete cache[uuid]
      return oldDispose.call(material)
    }

    var oldClone = material.clone
    material.clone = function () {
      var newObj = oldClone.call(material)
      enable(cache, newObj)
      return newObj
    }
  }

  /**
   * Update function
   * @param  {[type]} cache [description]
   * @param  {[type]} opt   [description]
   * @return {[type]}       [description]
   */
  static update (cache, opt) {

    console.log('[ThreeJS]', 'Patching shaders')
    Object.keys(cache).forEach(uuid => {
      var material = cache[uuid]
      if (!material) return
      material.setValues(opt)
      material.needsUpdate = true
    })
  }
}

export default HMR