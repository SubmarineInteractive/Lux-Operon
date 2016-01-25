import SPE from 'shader-particle-engine';

export default {
  type: SPE.distributions.BOX,
  maxAge: {
    value: 1
  },
  position: {
    value: new THREE.Vector3(0, 0, 0),
    spread: new THREE.Vector3(0, 0, 0)
  },
  acceleration: {
    value: new THREE.Vector3(0, 0, 0),
    spread: new THREE.Vector3(0, 0, 0)
  },
  velocity: {
    value: new THREE.Vector3(0, 0, 0),
    spread: new THREE.Vector3(0, 0, 0)
  },
  color: {
    value: [
      new THREE.Color('#022D52'),
      new THREE.Color('#148DD9'),
      new THREE.Color('#6DBFF2'),
      new THREE.Color('#B3DAF2'),
      new THREE.Color('#F2F2F2')
    ]
  },
  size: {
    value: [0, 8, 0]
  },
  opacity: [0, 1, 0],
  particleCount: 1000
};