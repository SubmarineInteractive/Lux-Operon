import Container from 'Container'

// HMR
if (module.hot) {
  module.hot.accept()
}

let the = Container.get( 'Scene' ).begin()