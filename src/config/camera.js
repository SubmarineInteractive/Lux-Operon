export default {
  fov: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 1,
  far: 10000,
  position: new THREE.Vector3( 0, 2500, 2500 ),
  target: new THREE.Vector3( 0, 0, 0 ),
  orbitControls: true,
  firstPersonControls: false
};