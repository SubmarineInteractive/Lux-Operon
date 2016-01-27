import { Component } from 'react';
import Container from 'Container';

class Experience extends Component {

  componentDidMount() {

    const container = this.refs.container;
    Container.get('Scene').begin(container);
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="container" ref="container" />
    );
  }
}

export default Experience;