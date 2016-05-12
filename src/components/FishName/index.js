import './styles.scss';

import Emitter from 'helpers/Emitter';

import { Component } from 'react';

import SplitText from 'vendors/splitText.js';

import {
  EXP_SHOW_FISH_NAME
} from 'config/messages';

/**
 * FishName component
 */
class FishName extends Component {

  state = {
    fishName: 'TEST'
  }

  componentWillMount() {

    this.bind();
    this.timeout = null;
  }

  componentDidMount() {

    this.generateTimelineMax();
    this.addEventListeners();

    this.debug();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  debug() {

    window.debug.showFishName = ( fishName = 'JOE LE POISSON' ) => {

      this.showFishName( fishName );
    };

  }

  bind() {

    this.showFishName = this.showFishName.bind( this );
  }

  addEventListeners() {

    Emitter.on( EXP_SHOW_FISH_NAME, this.showFishName );
  }

  removeEventListeners() {

    Emitter.off( EXP_SHOW_FISH_NAME, this.showFishName );
  }

  generateTimelineMax() {

    this.inTl = new TimelineMax({ paused: true });
    this.outTl = new TimelineMax({ paused: true });

    this.outTl
      .to( this.refs.container, 1,  { opacity: 0, ease: Expo.easeOut });
  }

  showFishName( fishName ) {

    this.setState({
      fishName
    });

    this.outTl.stop();
    this.inTl.stop();

    clearTimeout( this.timeout );

    this.timeout = setTimeout( ()=> {

      this.inTl = new TimelineMax({ onComplete: ()=> {

        this.outTl.play();
      } });

      const splittedName = new SplitText( this.refs.container, {
        type: 'chars'
      });

      this.inTl
        .to( this.refs.container, 0.3, { opacity: 1, ease: Expo.easeout })
        .staggerFromTo( splittedName.chars, 0.6,
          { opacity: 0 },
          { opacity: 1, ease: Expo.easeOut }, 0.02, 0 );

      this.inTl.play();

    }, 500 );

  }

  render() {

    return (

      <span className="fish-name" ref="container">
        {this.state.fishName}
      </span>

    );
  }
}

export default FishName;
