import './styles.scss';

import { Component } from 'react';
import DOMElement from 'components/DOMElement';

import Scene from './Scene';
import HomeSlider from 'components/HomeSlider';

/**
 * HomeBackground class
 */
class HomeBackground extends Component {

  componentWillMount() {

    this.scene = new Scene();
    this.sceneDomEl = this.scene.renderer.domElement;

  }

  componentDidMount() {

  }

  render() {

    return (
      <div className="home-background">

        <DOMElement child={this.sceneDomEl} />

        <HomeSlider />

      </div>
    );
  }
}

export default HomeBackground;
