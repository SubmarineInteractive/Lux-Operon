import SPE from 'shader-particle-engine';

export default {
  type: SPE.distributions.SPHERE,
  // isStatic: true,
  duration: 2,
  maxAge: {
    value: 1.8,
    spread: 0.8
  },
  position: {
    value: new THREE.Vector3( 0, 0, 0 )
  },
  acceleration: {
    value: new THREE.Vector3( 70, 70, 70 ),
    spread: new THREE.Vector3( 35, 35, 35 )
  },
  velocity: {
    value: new THREE.Vector3( 50, 0, 50 ),
    spread: new THREE.Vector3( 25, 0, 25 ),
    randomise: true
  },
  opacity: {
    value: [ 0, 1, 0 ],
    randomise: true
  },
  drag: {
    value: 0.5,
    spread: 1,
    randomise: true
  },
  wiggle: {
    value: 10,
    spread: 10
  },
  color: {
    value: [ new THREE.Color( '#435eb0' ), new THREE.Color( '#3b357e' ) ],
    spread: [ new THREE.Color( '#435eb0' ), new THREE.Color( '#3b357e' ) ],
    randomise: true
  },
  size: {
    value: [ 0, 35, 0 ],
    spread: [ 0, 10, 0 ],
    randomise: true
  },
  particleCount: 500
};