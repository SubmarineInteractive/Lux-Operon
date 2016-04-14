import { Component } from 'react';
import Scene from './core/scene';
import DOMElement from 'components/DOMElement';
import { experience as configuration } from 'config';

/**
 * WebGLExperience class
 */
class WebGLExperience extends Component {

  /**
   * componentWillMount function
   */
  componentWillMount() {

    this.scene = new Scene( configuration, this.props.resources );
    this.sceneDomEl = this.scene.renderer.domElement;
  }

  render() {

    return (
      <div className="container">
        <DOMElement child={this.sceneDomEl} />
      </div>
    );
  }
}

export default WebGLExperience;