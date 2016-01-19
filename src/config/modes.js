export default [
  {
    name: 'Eco',
    default: true,
    config: {
      ribbon: {
        map: 'eco',
        dashSize: 3,
        gapSize: 5,
        lineWidth: 0.5,
        opacity: 1
      },
      guide: {
        opacity: 0,
        lineWidth: 0,
        color: new THREE.Color( 0xffffff )
      }
    }
  },
  {
    name: 'Sport',
    config: {
      ribbon: {
        map: 'sport',
        dashSize: .2,
        gapSize: 4,
        lineWidth: 1,
        opacity: 1
      },
      guide: {
        opacity: 0.4,
        lineWidth: 0,
        color: new THREE.Color( 0xffffff )
      }
    }
  },
]