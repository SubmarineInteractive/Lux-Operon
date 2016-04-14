import AWDLoader from 'common/utils/AWDLoader';

/**
 * Loader class
 */
class Loader {

  /**
   * constructor function
   * @param {array} files Files to load
   * @param {function} onResourceLoaded Called everytime a resource is loaded
   */
  constructor( files, onResourceLoaded ) {

    this.promises = [];
    this.totalProgress = files.length;
    this.currentProgress = 0;

    const getLoader = type => {
      switch( type ) {
        case 'model': return new AWDLoader();
        case 'texture': return new THREE.TextureLoader();
      }
    };

    files.map( file => {

      const { type, id, url } = file;

      const promise = new Promise( ( resolve, reject ) => {

        getLoader( type ).load(
          url,
          resource => {
            resolve({ id, resource });
            this.currentProgress++;
            onResourceLoaded( this.currentProgress / this.totalProgress * 100 );
          },
          () => null,
          () => reject
        );
      });

      this.promises.push( promise );

    });
  }

  /**
   * load function
   * @return {promise} Promise
   */
  load() {

    return Promise.all( this.promises );
  }
}

export default Loader;