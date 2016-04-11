import { Component } from 'react';
import Container from 'Container';
import DOMElement from 'components/DOMElement';

/**
 * Experience class
 */
class Experience extends Component {

  constructor( props ) {
    super( props );

    Container.get( 'Scene' ).begin();
  }

  render() {
    this.canvas = Container.get( 'Renderer' ).domElement;

    // <Stats isActive={__DEV__} />
    return (
      <div className="container">
        <DOMElement child={this.canvas} />
      </div>
    );
  }
}

export default Experience;
