export default {
  geometry: {
    width: 5000,
    height: 2000,
    segments: {
      width: 20,
      height: 20
    }
  },
  material: {
    wireframe: false,
    side: THREE.DoubleSide,
    lights: true,
    uniforms: {
      time: { type: 'f', value: 0.0 },
      speed: { type: 'f', value: 0.2 },
      amplitude: { type: 'f', value: 150.0 },
      diffuse: { type: 'c', value: new THREE.Color( 0x2b687e ) },
      specular: { type: 'c', value: new THREE.Color( 0x000000 ) },
      shininess: { type: 'f', value: 1000 },
      opacity: { type: 'f', value: 1 }
    }
  }
};