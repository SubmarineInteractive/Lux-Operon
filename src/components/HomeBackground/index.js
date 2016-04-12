import './styles.scss';

import { Component } from 'react';
import DOMElement from 'components/DOMElement';

import Scene from './Scene';

/**
 * HomeBackground class
 */
class HomeBackground extends Component {

  componentWillReceiveProps( nextProps ) {
    if( this.props.progress != nextProps.progress ) {
      this.scene.progress = this.props.progress;
    }
  }

  componentWillMount() {

    this.scene = new Scene();
    this.sceneDomEl = this.scene.renderer.domElement;

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
