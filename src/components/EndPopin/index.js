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
  EXP_SHOW_REWARD,
  EXP_TOGGLE_PAUSE_GAME,
  ABOUT_OPEN
} from 'config/messages';

/**
 * EndPopin component
 */
class EndPopin extends Component {

  state = {
    type: 'loose',
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

    [ 'timerEnded', 'luxEnded', 'gameWon', 'getFishCount', 'getTimer', 'getLuxVal', 'replayVideo' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  debug() {

    window.debug.showEndPopin = () => {

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
    Emitter.on( EXP_SHOW_REWARD, this.gameWon );
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

    const recapEls = this.refs.popin.querySelectorAll( '.end-popin-recap_info-el' );
    const links = this.refs.popin.querySelectorAll( '.end-popin__link' );

    this.enterTl
      .fromTo( this.refs.popin, 0.5, { opacity: 0 }, { opacity: 1, ease: Expo.easeOut })
      .fromTo( this.refs.about, 1, { opacity: 0, x: 20 }, { opacity: 1, x: 0, ease: Expo.easeOut })
      .fromTo( this.refs.title, 1, { opacity: 0, y: 15 }, { opacity: 1, y: 0, ease: Expo.easeOut }, 0 )
      .staggerFromTo( recapEls, 1, { opacity: 0, y: 15, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, ease: Expo.easeOut }, 0.1, 0.2 )
      .fromTo( this.refs.image, 1.5, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, ease: Expo.easeOut }, 0.3 )
      .staggerFromTo( links, 1, { opacity: 0,  y: '100%' }, { opacity: 1, y: '0%', ease: Expo.easeOut }, 0.1, 0.6 );

  }

  gameWon() {

    this.setState({
      type: 'win',
      title: 'You have won enough lux to dive deeper !'
    });

    this.showPopin();
  }

  timerEnded() {

    this.setState({
      type: 'loose',
      title: ' Oh no ! You’ve lost track of time, you loose !'
    });

    this.showPopin();
  }

  luxEnded() {

    this.setState({
      type: 'loose',
      title: 'You don’t have enough light anymore ! You loose !'
    });

    this.showPopin();
  }

  showPopin() {

    Emitter.emit( EXP_TOGGLE_PAUSE_GAME, true );
    Emitter.emit( EXP_FISH_GET_COUNT );
    Emitter.emit( EXP_TIMER_GET_TIME );
    Emitter.emit( EXP_GET_LUX_VALUE );
    this.refs.popin.classList.add( 'end-popin--is-visible' );

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

  replayVideo( ev ) {

    ev.preventDefault();

    this.refs.popin.classList.remove( 'end-popin--is-visible' );
    Emitter.emit( 'EXP_SHOW_VIDEO' );
  }

  render() {

    const title = ( this.state.type === 'win' ) ? 'Congratulations !' : 'Game Over !';
    const badgeSrc = ( this.state.type === 'win' ) ? '/images/experience/reward-badge.svg' : '/images/experience/loose-badge.svg';

    let linksContent = '';

    if( this.state.type === 'win' ) {

      linksContent = (
        <div className="end-popin__links">
          <a className="end-popin__link" href='/'>Back up to the surface</a>
          <a className="end-popin__link" href='/'>Continue your exploration</a>
          <a className="end-popin__link" href="#" onClick={this.replayVideo}>See video again</a>
        </div>
      );
    } else {

      linksContent = (
        <div className="reward-popin__links">
          <a className="end-popin__link" href='/'>Back up to the surface</a>
          <a className="end-popin__link" href='/experience'>Try Again</a>
        </div>
      );
    }

    return (

      <div className="end-popin" ref="popin">

        <button className="end-popin__about" onClick={ this.showAbout } ref="about">about</button>

        <div className="end-popin__container" ref="container">

          <h3 className="end-popin__title" ref="title"><strong>{ title }</strong>{ this.state.title }</h3>


          <div className="end-popin__recap">

            <img className="end-popin__image" ref="image" src={ badgeSrc } />

            <ul className="end-popin-recap_info-list">

              <li className="end-popin-recap_info-el">

                <h3 className="end-popin-recap_info-title">Fish catched</h3>

                <span className="end-popin-recap_info-description">{ this.state.fishCount }</span>

              </li>

              <li className="end-popin-recap_info-el">

                <h3 className="end-popin-recap_info-title">Time</h3>

                <span className="end-popin-recap_info-description">{ this.state.timerMinutes }:{ this.state.timerSeconds }</span>

              </li>

              <li className="end-popin-recap_info-el">

                <h3 className="end-popin-recap_info-title">Lux remaining</h3>

                <div className="lux-bar" ref="luxBar">

                  <div className="lux-bar__progress" ref="luxProgress"></div>

                </div>

              </li>

            </ul>

          </div>

          { linksContent }

        </div>

      </div>

    );
  }
}

export default EndPopin;
