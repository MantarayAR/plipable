var React = require('react');
var ReactDOM = require('react-dom');

/**
 * Buttons for logging in
 */
var LoginComponent = React.createClass({
  logUserIn(e) {
    e.preventDefault();

    document.dispatchEvent(
      new CustomEvent('plipable-login-event', {})
    );
  },
  render() {
    return (
      <div>
        <button onClick={this.logUserIn} id="at-twitter" className="at-social-btn waves-effect waves-light btn">
          <i className="fa fa-twitter left"></i> Sign In with Twitter
        </button>
      </div>
    );
  }
});

module.exports = LoginComponent;