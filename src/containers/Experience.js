import { Component } from 'react';
import Container from 'Container';
import { Stats, DOMElement } from 'components';

/**
 * Experience class
 */
class Experience extends Component {

  constructor(props) {
    super(props);

    Container.get('Scene').begin();
  }

  render() {
    this.canvas = Container.get('Renderer').domElement;

    return (
      <div className="container">
        <Stats isActive={__DEV__} />
        <DOMElement child={this.canvas} />
      </div>
    );
  }
}

export default Experience;