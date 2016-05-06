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

    this.addEventListeners();

    this.generateTimelineMax();
  }

  componentWillUnmount() {

    this.removeEventListeners();
  }

  bind() {
    this.skip = this.skip.bind( this );
  }

  addEventListeners() {
  }

  removeEventListerners() {
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

  begin() {
    this.refs.container.style.display = 'block';

    this.enterTl.play();
  }

  skip() {

    this.enterTl.stop();
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
