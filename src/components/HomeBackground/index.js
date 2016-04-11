import './styles.scss';

import { Component } from 'react';
import DOMElement from 'components/DOMElement';

import Scene from './Scene';

/**
 * Home class
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
      </div>
    );
  }
}

export default HomeBackground;
