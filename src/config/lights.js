export default {
  "ambientLight" : {
    color: 0x282828
  },
  "directionalLight" : {
    color: 0xffffff,
    intensity: 0.2,
    position: new THREE.Vector3(0, 500, 0),
    shadow: {
      darkness: 0.6,
      width: 4096,
      height: 4096
    }
  }
};