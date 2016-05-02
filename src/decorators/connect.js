import { connect } from 'react-redux';

function connectWithTransitionGroup( connect ) {
  const willFunctions = [
    'componentWillAppear',
    'componentWillEnter',
    'componentWillLeave'
  ];

  const didFunctions = [
    'componentDidAppear',
    'componentDidEnter',
    'componentDidLeave'
  ];

  willFunctions.forEach( key => {
    connect.prototype[ key ] = function( cb ) {
      if ( this.refs.wrappedInstance[ key ] ) {
        this.refs.wrappedInstance[ key ]( cb );
      } else {
        cb();
      }
    };
  });

  didFunctions.forEach( key => {
    connect.prototype[ key ] = function() {
      if ( this.refs.wrappedInstance[ key ] ) {
        this.refs.wrappedInstance[ key ]();
      }
    };
  });

  return connect;
}

/**
 * connect decorator
 * @param  {function} mapStateToProps    Map state to props
 * @param  {Object}   mapDispatchToProps Map dispatch to props
 * @param  {Object}   mergeProps         Merge props
 * @param  {Object}   options            Options
 * @return {class}                       Wrapped class
 */
export default ( mapStateToProps = null, mapDispatchToProps = null, mergeProps = null, options = {}) => {
  return WrappedClass =>
    connectWithTransitionGroup( connect(
      mapStateToProps,
      mapDispatchToProps,
      mergeProps,
      {
        ...options,
        withRef: true
      }
    )( WrappedClass ) );
};