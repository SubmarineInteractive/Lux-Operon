import Container from 'Container'
import './css/app.css'

// HMR
if (module.hot) {
  module.hot.accept()
}

let the = Container.get( 'Scene' ).begin()