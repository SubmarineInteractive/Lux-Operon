import window from 'global/window';

// <filename, materialList> cache
// Stores all materials created by a hot module.
export function cache( filename ) {
  let cache;
  if ( window.__hmrShaderCache ) {
    cache = window.__hmrShaderCache;
  } else {
    cache = {};
    Object.defineProperty( window, '__hmrShaderCache', {
      configurable: true,
      enumerable: false,
      writable: false,
      value: cache
    });
  }
  if ( !cache[ filename ] ) {
    cache[ filename ] = {};
  }
  return cache[ filename ];
}

// Enables HMR on the given material
export function enable( cache, material ) {
  const uuid = material.uuid;
  if ( cache[ uuid ] ) {
    throw new Error( 'This material already has HMR set.' );
  }

  cache[ uuid ] = material;

  const oldDispose = material.dispose;
  material.dispose = function () {
    if ( cache[ uuid ] ) delete cache[ uuid ];
    return oldDispose.call( material );
  };

  const oldClone = material.clone;
  material.clone = function () {
    const newObj = oldClone.call( material );
    enable( cache, newObj );
    return newObj;
  };
}

export function update( cache, opt ) {
  /*eslint-disable no-console */
  console.log( '[ThreeJS]', 'Patching shaders' );
  /*eslint-enable no-console */
  Object.keys( cache ).forEach( uuid => {
    const material = cache[ uuid ];
    if ( !material ) return;
    material.setValues( opt );
    material.needsUpdate = true;
  });
}