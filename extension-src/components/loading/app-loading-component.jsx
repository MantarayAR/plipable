var React = require('react');
var ReactDOM = require('react-dom');

/**
 * Reusable app loading component
 */
module.exports = React.createClass({
  render() {
    return <div className="plipable-loading">
      <div className="plipable-loading__spinner">
        <div className="plipable-loading__cube--1"></div>
        <div className="plipable-loading__cube--2"></div>
      </div>
    </div>
  }
});