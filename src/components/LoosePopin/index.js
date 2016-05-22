import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  EXP_TIMER_ENDED,
  EXP_LUX_END_GAME,
  EXP_FISH_GET_COUNT,
  EXP_FISH_COUNT_SENDED,
  EXP_TIMER_GET_TIME,
  EXP_TIMER_TIME_SENDED,
  EXP_GET_LUX_VALUE,
  EXP_LUX_VALUE_SENDED,
  ABOUT_OPEN
} from 'config/messages';

/**
 * LoosePopin component
 */
class LoosePopin extends Component {

  state = {
    title: 'You loose !',
    fishCount: 0,
    timerMinutes: '00',
    timerSeconds: '00',
    luxVal: 0
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

    [ 'timerEnded', 'luxEnded', 'getFishCount', 'getTimer', 'getLuxVal' ]
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
    Emitter.on( EXP_FISH_COUNT_SENDED, this.getFishCount );
    Emitter.on( EXP_TIMER_TIME_SENDED, this.getTimer );
    Emitter.on( EXP_LUX_VALUE_SENDED, this.getLuxVal );

  }

  removeEventListeners() {

    Emitter.off( EXP_TIMER_ENDED, this.timerEnded );
    Emitter.off( EXP_LUX_END_GAME, this.luxEnded );
    Emitter.off( EXP_FISH_COUNT_SENDED, this.getFishCount );
    Emitter.off( EXP_TIMER_TIME_SENDED, this.getTimer );
    Emitter.off( EXP_LUX_VALUE_SENDED, this.getLuxVal );

  }

  generateTimelineMax() {

    this.enterTl = new TimelineMax({ paused: true });

    const recapEls = this.refs.popin.querySelectorAll( '.loose-popin-recap_info-el' );

    this.enterTl
      .fromTo( this.refs.popin, 0.5, { opacity: 0 }, { opacity: 1, ease: Expo.easeOut })
      .fromTo( this.refs.about, 1, { opacity: 0, x: 20 }, { opacity: 1, x: 0, ease: Expo.easeOut })
      .fromTo( this.refs.title, 1, { opacity: 0, y: 15 }, { opacity: 1, y: 0, ease: Expo.easeOut }, 0 )
      .staggerFromTo( recapEls, 1, { opacity: 0, y: 15, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, ease: Expo.easeOut }, 0.1, 0.2 )
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

    Emitter.emit( EXP_FISH_GET_COUNT );
    Emitter.emit( EXP_TIMER_GET_TIME );
    Emitter.emit( EXP_GET_LUX_VALUE );
    this.refs.popin.classList.add( 'loose-popin--is-visible' );

    this.enterTl.play();
  }

  showAbout() {

    Emitter.emit( ABOUT_OPEN );
  }

  getFishCount( fishCount ) {

    this.setState({
      fishCount
    });
  }

  getTimer( timerMinutes, timerSeconds ) {

    this.setState({
      timerMinutes,
      timerSeconds
    });
  }

  getLuxVal( luxVal ) {

    this.refs.luxProgress.style.width = `${luxVal * 100}%`;

    if( luxVal < 0.5 ) {

      this.refs.container.classList.add( 'lux-bar--is-in-danger' );
    }
  }

  render() {

    return (

      <div className="loose-popin" ref="popin">

        <button className="loose-popin__about" onClick={ this.showAbout } ref="about">about</button>

        <div className="loose-popin__container" ref="container">

          <h3 className="loose-popin__title" ref="title"><strong>Game Over !</strong>{ this.state.title }</h3>


          <div className="loose-popin__recap">

            <img className="loose-popin__image" ref="image" src="/images/experience/loose-badgebb.svg" />

            <ul className="loose-popin-recap_info-list">

              <li className="loose-popin-recap_info-el">

                <h3 className="loose-popin-recap_info-title">Fish catched</h3>

                <span className="loose-popin-recap_info-description">{this.state.fishCount}</span>

              </li>

              <li className="loose-popin-recap_info-el">

                <h3 className="loose-popin-recap_info-title">Time</h3>

                <span className="loose-popin-recap_info-description">{this.state.timerMinutes}:{this.state.timerSeconds}</span>

              </li>

              <li className="loose-popin-recap_info-el">

                <h3 className="loose-popin-recap_info-title">Lux remainded</h3>

                <div className="lux-bar" ref="luxBar">

                  <div className="lux-bar__progress" ref="luxProgress"></div>

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
