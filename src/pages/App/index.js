import { Component } from 'react';

/**
 * App class
 */
class App extends Component {

  componentDidMount() {
    // @TODO ADD GLOBAL WINDOW SIZE VALUE - GOGO REDUX
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;