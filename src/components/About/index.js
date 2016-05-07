import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  ABOUT_OPEN,
  ABOUT_CLOSE
} from 'config/messages';

/**
 * About component
 */
class About extends Component {

  state = {
  }

  componentWillMount() {

    this.bind();
  }

  componentDidMount() {

    this.addEventListeners();

    this.begin();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {

    [ 'openAboutPopin', 'closeAboutPopin' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  addEventListeners() {

    Emitter.on( ABOUT_OPEN, this.openAboutPopin );
    Emitter.on( ABOUT_CLOSE, this.closeAboutPopin );
  }

  removeEventListerners() {

    Emitter.off( ABOUT_OPEN, this.openAboutPopin );
    Emitter.off( ABOUT_CLOSE, this.closeAboutPopin );
  }

  begin() {

  }

  openAboutPopin() {

  }

  closeAboutPopin() {

  }

  render() {

    return (

      <div className="about">

        <div className="about__cross"> Close </div>

        About us, about you and me luv

      </div>

    );
  }
}

export default About;
