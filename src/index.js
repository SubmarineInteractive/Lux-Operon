import Container from 'Container'
import 'stylesheets/main.scss'

// HMR
if (module.hot) {
  module.hot.accept()
}

let the = Container.get( 'Scene' ).begin()
