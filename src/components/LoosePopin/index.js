import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  EXP_TIMER_ENDED,
  EXP_LUX_END_GAME,
  EXP_FISH_GET_COUNT,
  ABOUT_OPEN
} from 'config/messages';

/**
 * LoosePopin component
 */
class LoosePopin extends Component {

  state = {
    title: 'You loose !'
  }

  componentWillMount() {

    this.bind();
  }

  componentDidMount() {

    this.addEventListeners();

    this.generateTimelineMax();

    this.debug();
  }

  componentWillUnmount() {

  }

  bind() {

    [ 'timerEnded', 'luxEnded' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  debug() {

    window.debug.showLoosePopin = () => {

      this.showPopin();
    };

    window.debug.luxEnded = () => {

      this.luxEnded();
    };

    window.debug.timerEnded = () => {

      this.timerEnded();
    };

  }

  addEventListeners() {

    Emitter.on( EXP_TIMER_ENDED, this.timerEnded );
    Emitter.on( EXP_LUX_END_GAME, this.luxEnded );
  }

  removeEventListeners() {

    Emitter.off( EXP_TIMER_ENDED, this.timerEnded );
    Emitter.off( EXP_LUX_END_GAME, this.luxEnded );
  }

  generateTimelineMax() {

    this.enterTl = new TimelineMax({ paused: true });

    this.enterTl
      .fromTo( this.refs.popin, 0.5, { opacity: 0 }, { opacity: 1, ease: Expo.easeOut })
      .fromTo( this.refs.about, 1, { opacity: 0, x: 20 }, { opacity: 1, x: 0, ease: Expo.easeOut })
      .fromTo( this.refs.title, 1, { opacity: 0, y: 15 }, { opacity: 1, y: 0, ease: Expo.easeOut }, 0 )
      .fromTo( this.refs.image, 1.5, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, ease: Expo.easeOut }, 0.3 )
      .fromTo( this.refs.linkSurface, 1, { opacity: 0, y: '100%' }, { opacity: 1, y: '0%', ease: Expo.easeOut }, 0.6 )
      .fromTo( this.refs.linkTry, 1, { opacity: 0, y: '100%' }, { opacity: 1, y: '0%', ease: Expo.easeOut }, 0.7 );

  }

  timerEnded() {

    this.setState({
      title: ' Oh no ! You’ve lost track of time, you loose !'
    });

    this.showPopin();
  }

  luxEnded() {

    this.setState({
      title: 'You don’t have enough light anymore ! You loose !'
    });

    this.showPopin();
  }

  showPopin() {
    this.refs.popin.classList.add( 'loose-popin--is-visible' );

    this.enterTl.play();
  }

  showAbout() {

    Emitter.emit( ABOUT_OPEN );
  }

  render() {

    return (

      <div className="loose-popin" ref="popin">

        <button className="loose-popin__about" onClick={ this.showAbout } ref="about">about</button>

        <div className="loose-popin__container" ref="container">

          <h3 className="loose-popin__title" ref="title"><strong>Game Over !</strong>{ this.state.title }</h3>


          <div className="loose-popin__recap">

            <img className="loose-popin__image" ref="image" src="/images/experience/reward-hide-and-seek.svg" />

            <ul className="loose-popin-recap_info-list">
              <li className="loose-popin-recap_info-el">
                <h3 className="loose-popin-recap_info-title">Fish catched</h3>
                <span className="loose-popin-recap_info-description">1</span>
              </li>
              <li className="loose-popin-recap_info-el">
                <h3 className="loose-popin-recap_info-title">Time</h3>
                <span className="loose-popin-recap_info-description">2:00</span>
              </li>
              <li className="loose-popin-recap_info-el">
                <h3 className="loose-popin-recap_info-title">Lux remainded</h3>
                <div className="lux-bar">

                  <div className="lux-bar__progress" ref="progress"></div>

                </div>
              </li>
            </ul>

          </div>

          <a className="loose-popin__link loose-popin__link--surface" ref="linkSurface" href='/'>Back to the surface</a>

          <a className="loose-popin__link loose-popin__link--surface" ref="linkTry" href='/experience'>Try Again</a>

        </div>
      </div>

    );
  }
}

export default LoosePopin;
