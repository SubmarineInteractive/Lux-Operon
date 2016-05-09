import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import {
  EXP_SHOW_REWARD,
  ABOUT_OPEN
} from 'config/messages';

/**
 * RewardPopin component
 */
class RewardPopin extends Component {

  componentWillMount() {

    this.bind();
  }

  componentDidMount() {

    this.addEventListeners();

    this.generateTimelineMax();
  }

  componentWillUnmount() {

  }

  bind() {

    [ 'showPopin' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );

  }

  addEventListeners() {

    Emitter.on( EXP_SHOW_REWARD, this.showPopin );
  }

  removeEventListeners() {

    Emitter.off( EXP_SHOW_REWARD, this.showPopin );
  }

  generateTimelineMax() {

    this.enterTl = new TimelineMax({ paused: true });

    this.enterTl
      .fromTo( this.refs.popin, 0.5, { opacity: 0 }, { opacity: 1, ease: Expo.easeOut })
      .fromTo( this.refs.about, 1, { opacity: 0, x: 20 }, { opacity: 1, x: 0, ease: Expo.easeOut })
      .fromTo( this.refs.title, 1, { opacity: 0, y: 15 }, { opacity: 1, y: 0, ease: Expo.easeOut }, 0 )
      .fromTo( this.refs.image, 1.5, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, ease: Expo.easeOut }, 0.3 )
      .fromTo( this.refs.linkSurface, 1, { opacity: 0, y: '100%' }, { opacity: 1, y: '0%', ease: Expo.easeOut }, 0.6 )
      .fromTo( this.refs.linkExploration, 1, { opacity: 0, y: '100%' }, { opacity: 1, y: '0%', ease: Expo.easeOut }, 0.6 );

  }

  showPopin() {

    this.refs.popin.classList.add( 'reward-popin--is-visible' );
    this.enterTl.play();
  }

  showAbout() {

    Emitter.emit( ABOUT_OPEN );
  }

  render() {

    return (

      <div className="reward-popin" ref="popin">

        <button className="reward-popin__about" onClick={ this.showAbout } ref="about">about</button>

        <div className="reward-popin__container" ref="container">

          <h3 className="reward-popin__title" ref="title">Congratulations<br/>You have found all the hidden fish</h3>

          <img className="reward-popin__image" ref="image" src="/images/experience/reward-hide-and-seek.svg" />

          <a className="reward-popin__link reward-popin__link--surface" ref="linkSurface" href='/'>Back to the surface</a>

          <a className="reward-popin__link reward-popin__link--exploration" ref="linkExploration" href='/'>Continue your exploration</a>

        </div>
      </div>

    );
  }
}

export default RewardPopin;
