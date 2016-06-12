import { Component } from 'react';
import DOMElement from 'components/DOMElement';
import Scene from './core/Scene';
import { homeBackground as configuration } from 'config';

import './styles.scss';

/**
 * WebGLHomeBackground class
 */
class WebGLHomeBackground extends Component {

  /**
   * componentWillReceiveProps function
   * @param  {Object} nextProps Next props
   */
  componentWillReceiveProps( nextProps ) {

    if( this.props.progress != nextProps.progress ) {
      this.scene.progress = this.props.progress;
    }
  }

  /**
   * componentWillMount function
   */
  componentWillMount() {

    this.scene = new Scene( configuration );
    this.sceneDomEl = this.scene.renderer.domElement;
  }

  /**
   * componentWillUnmount function
   */
  componentWillUnmount() {

    this.scene.raf.stop();
    this.scene.remove();
  }

  render() {

    return (
      <div className="home-background">
        <DOMElement child={this.sceneDomEl} />
      </div>
    );
  }
}

export default WebGLHomeBackground;
