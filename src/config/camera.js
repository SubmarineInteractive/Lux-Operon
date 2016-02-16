export default {
  fov: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 1,
  far: 10000,
  lookSpeed: 0.1,
  movementSpeed: 300,
  position: new THREE.Vector3( 0, 800, 800 ),
  target: new THREE.Vector3( 0, 0, 0 ),
  orbitControls: false,
  firstPersonControls: true
};