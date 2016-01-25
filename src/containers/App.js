import { Component } from 'react';

class App extends Component {

  componentDidMount() {

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