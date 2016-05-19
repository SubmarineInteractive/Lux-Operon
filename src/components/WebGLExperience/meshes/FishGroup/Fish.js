import FresnelMaterial from '../../materials/FresnelMaterial';
import { randomInt, randomFloat, degreeToRadian, loopIndex, setRotationFromSpline } from 'utils';

/**
 * Fish class
 */
class Fish extends THREE.Object3D {

  constructor( id, parent, model, name, species, texture, curve ) {
    super();

    this.randomScale = randomFloat( 0.07, 0.09 );

    this.modelObject = model.children[ 0 ];
    this.modelObject.name = name;
    this.modelObject.removeFish = parent.removeFish;
    this.modelObject.parentClass = this;

    model.scale.set( this.randomScale , this.randomScale , this.randomScale  );

    model.traverse( child => {
      if( child instanceof THREE.Mesh ) {
        child.material = new FresnelMaterial({}, texture );
        child.material.uniforms.random.value = randomFloat( 0, 1 );
        child.material.uniforms.id.value = id;

        if( species === 'lanternFish' ) {
          child.material.uniforms.useLights.value = true;
        }
      }
    });

    this.curve = curve;
    this.pointLightTl = new TimelineMax({ paused: true, yoyo: true, repeat: -1 });
    this.hoverTl = new TimelineMax({ paused: true });

    this.progress = randomFloat( - 0.1, 0.1 );

    model.rotation.x = degreeToRadian( 90 );
    model.rotation.y = degreeToRadian( 90 );
    model.rotation.z = degreeToRadian( -90 );

    this.randomOffset = {
      x: randomFloat( - 1.1, 1.1 ),
      y: randomFloat( - 1.1, 1.1 ),
      z: randomFloat( - 1.1, 1.1 ),
      rotation: randomFloat( - degreeToRadian( 10 ), degreeToRadian( 10 ) )
    };

    this.add( model );

    if( species === 'lanternFish' ) {
      this.createLight();
    }
  }

  hover() {

    this.hoverTl
      .to( this.modelObject.material.uniforms.gradientHover, 1, { value: 1.0, ease: Expo.easeOut }, 'start' )
      .to( this.modelObject.material.uniforms.opacity, 1, { value: 1.0, ease: Expo.easeOut }, 'start' )
      .to( this.modelObject.material.uniforms.opacity, 1, { value: 0, ease: Expo.easeOut })
      .to( this.modelObject.material.uniforms.opacity, 1, { value: 0, ease: Expo.easeOut });

    this.hoverTl.restart();
  }

  unhover() {
  }

  createLight() {

    this.pointLight = new THREE.PointLight( new THREE.Color( '#435eb0' ), 0, 80, 2 );
    this.pointLight.position.set( 0, 445, -125 );
    this.modelObject.add( this.pointLight );

    this.pointLightTl
      .to( this.pointLight, randomFloat( 1.5, 2 ), { intensity: randomInt( 10, 18 ), ease: Power2.easeIntOut });

    this.pointLightTl.play();
  }

  update( time ) {

    this.modelObject.material.update( time );

    this.progress = loopIndex( this.progress + 0.001, 1 );

    const position = this.curve.getPoint( this.progress );

    this.position.x = position.x + Math.sin( time * this.randomOffset.x ) * 100;
    this.position.y = position.y + Math.sin( time * this.randomOffset.y ) * 100;
    this.position.z = position.z + Math.sin( time * this.randomOffset.z ) * 200;

    setRotationFromSpline( this, this.curve, this.progress, new THREE.Vector3( -1, 0, 0 ) );
  }
}

export default Fish;
