import FresnelMaterial from '../../materials/FresnelMaterial';
import randomFloat from 'utils/random-float';

/**
 * Fish class
 */
class Fish extends THREE.Object3D {


  constructor( model, texture ) {
    super();

    model.scale.set( 0.3, 0.3, 0.3 );

    model.traverse( child => {
      if( child instanceof THREE.Mesh ) {
        child.material = new FresnelMaterial({}, texture );
        child.material.uniforms.random.value = randomFloat( 0, 1 );
      }
    });

    this.add( model );
  }
}

export default Fish;
