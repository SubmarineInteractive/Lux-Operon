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
    } });

  }

  begin() {
    this.refs.container.style.display = 'block';

    this.enterTl.play();
  }

  skip() {
  }

  render() {

    return (

      <div className="tooltips-tutorial" ref='container'>

      </div>
    );
  }
}

export default IntroductionTooltips;
