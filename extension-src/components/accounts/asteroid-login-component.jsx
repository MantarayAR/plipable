var React = require('react');
var ReactDOM = require('react-dom');

var AsteroidUserMixin = require('components/mixins/asteroid-user-mixin');

var AsteroidLoginComponent = React.createClass({
  mixins: [AsteroidUserMixin],
  logUserIn(e) {
    e.preventDefault();

    document.dispatchEvent(
      new CustomEvent('plipable-login-event', {})
    );
  },
  render() {
    if (! this.state.isLoggedIn) {
      return (
        <div>
          <button onClick={this.logUserIn} id="at-twitter" className="at-social-btn waves-effect waves-light btn">
            <i className="fa fa-twitter left"></i> Sign In with Twitter
          </button>
        </div>
      );
    } else {
      return <span></span>
    }
  }
});

module.exports = AsteroidLoginComponent;

