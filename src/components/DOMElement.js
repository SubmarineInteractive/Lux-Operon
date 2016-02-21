import { Component } from 'react';
import ReactDOM from 'react-dom';
import isDOM from 'is-dom';

/**
 * DOMElement class
 */
class DOMElement extends Component {

  static propTypes = {
    child: isDOM,
    className: React.PropTypes.object,
    style: React.PropTypes.object
  };

  render() {
    return (
      <div ref='container' className={this.props.classNames} style={this.props.style} />
    );
  }

  shouldComponentUpdate( nextProps ) {
    return this.props.child !== nextProps.child;
  }

  componentDidUpdate( prevProps ) {
    this._updateChild( prevProps );
  }

  componentDidMount() {
    this._updateChild({});
  }

  _updateChild( prevProps ) {
    const wrap = ReactDOM.findDOMNode( this.refs.container );
    const next = this.props.child;
    const prev = prevProps.child;

    if ( next ) {
      wrap.appendChild( next );
    }

    if ( prev && prev !== next && prev.parentNode === wrap ) {
      wrap.removeChild( prev );
    }
  }
}

export default DOMElement;