export default {
  fov: 120,
  aspect: window.innerWidth / window.innerHeight,
  near: 1,
  far: 5000,
  position: new THREE.Vector3( 0, 200, 900 ),
  target: new THREE.Vector3( 0, 0, 0 ),
  orbitControls: false,
  sinkOffset: -800
};