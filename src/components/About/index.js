import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  ABOUT_OPEN,
  ABOUT_CLOSE,
  EXP_TOGGLE_CAMERA,
  EXP_TIMER_TOGGLE_PAUSE
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

    this.generateTimelineMax();

    this.begin();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {

    [ 'openAboutPopin', 'closeAboutPopin', 'onKeyUp' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  addEventListeners() {

    document.addEventListener( 'keyup', this.onKeyUp, false );

    Emitter.on( ABOUT_OPEN, this.openAboutPopin );
    Emitter.on( ABOUT_CLOSE, this.closeAboutPopin );
  }

  removeEventListerners() {

    document.removeEventListener( 'keyup', this.onKeyUp, false );

    Emitter.off( ABOUT_OPEN, this.openAboutPopin );
    Emitter.off( ABOUT_CLOSE, this.closeAboutPopin );
  }

  generateTimelineMax() {
    this.enterTl = new TimelineMax({ paused: true });

    this.leaveTl = new TimelineMax({ paused: true, onComplete: ()=> {

      this.refs.wrapper.classList.remove( 'about--is-visible' );
    } });

    this.enterTl
      // .fromTo( this.refs.container, 1, { scale: 1.1, y: '-50%' }, { scale: 1, y: '-50%', ease: Expo.easeOut }, 0 )
      .fromTo( this.refs.wrapper, 1, { opacity: 0 }, { opacity: 1, ease: Expo.easeOut }, 0 )
      .fromTo( this.refs.descSection, 1, { scale: 1.1, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, ease: Expo.easeOut }, 0 )
      .fromTo( this.refs.teamSection, 1, { scale: 1.1, opacity: 0, y: 30}, { scale: 1, opacity: 1, y: 0, ease: Expo.easeOut }, 0.2 );

    this.leaveTl
      .fromTo( this.refs.container, 1, { scale: 1, y: '-50%' }, { scale: 1.1, y: '-50%', ease: Expo.easeOut }, 0 )
      .fromTo( this.refs.wrapper, 1, { opacity: 1 }, { opacity: 0, ease: Expo.easeOut }, 0 );
  }

  begin() {

  }

  onKeyUp( ev ) {

    if( ev.keyCode === 27 ) {
      this.closeAboutPopin();
    }
  }

  openAboutPopin() {

    Emitter.emit( EXP_TOGGLE_CAMERA, false );
    Emitter.emit( EXP_TIMER_TOGGLE_PAUSE, true );

    this.refs.wrapper.classList.add( 'about--is-visible' );

    this.leaveTl.stop();
    this.enterTl.play( 0 );
  }

  closeAboutPopin() {

    Emitter.emit( EXP_TOGGLE_CAMERA, true );
    Emitter.emit( EXP_TIMER_TOGGLE_PAUSE, false );

    this.enterTl.stop();
    this.leaveTl.play( 0 );
  }

  render() {

    return (

      <div className="about" ref="wrapper">

        <svg
          className="about__cross"
          x="0px" y="0px"
          viewBox="0 0 224.512 224.512"
          onClick={this.closeAboutPopin} >

          <polygon points="224.507,6.997 217.521,0 112.256,105.258 6.998,0 0.005,6.997 105.263,112.254
          0.005,217.512 6.998,224.512 112.256,119.24 217.521,224.512 224.507,217.512 119.249,112.254 	"/>

        </svg>

        <div className="about__container" ref="container">

          <section className="about__section about__section--description" ref="descSection">

              <h2 className="about__title" ref="descTitle">
                <span className="about__title-line" ref="descTitleLine"></span>
                <span className="about__title-text" ref="descTitleText">About</span>
              </h2>

              <p className="about__paragraph" ref="descParag">
                Lorem ipsum dolor sit amet, consectetur adipisci  ng elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>

          </section>

          <section className="about__section about__section--team" ref="teamSection">

            <h2 className="about__title" ref="teamTitle">
              <span className="about__title-line" ref="teamTitleLine"></span>
              <span className="about__title-text" ref="teamTitleText">Team</span>
            </h2>

            <div className="about__team-block">

              <strong className="about_team-name" ref="teamName">Developer</strong>

              <ul className="about__team-list" ref="teamList">

                  <li className="about__team-list-el">
                    <span className="about__team-line"></span>
                    <a href="http://fabienmotte.com" target="_blank">Fabien Motte</a>
                  </li>

                  <li className="about__team-list-el">
                    <span className="about__team-line"></span>
                    <a href="http://hengpatrick.fr" target="_blank">Patrick Heng</a>
                  </li>

              </ul>

            </div>

            <div className="about__team-block">

              <strong className="about_team-name" ref="teamName">Designers</strong>

              <ul className="about__team-list" ref="teamList">

                  <li className="about__team-list-el">
                    <span className="about__team-line"></span>
                    <a href="http://jant.fr/" target="_blank">Jantana Hennard</a>
                  </li>

                  <li className="about__team-list-el">
                    <span className="about__team-line"></span>
                    <a href="http://alexandredelalleau.fr/" target="_blank">Alexandre Delalleau</a>
                  </li>

              </ul>

            </div>

          </section>

        </div>

      </div>

    );
  }
}

export default About;
