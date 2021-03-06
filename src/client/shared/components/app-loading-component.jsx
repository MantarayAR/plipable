//----------------- LOAD START --------------------\\
var $1 = null;
var $2 = null;

if (typeof require !== 'undefined') {
  $1 = require('react');
  $2 = require('react-dom');
} else {
  $1 = this.React;
  $2 = this.ReactDOM;
}

var React = $1;
var ReactDOM = $2;
//----------------- LOAD END --------------------\\

/**
 * Reusable app loading component
 */
var $out = React.createClass({
  render() {
    return <div className="plipable-loading">
      <div className="plipable-loading__spinner">
        <div className="plipable-loading__cube--1"></div>
        <div className="plipable-loading__cube--2"></div>
      </div>
    </div>
  }
});

//----------------- EXPORT START --------------------\\
if (typeof module !== 'undefined') {
  module.exports = $out;
} else {
  AppLoadingComponent = $out;
}
//----------------- EXPORT END --------------------\\