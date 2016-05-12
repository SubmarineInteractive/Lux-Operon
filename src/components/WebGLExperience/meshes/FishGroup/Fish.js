import FresnelMaterial from '../../materials/FresnelMaterial';
import { randomFloat, degreeToRadian, loopIndex, setRotationFromSpline } from 'utils';

/**
 * Fish class
 */
class Fish extends THREE.Object3D {

  constructor( model, texture, curve ) {
    super();

    this.randomScale = randomFloat( 0.05, 0.15 );

    model.scale.set( this.randomScale , this.randomScale , this.randomScale  );

    model.traverse( child => {
      if( child instanceof THREE.Mesh ) {
        child.material = new FresnelMaterial({}, texture );
        child.material.uniforms.random.value = randomFloat( 0, 1 );
      }
    });

    this.curve = curve;

    this.progress = randomFloat( - 0.1, 0.1 );

    model.rotation.x = degreeToRadian( 90 );
    model.rotation.y = degreeToRadian( 90 );
    model.rotation.z = degreeToRadian( -90 );

    // this.initialPosition = {};
    // this.initialPosition.x = this.position.x = randomInt( -10, 10 );
    // this.initialPosition.y = this.position.y = randomInt( -10, 10 );
    // this.initialPosition.z = this.position.z = randomInt( -10, 10 );

    this.randomOffset = {
      x: randomFloat( - 1.1, 1.1 ),
      y: randomFloat( - 1.1, 1.1 ),
      z: randomFloat( - 1.1, 1.1 ),
      rotation: randomFloat( - degreeToRadian( 10 ), degreeToRadian( 10 ) )
    };

    this.add( model );
  }

  update( time ) {
    this.children[ 0 ].children[ 0 ].material.update( time );

    this.progress = loopIndex( this.progress + 0.001, 1 );

    const position = this.curve.getPoint( this.progress );

    this.position.x = position.x + Math.sin( time * this.randomOffset.x ) * 100;
    this.position.y = position.y + Math.sin( time * this.randomOffset.y ) * 100;
    this.position.z = position.z + Math.sin( time * this.randomOffset.z ) * 200;

    setRotationFromSpline( this, this.curve, this.progress, new THREE.Vector3( -1, 0, 0 ) );
  }
}

export default Fish;