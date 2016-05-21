export default {
  count: 30,
  maxAge: {
    value: 3,
    spread: 1
  },
  position: {
    value: new THREE.Vector3( 0, 0, 0 ),
    spread: new THREE.Vector3( 0, 0, 0 )
  },
  acceleration: {
    value: new THREE.Vector3( 0, -30, 0 ),
    spread: new THREE.Vector3( -15, -15, -15 ),
    randomise: true
  },
  velocity: {
    value: new THREE.Vector3( 0, -50, 0 ),
    spread: new THREE.Vector3( -10, -10, -10 )
  },
  opacity: {
    value: [ 0, 0.9, 0 ]
  },
  drag: {
    value: 0.5,
    spread: 0.2
  },
  wiggle: {
    value: 10,
    spread: 5
  },
  color: {
    value: [ new THREE.Color( '#435eb0' ), new THREE.Color( '#3648a7' ), new THREE.Color( '#606fc7' ) ],
    spread: [ new THREE.Color( '#435eb0' ), new THREE.Color( '#3648a7' ), new THREE.Color( '#606fc7' ) ]
  },
  size: {
    value: [ 0, 100, 0 ],
    spread: [ 0, 50, 0 ],
    randomise: true
  },
  particleCount: 300
};