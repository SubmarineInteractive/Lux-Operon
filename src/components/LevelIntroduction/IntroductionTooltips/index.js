import './styles.scss';

import { Component } from 'react';

import {

} from 'config/messages';

/**
 * IntroductionTooltips component
 */
class IntroductionTooltips extends Component {

  state = {
  }

  componentWillMount() {

    this.bind();
  }

  componentDidMount() {

    this.generateTimelineMax();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {

    [ 'skip', 'onKeyUp' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) );
  }

  addEventListeners() {

    document.addEventListener( 'keyup', this.onKeyUp, false );
  }

  removeEventListeners() {

    document.removeEventListener( 'keyup', this.onKeyUp, false );
  }

  generateTimelineMax() {

    this.enterTl = new TimelineMax({ paused: true, onComplete: ()=> {

      setTimeout( ()=>{

        this.props.ended();
      }, 1000 );

    } });

    this.enterTl
      .from( this.refs.skip, 2, { opacity: 0, x: 100, ease: Expo.easeOut }, 0 );


  }

  onKeyUp( ev ) {

    if( ev.keyCode === 27 ) {
      this.skip();
    }
  }

  begin() {
    this.refs.container.style.display = 'block';

    this.addEventListeners();

    this.enterTl.play();
  }

  skip() {

    this.enterTl.stop();

    this.removeEventListeners();

    this.props.ended();
  }

  render() {

    return (

      <div className="tooltips-tutorial" ref='container'>

        <button className="tooltips-tutorial__skip" ref="skip" onClick={this.skip}>Skip tooltips</button>

        Tooltips are fun
      </div>
    );
  }
}

export default IntroductionTooltips;
